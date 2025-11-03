"use client";
import React, { useState } from "react";

export default function ViewSerializabilityOnlyApp() {
  const [scheduleInput, setScheduleInput] = useState(
    "T1 R(A)\nT1 W(A)\nT2 R(A)\nT2 W(B)\nT3 R(B)"
  );
  const [result, setResult] = useState("");
  const [limitNotice, setLimitNotice] = useState("");

  // --- پارس ورودی ---
  const parseOperations = (text) => {
    const lines = text
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    const operations = [];
    for (const line of lines) {
      const parts = line.split(/\s+/);
      if (parts.length < 2) continue;
      const transaction = parts[0].trim();
      const op = parts.slice(1).join(" ").trim();
      const typeMatch = op.match(/^([RWrw])/);
      const dataMatch = op.match(/\((.*?)\)/);
      if (!typeMatch || !dataMatch) continue;
      const type = typeMatch[1].toUpperCase();
      const data = dataMatch[1].trim();
      operations.push({ transaction, type, data });
    }
    return operations;
  };

  // --- آنالیز اولیه برای View ---
  const analyzeOriginalView = (operations) => {
    const lastWriter = {};
    const readEvents = [];
    const readCount = {};

    for (let i = 0; i < operations.length; i++) {
      const op = operations[i];
      if (!readCount[op.transaction]) readCount[op.transaction] = 0;

      if (op.type === "R") {
        const writer = lastWriter[op.data] || "INIT";
        readEvents.push({
          transaction: op.transaction,
          data: op.data,
          readIndex: readCount[op.transaction],
          writer,
        });
        readCount[op.transaction]++;
      } else if (op.type === "W") {
        lastWriter[op.data] = op.transaction;
      }
    }

    const finalWrites = { ...lastWriter };
    return { readEvents, finalWrites };
  };

  // --- برنامه هر تراکنش ---
  const makeTxnPrograms = (operations) => {
    const programs = {};
    for (const op of operations) {
      if (!programs[op.transaction]) programs[op.transaction] = [];
      programs[op.transaction].push({ type: op.type, data: op.data });
    }
    return programs;
  };

  // --- همهٔ جایگشت‌ها ---
  const permutations = (arr) => {
    const res = [];
    const a = arr.slice();
    const n = a.length;
    const generate = (k) => {
      if (k === n - 1) res.push(a.slice());
      for (let i = k; i < n; i++) {
        [a[k], a[i]] = [a[i], a[k]];
        generate(k + 1);
        [a[k], a[i]] = [a[i], a[k]];
      }
    };
    if (n > 0) generate(0);
    return res;
  };

  // --- بررسی View Serializability ---
  const checkViewSerializable = (operations) => {
    const { readEvents: originalReads, finalWrites: originalFinal } =
      analyzeOriginalView(operations);

    const programs = makeTxnPrograms(operations);
    const txns = Object.keys(programs);

    if (txns.length > 7) {
      setLimitNotice(
        "تعداد تراکنش‌ها بیش از 7 است، بررسی View کامل انجام نمی‌شود (خیلی سنگین است)."
      );
      return { view: false, reason: "too_many_txns" };
    }

    const perms = permutations(txns);

    for (const perm of perms) {
      const lastWriter = {};
      const serialReads = [];
      const serialReadCount = {};

      for (const txn of perm) {
        if (!serialReadCount[txn]) serialReadCount[txn] = 0;
        const prog = programs[txn] || [];
        for (const op of prog) {
          if (op.type === "R") {
            const writer = lastWriter[op.data] || "INIT";
            serialReads.push({
              transaction: txn,
              data: op.data,
              readIndex: serialReadCount[txn],
              writer,
            });
            serialReadCount[txn]++;
          } else if (op.type === "W") {
            lastWriter[op.data] = txn;
          }
        }
      }

      // مقایسه خواندن‌ها
      let readsMatch = true;
      if (serialReads.length !== originalReads.length) readsMatch = false;
      else {
        for (let i = 0; i < originalReads.length; i++) {
          const o = originalReads[i];
          const s = serialReads[i];
          if (
            !s ||
            o.transaction !== s.transaction ||
            o.data !== s.data ||
            o.readIndex !== s.readIndex ||
            o.writer !== s.writer
          ) {
            readsMatch = false;
            break;
          }
        }
      }

      // مقایسه آخرین نویسنده‌ها
      let finalsMatch = true;
      const keys = new Set([
        ...Object.keys(originalFinal),
        ...Object.keys(lastWriter),
      ]);
      for (const k of keys) {
        const of = originalFinal[k] || "INIT";
        const sf = lastWriter[k] || "INIT";
        if (of !== sf) {
          finalsMatch = false;
          break;
        }
      }

      if (readsMatch && finalsMatch) {
        return { view: true, perm };
      }
    }

    return { view: false };
  };

  const handleCheck = () => {
    setLimitNotice("");
    setResult("");

    const operations = parseOperations(scheduleInput);
    if (operations.length === 0) {
      setResult("ورودی خالی یا نامعتبر است.");
      return;
    }

    const viewRes = checkViewSerializable(operations);

    if (viewRes.view) {
      setResult(
        `✅ این Schedule View-Serializable است.\nترتیب معادل: ${viewRes.perm.join(
          " → "
        )}`
      );
    } else if (viewRes.reason === "too_many_txns") {
      setResult(
        "⚠️ تعداد تراکنش‌ها بیش از حد است، بررسی کامل انجام نشد (ممکن است Serializable باشد یا نباشد)."
      );
    } else {
      setResult("❌ این Schedule View-Serializable نیست.");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto text-gray-800">
      <h1 className="text-2xl font-bold mb-4 text-center">
        تشخیص سریال پذیری
        |
        View Serializability Checker </h1>

      <textarea
        style={{ direction: "ltr" }}
        value={scheduleInput}
        onChange={(e) => setScheduleInput(e.target.value)}
        rows={10}
        className="w-full border border-gray-400 p-2 rounded-lg mb-4 font-mono"
      ></textarea>

      <div className="flex gap-2">
        <button
          onClick={handleCheck}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
         مشاهده
        </button>
        <button
          onClick={() => {
            setScheduleInput("");
            setResult("");
            setLimitNotice("");
          }}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
        >
          پاک کردن
        </button>
      </div>

      {limitNotice && <div className="mt-3 text-yellow-700">{limitNotice}</div>}
      {result && (
        <div className="mt-4 p-3 border border-gray-300 rounded-lg bg-gray-50 whitespace-pre-line">
          <strong>نتیجه:</strong>
          <div className="mt-2">{result}</div>
        </div>
      )}
    </div>
  );
}
