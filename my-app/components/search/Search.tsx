import React from "react";

function Search() {
   
    return (
        <div className=" flex items-center justify-center my-4">
            <div className="relative w-full max-w-md">
                {/* input */}
                <input
                   
                    type="text"
                    placeholder="جستجو کنید..."
                    className="w-full pl-12 pr-4 py-2 rounded-2xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400"
                />

                {/* آیکون سرچ */}
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default Search;
