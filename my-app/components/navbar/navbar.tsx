import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast/headless";

const Navbar = ({ isAuth, setIsAuth }) => {

  // logOut 
  const logOutHandler = async () => {
    const res = await axios.get("/api/auth/logout")
    if (res.status === 200) {
     
      toast.success('Successfully toasted!')

      setIsAuth(false)
    } else {
      setIsAuth(true)
    }
  }

  return (
    <div className=" font_sm border-b border-gray-300">
      <Toaster/>
      <nav className=" m-auto container bg-white border-gray-200 dark:bg-gray-900">
        <div className=" flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">

            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-6 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  href="/"
                  className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                  aria-current="page"
                >
                  صفحه اصلی
                </Link>
              </li>

              <li>
                <Link
                  href="/articles"
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  مقالات
                </Link>
              </li>


              <li>
                <Link
                  href="/about"
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  درباره ما
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  تماس با ما
                </Link>
              </li>

              <li>
                <Link
                  href="/user"
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  کاربران
                </Link>
              </li>

              <li>
                <Link
                  href="/mobiles"
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  موبایل
                </Link>
              </li>


              <li>
                <Link
                  href="/viewsb/viewsb"
                  className="block py-2 px-3 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700 cursor-pointer"
                  aria-current="page"
                >
                  سریال پذیری پی در پی
                </Link>
              </li>


              <li>
                <Link
                  href="/2pl"
                  className="block py-2 px-3 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700 cursor-pointer"
                  aria-current="page"
                >
                  2pl
                </Link>
              </li>
            </ul>

          </div>
          {
            !isAuth &&
            <div className="font_sm" >
              <Link href='/auth/loginSMS' className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300  rounded-full  px-5 py-1.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">ورود</Link>


              <Link href='/auth/register' className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300  rounded-full  px-5 py-1.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">ثبت نام</Link>
            </div>

          }
          {
            isAuth &&

            <div className="flex flex-wrap gap-3">

              <div className="font_sm" >
                <Link href='/dashboard' className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-blue-300  rounded-full  px-5 py-1.5 text-center  mb-2 dark:bg-blue-600 dark:hover:bg-red-700 dark:focus:ring-blue-800">داشبورد</Link>
              </div>

              <div className="font_sm" >
                <Link

                  onClick={logOutHandler}
                  href='/auth/login'
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300  rounded-full  px-5 py-1.5 text-center  mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">خروج</Link>
              </div>

            </div>

          }



        </div>
      </nav>
    </div>
  );
};

export default Navbar;
