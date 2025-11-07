import axios from 'axios';
import router, { useRouter } from 'next/router';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const Id = ({ data }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstname: data.firstname,
        lastname: data.lastname,
        age: data.age,
        gender: data.gender,
        phone: data.phone,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // TODO: send data to server-
        try {
            const response = await axios.put(
                `http://localhost:3000/api/contact/${data._id}`,
                formData
            );
            if (response.status === 200) {
                toast.success('اطلاعات با موفقیت ثبت شد.')

                setIsLoading(false);
                // TODO: redirect to user page
                router.push('/user')

            }
            // TODO: redirect to user page
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            toast.error('مشکلی در ثبت اطلاعات رخ داده است.')
        }
    }




    return (
        <div className='max-w-screen-md mx-auto font_sm '>
            <Toaster />
            <div className="min-h-screen  mt-4 my-4 flex items-center justify-center bg-gray-100">
                <div className="bg-white shadow-xl rounded-2xl p-4 w-full max-w-md border border-gray-200 mt-4">
                    <h2 className=" text-center text-xl my-2 text-gray-800 ">
                        فرم ثبت اطلاعات
                    </h2>

                    <form className="space-y-4" >

                        {/* نام */}
                        <div>
                            <label className="block text-gray-700 mb-1">نام</label>
                            <input
                                type="text"
                                name="firstname"
                                onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                                value={formData.firstname}
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
                                onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                                value={formData.lastname}
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
                                onChange={(e) => setFormData(
                                    { ...formData, age: e.target.value }
                                )}
                                value={formData.age}
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
                                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
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
                                onChange={(e) => setFormData(
                                    { ...formData, phone: e.target.value }
                                )}
                                value={formData.phone}
                                placeholder="مثلاً 09123456789"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        {/* دکمه ثبت */}
                        <button
                            onClick={handleSubmit}
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
}

export default Id;

export async function getServerSideProps(context) {
    const { id } = context.params;
    const res = await fetch(`http://localhost:3000/api/contact/${id}`);
    const data = await res.json();

    return {
        props: {
            data: data,
        },
    };
}






