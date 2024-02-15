"use client";

import { Products } from "@/app/model/products";
import { useEffect, useState } from "react";
import { getProducts } from "../../../api/products/products";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

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
        <h1 style={{fontSize: 34, fontWeight:800}}>Tous les produits</h1>
        <div style={{display : "grid", gridTemplateColumns:"1fr 1fr 1fr 1fr"}}>
        {products.length <= 0 ? (
            <p>Loading...</p>
        ) : (
            products.map((product) => (
            
            <Card key={product.id}>
            <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>{product.price}</p>
            </CardContent>
            <CardContent>
            {product.file && product.description ? (
                <img src={product.file} alt={product.description} />
                ) : (
                <span>Image non disponible</span>
                )}
            </CardContent>
            <CardFooter>
                <p>{product.category}</p>
            </CardFooter>
            </Card>
            ))
        )}
        </div>
    </div>
  );
};

export default Product;
