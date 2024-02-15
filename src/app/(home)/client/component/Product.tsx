"use client";

import { Products } from "@/app/model/products";
import { useEffect, useState } from "react";
import { getProducts } from "../../../api/products/products";

const Product = () => {
  const [products, setProducts] = useState<Products[]>([]);
  console.log("🚀 ~ Product ~ product:", products);

  useEffect(() => {
    const fetchProduct = async () => {
      const productData = await getProducts();
      setProducts(productData);
    };

    fetchProduct();
  }, []);

  return (
    <div>
      {products.length <= 0 ? (
        <div> Aucune donnée!</div>
      ) : (
        products.map((product: Products) => {
          <div key={product.id}>{product.description}</div>;
        })
      )}
    </div>
  );
};

export default Product;
