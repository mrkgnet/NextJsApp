import { useRouter } from 'next/router';
import React from 'react';

const MobildDetails = ({data}) => {
  const { mobileid } = useRouter().query;
 


  return (
    <div className="container mx-auto my-4">

      <div className="container mx-auto p-8">
        <div className="grid md:grid-cols-2 gap-10 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">

          {/* سمت راست: تصویر محصول */}
          <div className="flex justify-center items-center overflow-hidden rounded-xl">
            <img
              src={data.image}
              alt="MacBook Pro M3"
              className="w-52 rounded-xl object-contain max-h-[400px] transition-transform duration-500 ease-in-out hover:scale-110 cursor-zoom-in"
            />
          </div>

          {/* سمت چپ: اطلاعات محصول */}
          <div className="flex flex-col justify-center space-y-6">
            <h1 className=" text-gray-900 dark:text-white">
             {data.title}
            </h1>

            <p className="font_sm text-gray-500 dark:text-gray-300 leading-relaxed">
             {data.description}
            </p>

            <div>
              <p className="text-gray-700 dark:text-gray-200 font-semibold mb-2">
                برند: Apple
              </p>
              <p className="font_sm font-bold text-blue-600">
                ۸۵٬۰۰۰٬۰۰۰ تومان
              </p>
            </div>

            <button className="w-fit px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 font_sm">
              افزودن به سبد خرید
            </button>
          </div>
        </div>
      </div>
    </div>
  );

}

export default MobildDetails;

export async function getServerSideProps(context:any) {
  const { params,req,res,query } = context;
  console.log(query.brand);
  const response = await fetch(`https://fakestoreapi.com/products/${params.mobileid}`);
  const data = await response.json();
  console.log(data);

  return {
    props: {
      data:data
    }
  } 
}