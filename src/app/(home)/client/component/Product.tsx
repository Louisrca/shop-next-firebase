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
        <p>Loading...</p>
      ) : (
        products.map((product) => (
          <div key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>{product.price}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Product;
