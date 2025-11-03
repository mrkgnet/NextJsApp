import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import db from "@/data/db.json";
import ProductCard from "@/components/productcategroy/ProductCard";

const Subcat = () => {
  const router = useRouter();
  const { category, brand } = router.query;
  const [subBrand, setSubBrand] = useState([]);

  useEffect(() => {
    if (category && brand && db[category]) {
      const subBrandData = db[category].filter(
        (item) => item.brand.toLowerCase() === brand.toLowerCase()
      );
      setSubBrand(subBrandData);
    }
  }, [category, brand]);

  if (!category || !brand) return null;

  return (
    <div className="container mx-auto my-4  ">
      <h1>{brand}-{category} </h1>
     

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-6">
        {subBrand.map((e) => (
          <ProductCard key={e.id} product={e} />
        ))}
      </div>
    </div>
  );
};

export default Subcat;
