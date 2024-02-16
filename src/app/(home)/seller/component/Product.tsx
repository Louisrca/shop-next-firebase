"use client";

import { Products } from "@/app/model/products";
import { useEffect, useState } from "react";
import { getProducts } from "../../../api/products/products";

import FormProduct from "./FormProduct";

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

  // const handleOnSubmit=()=>{
  //   // updateProduct({ ...productData, [e.target.name]: e.target.value })
  // }

  return (
    <div>

    <h1 style={{fontSize: 34, fontWeight:800}}>Tous les produits</h1>
    <div style={{display : "grid", gridTemplateColumns:"1fr 1fr 1fr 1fr"}}>
      {products.length <= 0 ? (
        <p>Loading...</p>
      ) : (
        products.map((product) => (
            <FormProduct key={product.id ?? ""} id={product.id} name={product.name} description={product.description} price={product.price} file={product.file} category={product.category} user={product.user}  />
        ))
      )}
    </div>
    </div>
  );
};

export default Product;
