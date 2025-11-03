"use client";
import NavbarUser from "@/components/navbar_user/Navbar_User";
import Link from "next/link";
import { useState } from "react";

export default function ContactTable() {
    const [contacts, setContacts] = useState([
        { id: 1, name: "محمد", family: "خسروی", age: 25, gender: "مرد", phone: "09121234567" },
        { id: 2, name: "سارا", family: "موسوی", age: 23, gender: "زن", phone: "09351234567" },
    ]);

    const handleEdit = (id) => {
        alert(`ویرایش ردیف ${id}`);
    };

    const handleDelete = (id) => {
        if (confirm("آیا از حذف این ردیف مطمئن هستید؟")) {
            setContacts(contacts.filter((item) => item.id !== id));
        }
    };

    return (
        <div className="container mx-auto my-5 font_sm ">
            <NavbarUser />
            <div className="overflow-x-auto  border border-gray-200 shadow-md bg-white font_sm mt-3">
                <table className="min-w-full  text-gray-700 text-right">
                    <thead className="bg-gray-100 text-gray-800">
                        <tr>
                            <th className="py-3 px-4 ">ردیف</th>
                            <th className="py-3 px-4 ">نام</th>
                            <th className="py-3 px-4 ">نام خانوادگی</th>
                            <th className="py-3 px-4 ">سن</th>
                            <th className="py-3 px-4 ">جنسیت</th>
                            <th className="py-3 px-4 ">شماره تماس</th>
                            <th className="py-3 px-4  text-center">ویرایش</th>
                            <th className="py-3 px-4  text-center">حذف</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {contacts.map((person, index) => (
                            <tr key={person.id} className="hover:bg-gray-50 transition">
                                <td className="py-3 px-4">{index + 1}</td>
                                <td className="py-3 px-4">{person.name}</td>
                                <td className="py-3 px-4">{person.family}</td>
                                <td className="py-3 px-4">{person.age}</td>
                                <td className="py-3 px-4">{person.gender}</td>
                                <td className="py-3 px-4">{person.phone}</td>
                                <td className="py-3 px-4 text-center">
                                    <Link
                                        href={`/contacts/edit/${person.id}`}
                                        className="inline-block px-4 py-1.5 rounded-xl   bg-green-700 text-white
                 shadow-md hover:shadow-lg 
               hover:from-blue-600 hover:to-indigo-700 transition-all duration-200"
                                    >
                                         ✏️ ویرایش
                                    </Link>
                                </td>

                                <td className="py-3 px-4 text-center">
                                    <button
                                        onClick={() => handleDelete(person.id)}
                                        className="px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                                    >
                                        حذف
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
