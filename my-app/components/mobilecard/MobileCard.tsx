import Link from 'next/link';
import { title } from 'process';
import React from 'react';

const Mobilecard = ({ id, image, price, category,title }) => {
  return (
    <div className="bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-lg shadow-sm w-52 px-5 my-4">
      <img
        className="rounded-t-lg w-24 h-24 object-contain text-center m-auto mt-3"
        src={image}
        
      />

      <div className="p-5 text-center">
        <h5 className="mb-2 tracking-tight text-gray-900 dark:text-white font-semibold">
          {title}
        </h5>
        <p className="text-sm text-gray-500">{category}</p>
        <p className="text-green-600 font-bold mt-1">${price}</p>

        <Link href={`/mobiles/detail/${id}`}
          className="inline-flex items-center px-3 py-2 mt-2 text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-sm"
        >
          خرید
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
        <button
          className="inline-flex items-center px-3 py-2 mt-2 ml-2 text-center text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-700 text-sm"
          onClick={() => alert(`آپدیت محصول ${title}`)}
        >
          بروزرسانی قیمت 
        </button>
      </div>
    </div>
  );
};

export default Mobilecard;
