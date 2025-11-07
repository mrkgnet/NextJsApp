
import NavbarUser from "@/components/navbar_user/Navbar_User";
import Link from "next/link";
import { useState } from "react";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { connectDB } from "@/lib/db";
import Contact from "@/models/Contact";
import { FcDeleteColumn } from "react-icons/fc";

export default function ContactTable({ data }) {

    const [contact, setContact] = useState(data)
    const [search, setSearch] = useState("");
    const [gender, setGender] = useState("");
    const [isLoading, setIsLoading] = useState(false)

    // دکمه سرچ
    const handleSearch = async () => {
        setIsLoading(true)
        try {
            const res = await fetch(
                `/api/contact?search=${search}&gender=${gender}`
            );
            const data = await res.json();
            setContact(data);
        } catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false)
        }


    }

    // دکمه حذف 
    const deleteContactHandler = async (id) => {
        if (!confirm("آیا مطمئن هستید می خواهید این مورد را حذف کنید؟")) return;
        setIsLoading(true)
        console.log(contact)
        try {
            const res = await fetch(`/api/contact/${id}`,{method: "DELETE",}
            );
            if (res.ok) {
                setContact(contact.filter((e)=>e._id !== id));
            } else {
                alert("حذف انجام نشد")
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false)
        }




        // try {
        //     const res = await fetch(`/api/contact/${id}`, {
        //         method: "DELETE",
        //     });
        //     const data = await res.json();
        //     setContact(data);
        // } catch (error) {
        //     console.log(error);
        // }
    }



    return (
        <div className="max-w-screen-md mx-auto my-5 font_sm ">
            <NavbarUser />
            <div className="overflow-x-auto  border border-gray-200 shadow-md bg-white font_sm mt-3">
                {/* search top  */}
                <div className="flex flex-col md:flex-row items-center gap-3 bg-white p-4 rounded-lg shadow-md border border-gray-200">
                    {/* 🔹 input جستجو */}
                    <input
                        onChange={(e) => setSearch(e.target.value)}
                        type="search"
                        placeholder="جستجو..."
                        className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                    />

                    {/* 🔹 select جنسیت */}
                    <select
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full md:w-1/5 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                    >
                        <option value="">همه</option>
                        <option value="male">مرد</option>
                        <option value="female">زن</option>
                    </select>

                    {/* 🔹 دکمه */}
                    <button
                        onClick={handleSearch}
                        disabled={isLoading}
                        className={`w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2   ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
                    >
                        {isLoading ? "در حال جستجو..." : "جستجو"}
                    </button>
                </div>



                {/* table */}
                {contact.length > 0 ? (
                    <table className="min-w-full  text-gray-700 text-right">
                        <thead className="bg-gray-100 text-gray-800">
                            <tr>
                                <th className="py-3 px-4 ">ردیف</th>
                                <th className="py-3 px-4 ">نام</th>
                                <th className="py-3 px-4 ">نام خانوادگی</th>
                                <th className="py-3 px-4 ">جنسیت</th>
                                <th className="py-3 px-4 ">سن</th>
                                <th className="py-3 px-4 ">شماره تماس</th>
                                <th className="py-3 px-4  text-center">ویرایش</th>
                                <th className="py-3 px-4  text-center">حذف</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {contact && contact.map((item, index) => (


                                <tr key={item._id} className="hover:bg-gray-50 transition">
                                    <td className="py-3 px-4">{index}</td>
                                    <td className="py-3 px-4">{item.firstname}</td>
                                    <td className="py-3 px-4">
                                        {item.lastname}

                                    </td>
                                    <td className="py-3 px-4">
                                        {item.gender}
                                    </td>
                                    <td className="py-3 px-4">
                                        {item.age}
                                    </td>
                                    <td className="py-3 px-4">
                                        {item.phone}
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                        <Link
                                            href={`/user/edit/${item._id}`}
                                            className="inline-flex gap-2 items-center justify-center px-1.5 py-1 rounded-xl shadow   hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 border hover:text-blue-600 coursor-pointer"
                                        >

                                            <FaRegEdit size={16} />
                                        </Link>
                                    </td>

                                    <td className="py-3 px-4 text-center">
                                        <button
                                            onClick={() => deleteContactHandler(item._id)}
                                            disabled={isLoading}
                                            className={`flex gap-2 items-center justify-center px-1.5 py-1 rounded-xl shadow border transition-all duration-200 cursor-pointer ${isLoading ? "text-gray-400 cursor-not-allowed" : "hover:text-red-600"
                                                }`}
                                        >
                                            {isLoading ? "در حال حذف..." : <MdOutlineDeleteForever size={16} />}
                                        </button>

                                    </td>
                                </tr>
                            ))}


                        </tbody>
                    </table>
                ) : (
                    <div className="text-center py-5">
                        <p>هیچ اطلاعاتی برای نمایش وجود ندارد</p>
                    </div>
                )}

            </div>
        </div>
    );

}



export async function getServerSideProps() {

    await connectDB();
    const data = await Contact.find().lean();
    // const res = await fetch("http://localhost:3000/api/contact");
    // const data = await res.json();
    return {
        props: {
            data: JSON.parse(JSON.stringify(data))
        },
    };
}