import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import db from '@/data/db.json';
import ProductCard from '@/components/productcategroy/ProductCard';
import Search from '@/components/search/Search';

const Index = () => {
    const { category } = useRouter().query;
    const [products, setProducts] = useState([]);
    const [searchKey , setSearchKey] =useState('');
    

    useEffect(() => {
        setProducts(db[category] || [])
        setSearchKey('')
    }, [category])

    useEffect(() => {
        if(category && db[category]){
            const searchProduct = db[category].filter((product) =>
                product.text.includes(searchKey)
            )
            setProducts(searchProduct)
            
        }
    }, [searchKey])



    if (!category) return null;

    return (
        <div className="container mx-auto my-6">

            {/* search */}
            <div className=" flex items-center justify-center my-4">
                <div className="relative w-full max-w-md">
                    {/* input */}
                    <input
                        onChange={(e) => setSearchKey(e.target.value)}
                        value={searchKey}
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


            <div className="laptops ">
                <h1 className="text-2xl my-5">{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
                <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5   gap-6">
                    {
                        products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    }


                </div>
            </div>
        </div>
    );
}

export default Index;
