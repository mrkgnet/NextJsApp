"use client";
import { useState } from "react";

export default function TwoPLSimulator() {
  const [step, setStep] = useState(0);

  const steps = [
    { t1: "🔒 Lock-X(A)", t2: "", t3: "", note: "T1 قفل انحصاری روی A گرفت (شروع فاز رشد)" },
    { t1: "", t2: "🔒 Lock-S(A)", t3: "", note: "T2 تلاش می‌کند قفل اشتراکی روی A بگیرد ولی منتظر می‌ماند" },
    { t1: "✏️ Write(A)", t2: "", t3: "", note: "T1 روی A می‌نویسد" },
    { t1: "🔓 Unlock(A)", t2: "", t3: "", note: "T1 قفل را آزاد می‌کند (شروع فاز کاهش)" },
    { t1: "", t2: "✅ Lock-S(A)", t3: "", note: "T2 اکنون می‌تواند قفل اشتراکی بگیرد (فاز رشد خودش)" },
    { t1: "", t2: "📖 Read(A)", t3: "", note: "T2 مقدار A را می‌خواند" },
    { t1: "", t2: "🔓 Unlock(A)", t3: "", note: "T2 هم وارد فاز کاهش می‌شود و قفل را آزاد می‌کند" },
  ];

  const nextStep = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">🔁 شبیه ساز قفل 2pl</h1>

      <div className="grid grid-cols-2 gap-6 mb-6 w-full max-w-2xl text-center">
        <div className={`p-4 rounded-2xl shadow ${steps[step].t1 ? "bg-blue-100" : "bg-white"}`}>
          <h2 className="font-bold text-blue-700">T1</h2>
          <p>{steps[step].t1 || "—"}</p>
        </div>

        <div className={`p-4 rounded-2xl shadow ${steps[step].t2 ? "bg-green-100" : "bg-white"}`}>
          <h2 className="font-bold text-green-700">T2</h2>
          <p>{steps[step].t2 || "—"}</p>
        </div>

        {/* <div className={`p-4 rounded-2xl shadow ${steps[step].t3 ? "bg-yellow-100" : "bg-white"}`}>
          <h2 className="font-bold text-yellow-700">T3</h2>
          <p>{steps[step].t3 || "—"}</p>
        </div> */}
      </div>

      <div className="mb-4 text-gray-700 font-medium text-center">{steps[step].note}</div>

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
    </div>
  );
}
