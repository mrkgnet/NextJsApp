"use client";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function TwoPLDynamic() {
  const [steps, setSteps] = useState([]);
  const [step, setStep] = useState(0);

  // locks: { A: { type: 'S'|'X', transactions: ['T1', ...] } }
  const [locks, setLocks] = useState({});

  // transactions: { T1: { phase: 'growing'|'shrinking'|'committed'|'aborted', held: { A: 'S' } } }
  const [transactions, setTransactions] = useState({
    T1: { phase: "growing", held: {} },
    T2: { phase: "growing", held: {} },
    T3: { phase: "growing", held: {} },
  });

  const [newAction, setNewAction] = useState({
    transaction: "T1",
    operation: "🔒 Lock-X",
    data: "A",
  });

  // helper: change transaction phase
  const setTransactionPhase = (tId, phase) => {
    setTransactions((prev) => ({ ...prev, [tId]: { ...prev[tId], phase } }));
  };

  // helper: grant a lock (assumes checks done)
  const grantLock = (data, type, transaction) => {
    setLocks((prev) => {
      const cur = prev[data];
      if (!cur) {
        return { ...prev, [data]: { type, transactions: [transaction] } };
      }
      if (cur.type === "S" && type === "S") {
        return { ...prev, [data]: { ...cur, transactions: Array.from(new Set([...cur.transactions, transaction])) } };
      }
      // upgrading S->X: set type X and only that transaction remains
      return { ...prev, [data]: { type: type, transactions: [transaction] } };
    });

    setTransactions((prev) => ({
      ...prev,
      [transaction]: {
        ...prev[transaction],
        held: { ...prev[transaction].held, [data]: type },
      },
    }));
  };

  // helper: release a lock for a transaction on data
  const releaseLock = (data, transaction) => {
    setLocks((prev) => {
      const cur = prev[data];
      if (!cur) return prev;
      const remaining = cur.transactions.filter((t) => t !== transaction);
      if (remaining.length === 0) {
        const next = { ...prev };
        delete next[data];
        return next;
      }
      // if remaining > 0 and type was X, it shouldn't happen normally
      const newType = remaining.length > 1 ? "S" : cur.type === "X" ? "S" : cur.type;
      return { ...prev, [data]: { type: newType, transactions: remaining } };
    });

    setTransactions((prev) => ({
      ...prev,
      [transaction]: {
        ...prev[transaction],
        held: Object.fromEntries(Object.entries(prev[transaction].held || {}).filter(([k]) => k !== data)),
      },
    }));
  };

  // release all locks held by a transaction (used by Commit/Abort)
  const releaseAllLocksFor = (transaction) => {
    const held = transactions[transaction]?.held || {};
    Object.keys(held).forEach((data) => releaseLock(data, transaction));
  };

  const addStep = () => {
    const { transaction, operation, data } = newAction;
    const curTrans = transactions[transaction];

    if (!curTrans) {
      toast.error(`تراکنش ${transaction} معتبر نیست.`);
      return;
    }

    // =============================
    // 🔹 Lock operation
    // =============================
    if (operation.includes("Lock")) {
      // 2PL rule: if transaction in shrinking phase, cannot take new locks
      if (curTrans.phase === "shrinking") {
        toast.error(`❌ ${transaction} در فاز shrinking است و نمی‌تواند قفل جدید بگیرد.`);
        return;
      }

      const lockInfo = locks[data];
      const wantX = operation.includes("X");

      if (lockInfo) {
        const { type, transactions: holders } = lockInfo;

        // if already held exclusively by same transaction
        if (type === "X" && holders.includes(transaction)) {
          toast.error(`${transaction} قبلاً Lock-X روی ${data} دارد.`);
          return;
        }

        // if X already held by someone else
        if (type === "X" && !holders.includes(transaction)) {
          toast.error(`❌ ${data} توسط ${holders[0]} با Lock-X قفل شده است. ${transaction} باید منتظر بماند.`);
          return;
        }

        // if S held by others and we want X => cannot (unless only this transaction holds S -> upgrade allowed)
        if (type === "S" && wantX) {
          const otherHolders = holders.filter((h) => h !== transaction);
          if (otherHolders.length > 0) {
            toast.error(`❌ ${data} در حالت اشتراکی است و ${transaction} نمی‌تواند Lock-X بگیرد (دیگران S دارند).`);
            return;
          }
          // upgrade: allowed if only this transaction holds S
        }

        // if S held and we want S -> just add
        if (type === "S" && !wantX) {
          if (holders.includes(transaction)) {
            toast.error(`${transaction} قبلاً Lock-S روی ${data} دارد.`);
            return;
          }
          grantLock(data, "S", transaction);
          toast.success(`${transaction} Lock-S روی ${data} گرفت (اشتراکی). 🔒`);
        }

        // handle upgrade S->X (only allowed if no other holders)
        if (type === "S" && wantX && holders.length === 1 && holders[0] === transaction) {
          grantLock(data, "X", transaction);
          toast.success(`${transaction} Lock-S را به Lock-X روی ${data} ارتقا داد. 🔐`);
        }
      } else {
        // no lock exists -> grant requested lock
        grantLock(data, wantX ? "X" : "S", transaction);
        toast.success(`${transaction} قفل ${wantX ? "Lock-X" : "Lock-S"} روی ${data} گرفت. 🔒`);
      }
    }

    // =============================
    // 🔹 Write (requires X held by this transaction)
    // =============================
    if (operation.includes("Write")) {
      const lockInfo = locks[data];
      if (!lockInfo || !lockInfo.transactions.includes(transaction) || lockInfo.type !== "X") {
        toast.error(`❌ ${transaction} اجازه نوشتن روی ${data} را ندارد — باید Lock-X داشته باشد.`);
        return;
      }
      toast.success(`${transaction} روی ${data} نوشت ✏️`);
    }

    // =============================
    // 🔹 Read (requires S or X held appropriately)
    // =============================
    if (operation.includes("Read")) {
      const lockInfo = locks[data];
      if (!lockInfo) {
        toast.error(`❌ ${transaction} نمی‌تواند ${data} را بخواند — قفل وجود ندارد.`);
        return;
      }

      // if X is held by someone else -> can't read
      if (lockInfo.type === "X" && !lockInfo.transactions.includes(transaction)) {
        toast.error(`❌ ${transaction} نمی‌تواند ${data} را بخواند — Lock-X توسط ${lockInfo.transactions[0]} است.`);
        return;
      }

      // S held by others -> allowed
      if (lockInfo.type === "S" && lockInfo.transactions.includes(transaction)) {
        toast.success(`${transaction} مقدار ${data} را خواند 📖`);
      } else if (lockInfo.type === "S" && !lockInfo.transactions.includes(transaction)) {
        toast.error(`❌ ${transaction} باید ابتدا Lock-S بگیرد تا بخواند.`);
        return;
      } else if (lockInfo.type === "X" && lockInfo.transactions.includes(transaction)) {
        toast.success(`${transaction} مقدار ${data} را خواند (Lock-X) 📖`);
      }
    }

    // =============================
    // 🔹 Unlock
    // =============================
    if (operation.includes("Unlock")) {
      const lockInfo = locks[data];
      if (!lockInfo || !lockInfo.transactions.includes(transaction)) {
        toast.error(`❌ ${transaction} قفلی روی ${data} ندارد تا آزاد کند.`);
        return;
      }

      // release
      releaseLock(data, transaction);

      // once a transaction does its first unlock, it enters shrinking phase
      if (curTrans.phase !== "shrinking") {
        setTransactionPhase(transaction, "shrinking");
      }

      toast.success(`${transaction} قفل ${data} را آزاد کرد 🔓`);
    }

    // =============================
    // 🔹 Commit (release all and mark committed)
    // =============================
    if (operation.includes("Commit")) {
      releaseAllLocksFor(transaction);
      setTransactionPhase(transaction, "committed");
      toast.success(`${transaction} Commit شد — همه قفل‌ها آزاد شدند ✅`);
    }

    // =============================
    // 🔹 Abort (release all and mark aborted)
    // =============================
    if (operation.includes("Abort")) {
      releaseAllLocksFor(transaction);
      setTransactionPhase(transaction, "aborted");
      toast.success(`${transaction} Abort شد — همه قفل‌ها آزاد شدند ⚠️`);
    }

    // ثبت مرحله در جدول (بدون note)
    const newStep = {
      t1: transaction === "T1" ? `${operation}(${data})` : "",
      t2: transaction === "T2" ? `${operation}(${data})` : "",
      t3: transaction === "T3" ? `${operation}(${data})` : "",
    };

    setSteps((prev) => [...prev, newStep]);
    toast(`${transaction} → ${operation}(${data}) ثبت شد`, { icon: "➡️" });
  };

  const nextStep = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const renderLock = (data) => {
    const info = locks[data];
    if (!info) return "آزاد ✅";
    if (info.type === "X") return `Lock-X توسط ${info.transactions[0]}`;
    if (info.type === "S") return `Lock-S توسط ${info.transactions.join(", ")}`;
    return JSON.stringify(info);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
      <Toaster position="top-center" />

      <h1 className="text-2xl font-bold mb-6 text-blue-700">🔁 شبیه‌ساز واقعی Two-Phase Locking (2PL)</h1>

      <div className="flex flex-wrap gap-4 mb-4 bg-white p-4 rounded-2xl shadow max-w-2xl justify-center">
        <select
          value={newAction.transaction}
          onChange={(e) => setNewAction({ ...newAction, transaction: e.target.value })}
          className="border p-2 rounded-lg"
        >
          <option value="T1">T1</option>
          <option value="T2">T2</option>
          <option value="T3">T3</option>
        </select>

        <select
          value={newAction.operation}
          onChange={(e) => setNewAction({ ...newAction, operation: e.target.value })}
          className="border p-2 rounded-lg"
        >
          <option>🔒 Lock-X</option>
          <option>🔒 Lock-S</option>
          <option>✏️ Write</option>
          <option>📖 Read</option>
          <option>🔓 Unlock</option>
          <option>✅ Commit</option>
          <option>❌ Abort</option>
        </select>

        <input
          value={newAction.data}
          onChange={(e) => setNewAction({ ...newAction, data: e.target.value })}
          placeholder="A / B / C"
          className="border p-2 rounded-lg w-20 text-center"
        />

        <button onClick={addStep} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">➕ افزودن مرحله</button>
      </div>

      {/* نمایش مرحله جاری */}
      {steps.length > 0 ? (
        <>
          <div className="grid grid-cols-3 gap-6 mb-6 w-full max-w-2xl text-center">
            <div className={`p-4 rounded-2xl shadow ${steps[step].t1 ? "bg-blue-100" : "bg-white"}`}>
              <h2 className="font-bold text-blue-700">T1</h2>
              <p>{steps[step].t1 || "—"}</p>
            </div>

            <div className={`p-4 rounded-2xl shadow ${steps[step].t2 ? "bg-green-100" : "bg-white"}`}>
              <h2 className="font-bold text-green-700">T2</h2>
              <p>{steps[step].t2 || "—"}</p>
            </div>

            <div className={`p-4 rounded-2xl shadow ${steps[step].t3 ? "bg-yellow-100" : "bg-white"}`}>
              <h2 className="font-bold text-yellow-700">T3</h2>
              <p>{steps[step].t3 || "—"}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <button onClick={prevStep} disabled={step === 0} className="bg-gray-300 hover:bg-gray-400 text-white px-4 py-2 rounded-lg disabled:opacity-50">قبلی</button>
            <button onClick={nextStep} disabled={step === steps.length - 1} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50">بعدی</button>
          </div>

          <p className="mt-6 text-sm text-gray-500">مرحله {step + 1} از {steps.length}</p>
        </>
      ) : (
        <p className="text-gray-500 mt-8">هیچ مرحله‌ای ثبت نشده 😅</p>
      )}

      {/* جدول وضعیت قفل‌ها */}
      <div className="mt-8 bg-white p-4 rounded-xl shadow max-w-md w-full text-right">
        <h3 className="font-bold text-gray-700 mb-2">🔐 وضعیت قفل‌ها</h3>
        <p className="text-gray-600">A: {renderLock("A")}</p>
        <p className="text-gray-600">B: {renderLock("B")}</p>
        <p className="text-gray-600">C: {renderLock("C")}</p>
      </div>

      {/* نمایش وضعیت تراکنش‌ها */}
      <div className="mt-6 bg-white p-4 rounded-xl shadow max-w-md w-full text-right">
        <h3 className="font-bold text-gray-700 mb-2">🧾 وضعیت تراکنش‌ها</h3>
        {Object.entries(transactions).map(([id, t]) => (
          <p key={id} className="text-gray-600">{id}: {t.phase} — قفل‌های گرفته شده: {Object.keys(t.held || {}).join(", ") || "—"}</p>
        ))}
      </div>
    </div>
  );
}
