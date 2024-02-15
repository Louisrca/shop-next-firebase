"use client";

import { Products } from "@/app/model/products";
import { useEffect, useState } from "react";
import { getProducts, updateProduct } from "../../../api/products/products";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";



const FormProduct = ({id, name, description, price, file, category, user} : Products )=> {
  const [products, setProducts] = useState<Products[]>([]);
  
  const [productName, setProductName] = useState<string|undefined>(name)
  const [productDescription, setProductDescription] = useState<string|undefined>(description)
  const [productPrice, setProductPrice] = useState<string|undefined>(price?.toString())
  const [productFile, setProductFile] = useState<string|undefined>(file)
  const [productCategory, setProductCategory] = useState<string|undefined>(category)
  
  useEffect(() => {
    const fetchProduct = async () => {
      const productData = await getProducts();
      setProducts(productData);
    };

    fetchProduct();
  }, []);

  const handleOnSubmit=()=>{
    // updateProduct({ ...productData, [e.target.name]: e.target.value })
  }

  return (
    <div>
        <form onSubmit={handleOnSubmit}>
            <Card key={id} style={{margin: 8}}>
                <CardHeader>
                    <CardTitle>Title</CardTitle>
                    <Input value={productName} onChange={(e)=>{setProductName(e.target.value)}}/>
                    <CardTitle>Description</CardTitle>
                    <Textarea value={productDescription} onChange={(e)=>{setProductDescription(e.target.value)}}/>
                </CardHeader>
                <CardContent>
                    <CardTitle>Price</CardTitle>
                    <Input type="number" value={productPrice} onChange={(e)=>{setProductPrice(e.target.value)}}/>
                </CardContent>
                <CardContent>
                        <CardTitle>Image</CardTitle>
                        <img style={{margin:"4% 0 4% 0", borderRadius:8, boxShadow:"0px 4px 10px rgba(0, 0, 0, 0.1)"}} src={productFile} alt={productDescription}  />
                        <Input type="file" onChange={(e)=>{setProductFile(e.target.value)}}/>
                </CardContent>
                <CardContent>
                    <CardTitle>Category</CardTitle>
                    <Input value={productCategory} onChange={(e)=>{setProductCategory(e.target.value)}}/>
                </CardContent>
                <CardContent>
                <Button>Update</Button>
                </CardContent>
               
            </Card>
        </form>
        
   
    </div>
  );
};

export default FormProduct;
