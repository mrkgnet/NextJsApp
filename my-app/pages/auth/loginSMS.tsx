

import axios from "axios";
import React, { useState } from "react";

import { Bounce, ToastContainer, toast } from 'react-toastify';

export default function LoginSMSForm({ onLogin }) {

  //get phone number 
  const [phone, setPhone] = useState("");

  // state of 'phone' | 'verify' | 'done'
  const [step, setStep] = useState("phone"); // 'phone' | 'verify' | 'done'


  const [isLoading, setIsLoading] = useState(false);
  

  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [resendCountdown, setResendCountdown] = useState(0);

  const validatePhone = (p) => {
    // پایه‌ای‌ترین اعتبارسنجی شماره موبایل ایران (میتونید سفارشی کنید)
    return /^(?:\+98|0)?9\d{9}$/.test(p.trim());
  };

  const sendOtp = async () => {

    try {
      setIsLoading(true);
      const res = await axios.post("/api/send-otp" , {phone:phone})

      if(res)

      toast.success('کد تایید برای شماره شما ارسال شد', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,

      });
      setStep("verify")

    } catch (error) {
      toast.error(error.message)
    }finally{
      setIsLoading(false);
    }

  }



  return (

    <>
      <div className=" flex items-center justify-center  p-1 my-24">
        <ToastContainer rtl={true} />
        <div className="w-full max-w-md bg-white border border-gray-300 roudned-lg overflow-hidden  shadow-lg p-6">
          {/* illustration (local file path shown above) */}

          <h2 className="text-center text-2xl font-semibold mb-2">ورود با پیامک</h2>

          {/* step === phone  */}
          {step === "phone" &&
            <>

              <p className="text-center text-sm text-gray-500 mb-6 my-8">شماره موبایل خود را وارد کنید تا کد ورود براتون ارسال شود.</p>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">شماره موبایل</label>
                <input
                  type="tel"
                  inputMode="numeric"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{ "direction": "ltr" }}
                  placeholder="مثال: 09123456789"
                  className="w-full  px-4 py-2 border border-gray-300 rounded-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                  onClick={sendOtp}
                  disabled={isLoading}
                  className={`w-full  py-2 rounded-xs text-white ${isLoading ? 'bg-gray-400' : 'bg-[#ef4056] hover:bg-[#d6384d]'}`}
                >
                  {isLoading ? 'در حال ارسال...' : 'ارسال کد'}
                </button>
              </div>
            </>
          }


          {/* step === verify */}
          {step === "verify" &&
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 my-8">کد ۵ رقمی </label>
              <input
                type="text"
                inputMode="numeric"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="کد ارسال شده را وارد کنید"
                className="w-full px-4 py-2 border rounded-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="flex gap-2">
                <button

                  disabled={isLoading}
                  className={`flex-1 py-2 rounded-xs text-white ${isLoading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
                >
                  {isLoading ? 'در حال بررسی...' : 'تأیید کد'}
                </button>

                <button

                  disabled={resendCountdown > 0}
                  className={`px-4 py-2 rounded-xs border ${resendCountdown > 0 ? 'text-gray-400 border-gray-200' : 'text-blue-600 border-blue-600 hover:bg-blue-50'}`}
                >
                  {resendCountdown > 0 ? `ارسال مجدد در ${resendCountdown}s` : 'ارسال مجدد'}
                </button>
              </div>

              <button
                onClick={() => setStep('phone')}
                className="w-full text-sm text-gray-600 underline mt-1"
              >
                تغییر شماره
              </button>
            </div>
          }

          {/* done */}
          {step === "done" &&
            <div className="text-center">
              <p className="mb-4">شما با موفقیت وارد شدید.</p>
              <button onClick={() => window.location.reload()} className="px-4 py-2 rounded-xs bg-blue-600 text-white">رفرش</button>
            </div>
          }

          <p className="mt-6 text-xs text-gray-400 text-center">با ورود، قوانین و شرایط استفاده را می‌پذیرید.</p>
        </div>
      </div>
        
        <div>
          <form action=""></form>
        </div>





    </>
  );
}
