import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const NavbarUser = () => {
    const router = useRouter().pathname;
   
    return (
        <div>
            <nav className=" border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4">
                  
                    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <Link href="/user" className="border md:bg-transparent p-4 px-3.5 py-1 rounded-sm" aria-current="page" style={{color:`${router === '/user'? 'red' : 'black'}`}}>کاربران</Link>
                            </li>
                            <li>
                                <Link href="/user/add-user" style={{color:`${router === '/user/add-user'?'red':'black'}`}} className="border md:bg-transparent p-4 px-3.5 py-1 rounded-sm">افزودن کاربر</Link>
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </nav>

        </div>
    );
}

export default NavbarUser;
