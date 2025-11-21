import NavbarUser from "@/components/navbar_user/Navbar_User";
import axios from "axios";
import { cookies } from "next/headers";
import { settings } from "nprogress";
import React, { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import jwt from 'jsonwebtoken';
const InfoCard = ({ userId }) => {

    // get token
    console.log("USER ID:", userId);
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        age: "",
        gender: "",
        phone: "",
        userId_Creator: userId,
    });

    const [isLoading, setIsLoading] = useState(false);

    // handleChange function to update the formData state
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // handleSubmit function to submit the formData to the server

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { firstname, lastname, age, gender, phone } = formData;
        // send data to server
        if (!firstname || !lastname || !age || !gender || !phone) {
            toast.error("پرکردن تمامی فیلد ها اجباری است ")
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.post('/api/contact', formData);
            toast.success("اطلاعات با موفقیت ثبت شد")
            setIsLoading(false);
            setFormData({
                firstname: "",
                lastname: "",
                age: "",
                gender: "",
                phone: "",
            });
        } catch (error) {


            if (error.response) {
                const message = error.response.data.details || 'خطا در ثبت اطلاعات';
                toast.error(`خطا: ${message}`);

            } else if (error.request) {
                // درخواست ارسال شده اما پاسخی دریافت نشده (خطای شبکه)
                toast.error("خطا در برقراری ارتباط با سرور.");
                console.error('Network Error:', error.request);
            } else {
                // یک خطای دیگر در زمان تنظیم درخواست رخ داده
                toast.error(error.message);
                console.error('Error', error.message);
            }

        } finally {
            setIsLoading(false);
        }

    };

    return (
        <div className="container mx-auto font_sm ">
            <Toaster />
            <NavbarUser />
            <div className="min-h-screen  mt-4 my-4 flex items-center justify-center bg-gray-100">
                <div className="bg-white shadow-xl rounded-2xl p-4 w-full max-w-md border border-gray-200 mt-4">
                    <h2 className=" text-center text-xl my-2 text-gray-800 ">
                        فرم ثبت اطلاعات
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* نام */}
                        <div>
                            <label className="block text-gray-700 mb-1">نام</label>
                            <input
                                type="text"
                                name="firstname"
                                value={formData.firstname}
                                onChange={handleChange}
                                placeholder="نام را وارد کنید"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        {/* نام خانوادگی */}
                        <div>
                            <label className="block text-gray-700 mb-1">نام خانوادگی</label>
                            <input
                                type="text"
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleChange}
                                placeholder="نام خانوادگی را وارد کنید"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        {/* سن */}
                        <div>
                            <label className="block text-gray-700 mb-1">سن</label>
                            <input
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                placeholder="سن را وارد کنید"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        {/* وضعیت تأهل */}
                        <div>



                            <label className="block text-gray-700 mb-1">جنسیت</label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                <option value="">انتخاب کنید</option>
                                <option value="مجرد">مجرد</option>
                                <option value="متأهل">متأهل</option>
                            </select>
                        </div>

                        {/* شماره تلفن */}
                        <div>
                            <label className="block text-gray-700 mb-1">شماره تلفن</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="مثلاً 09123456789"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        {/* دکمه ثبت */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full font-semibold py-2 rounded-lg coursor-pointer transition-all duration-200 
                                                                           ${isLoading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700 text-white"}`}
                        >
                            {isLoading ? "در حال ارسال..." : "ثبت اطلاعات"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default InfoCard;
function saveSettings(settings: any): Promise<unknown> | (() => Promise<unknown>) {
    throw new Error("Function not implemented.");
}

export async function getServerSideProps(context: any) {
    const token = context.req.cookies.token || null;
    if (!token) {
        return {
            props: { userId: null }
        }
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return {
        props: {
            userId: decoded.id,
            user: decoded
        }
    };
}

