import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/navbar/navbar";
import { useRouter } from "next/router";
import ProductCard from "@/components/productcategroy/ProductCard";
import db from "@/data/db.json";

export default function Home() {

  const getClickHandler = async () => {
    const res = await fetch("http://localhost:3000/api/hello", { method: "GET" });
    const data1 = await res.json();
    console.log(data1);
  }


  const postClickHandler = async () => {
    const res = await fetch("http://localhost:3000/api/hello", { method: 'POST' });
    const data = await res.json();
    console.log(data);

  }
  return (
    <>
      <div className="container mx-auto px-4 py-10 ">

  

        <div className="laptops">
          <h1 className="text-2xl my-5">لپ تاپ </h1>
          <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5   gap-6">
            {db.laptop.slice(0, 4).map((product, index) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        <div className="mobile">

          <h1 className="text-2xl my-5">موبایل</h1>

          <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5   gap-6">

            {
              db.mobile.slice(0, 4).map((product, index) => (
                <ProductCard key={product.id} product={product} />
              ))

            }
          </div>
        </div>








      </div>
    </>
  );
}
