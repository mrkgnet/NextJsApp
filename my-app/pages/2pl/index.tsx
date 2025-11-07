"use client";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function TwoPLDynamic() {
  const [steps, setSteps] = useState([]);
  const [step, setStep] = useState(0);
  const [locks, setLocks] = useState({}); // وضعیت فعلی قفل‌ها (مثال: { A: { type: "X"|"S", transaction: "T1" } })
  const [newAction, setNewAction] = useState({
    transaction: "T1",
    operation: "🔒 Lock-X",
    data: "A",
  });

  const addStep = () => {
    const { transaction, operation, data } = newAction;
    const currentLock = locks[data];

    // =============================
    // 🔹 قفل‌گذاری (Lock)
    // =============================
    if (operation.includes("Lock")) {
      if (currentLock) {
        const { type, transaction: lockedBy } = currentLock;

        // اگر تراکنش خودش قبلاً قفل رو گرفته
        if (lockedBy === transaction) {
          toast.error(`${transaction} قبلاً روی ${data} قفل گرفته است.`);
          return;
        }

        // اگر lock X وجود دارد => هیچ‌کس نباید قفل بگیره
        if (type === "X") {
          toast.error(`❌ ${data} توسط ${lockedBy} با Lock-X قفل شده است. ${transaction} باید منتظر بماند.`);
          return;
        }

        // اگر Lock-S هست و تراکنش جدید خواست Lock-X بگیرد => ممنوع
        if (type === "S" && operation.includes("X")) {
          toast.error(`❌ ${data} در حالت اشتراکی (Lock-S) قفل است. ${transaction} نمی‌تواند Lock-X بگیرد.`);
          return;
        }

        // اگر Lock-S هست و تراکنش جدید خواست Lock-S بگیرد => اجاره (اشتراکی)
        // توجه: برای پیاده‌سازی کامل ممکن است بخواهی لیستی از تراکنش‌های S نگه داری، اینجا برای سادگی فقط اولین نگه داشته می‌شود.
      }

      // ✅ ثبت قفل جدید
      const lockType = operation.includes("X") ? "X" : "S";
      setLocks((prev) => ({ ...prev, [data]: { type: lockType, transaction } }));
      toast.success(`${transaction} قفل ${lockType === "X" ? "انحصاری (Lock-X)" : "اشتراکی (Lock-S)"} روی ${data} گرفت 🔒`);
    }

    // =============================
    // 🔹 نوشتن یا خواندن (Write / Read)
    // =============================
    if (operation.includes("Write")) {
      const lockInfo = locks[data];
      if (!lockInfo || lockInfo.transaction !== transaction || lockInfo.type !== "X") {
        toast.error(`❌ ${transaction} اجازه نوشتن روی ${data} را ندارد — باید Lock-X داشته باشد.`);
        return;
      }
      toast.success(`${transaction} روی ${data} نوشت ✏️`);
    }

    if (operation.includes("Read")) {
      const lockInfo = locks[data];
      if (!lockInfo) {
        toast.error(`❌ ${transaction} نمی‌تواند ${data} را بخواند — قفل وجود ندارد.`);
        return;
      }
      // اگر lockInfo.type === "X" یا "S" و تراکنش خودِ قفل‌گیرنده یا S باشد باید اجازه بدیم.
      if (lockInfo.type === "X" && lockInfo.transaction !== transaction) {
        toast.error(`❌ ${transaction} نمی‌تواند ${data} را بخواند — Lock-X توسط ${lockInfo.transaction} است.`);
        return;
      }
      toast.success(`${transaction} مقدار ${data} را خواند 📖`);
    }

    // =============================
    // 🔹 آزادسازی قفل (Unlock)
    // =============================
    if (operation.includes("Unlock")) {
      const lockInfo = locks[data];
      if (!lockInfo || lockInfo.transaction !== transaction) {
        toast.error(`❌ ${transaction} قفلی روی ${data} ندارد تا آزاد کند.`);
        return;
      }
      const updated = { ...locks };
      delete updated[data];
      setLocks(updated);
      toast.success(`${transaction} قفل ${data} را آزاد کرد 🔓`);
    }

    // ✅ افزودن مرحله جدید به جدول (بدون note طبق خواست)
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

  // یک تابع کوچک برای نمایش وضعیت قفل‌ها به شکل خواناتر
  const renderLock = (data) => {
    const info = locks[data];
    if (!info) return "آزاد ✅";
    if (info.type === "X") return `Lock-X توسط ${info.transaction}`;
    if (info.type === "S") return `Lock-S توسط ${info.transaction}`;
    return JSON.stringify(info);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
      <Toaster position="top-center" />

      <h1 className="text-2xl font-bold mb-6 text-blue-700">
        🔁 شبیه‌ساز داینامیک Two-Phase Locking (2PL)
      </h1>

      {/* فرم افزودن مرحله */}
      <div className="flex flex-wrap gap-4 mb-6 bg-white p-4 rounded-2xl shadow max-w-2xl justify-center">
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
        </select>

        <input
          value={newAction.data}
          onChange={(e) => setNewAction({ ...newAction, data: e.target.value })}
          placeholder="A / B / C"
          className="border p-2 rounded-lg w-20 text-center"
        />

        <button
          onClick={addStep}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          ➕ افزودن مرحله
        </button>
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
            <button
              onClick={prevStep}
              disabled={step === 0}
              className="bg-gray-300 hover:bg-gray-400 text-white px-4 py-2 rounded-lg disabled:opacity-50"
            >
              قبلی
            </button>
            <button
              onClick={nextStep}
              disabled={step === steps.length - 1}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
            >
              بعدی
            </button>
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
    </div>
  );
}
