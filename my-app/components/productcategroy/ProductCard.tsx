import React from "react";

const ProductCard = ({ product }) => {
    return (

        <>
            {/* search box */}
         




            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                {/* تصویر */}
                <div>
                    <img
                        className="w-28 text-center mx-auto"
                        src={product.image}
                    />
                </div>

                {/* محتوا */}
                <div className="p-6 font_sm flex flex-col items-center gap-2">
                    <span className="block text-sm font-semibold text-gray-400 mb-1">
                        {product.text}
                    </span>
                    <h2 className="font-bold text-gray-800 mb-4"> {product.text} </h2>
                    <h2 className="font-bold text-gray-800 mb-4"> لپ تاپ </h2>

                    <div className="flex items-center flex-col  gap-3 justify-between">
                        <p className="font-extrabold text-gray-900">
                            {product.price.toLocaleString()}
                            <span className="text-sm font-medium text-gray-500 align-middle">
                                تومان
                            </span>
                        </p>

                        <button
                            type="button"
                            className="bg-blue-600 cursor-pointer text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-700 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
                        >
                            افزودن به سبد
                        </button>
                    </div>
                </div>
            </div>

        </>




    );
};

export default ProductCard;
