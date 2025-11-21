"use client"; // ضروری برای استفاده از هوک‌ها

import { useAuth } from '@/contexts/AuthContext';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'; // ایمپورت useState
import toast, { Toaster } from 'react-hot-toast';

// --- آیکون‌های SVG چشم ---
const EyeIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-gray-500 dark:text-gray-400"
    >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
    </svg>
);

const EyeOffIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-gray-500 dark:text-gray-400"
    >
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
        <line x1="1" y1="1" x2="23" y2="23"></line>
    </svg>
);
// --- پایان آیکون‌ها ---

const LoginForm = ({ isAuth, setIsAuth }) => {
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });


    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
   

    // تابع مدیریت ارسال فرم
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await axios.post("/api/auth/login", formData, { withCredentials: true });


            setFormData({
                email: "",
                password: "",
            });
          
            setIsAuth(true)
            // toast.success(data.message)
            router.push("/dashboard/");

        } catch (err) {
            console.log("REAL ERROR: ", err);
            toast.error("Login failed");
        }
        setIsLoading(false);
    };

    return (
        // این div را اضافه می‌کنم تا فرم در مرکز صفحه (عمودی و افقی) قرار گیرد
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
            <Toaster/>
            <form
                className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-sm"
            >
                <h2 className="text-xl font-bold mb-6 text-center text-gray-900 dark:text-white">
                    ورود به حساب کاربری
                </h2>

                {/* Email */}
                <div className="mb-5">
                    <label
                        htmlFor="email" // اصلاح: for به htmlFor
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        ایمیل شما
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email" // اضافه شد
                        value={formData.email} // اتصال به state
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })} // اتصال به state
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@example.com"
                        required
                    />
                </div>

                {/* Password */}
                <div className="mb-5">
                    <label
                        htmlFor="password" // اصلاح: for به htmlFor
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        رمز عبور
                    </label>
                    {/* div relative برای قرارگیری آیکون */}
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"} // داینامیک
                            id="password"
                            name="password" // اضافه شد
                            value={formData.password} // اتصال به state
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}

                            // اتصال به state
                            // اصلاح: pr-10 برای ایجاد فضا برای آیکون
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                        />
                        {/* دکمه آیکون چشم */}
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                        >
                            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                        </button>
                    </div>
                </div>

                {/* "Remember me" حذف شد */}

                <button
                    onClick={handleSubmit}
                    type="submit"
                    disabled={isLoading ? true : false}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? "در حال ارسال..." : "ورود"}
                </button>
            </form>
        </div>
    );
};

export default LoginForm;