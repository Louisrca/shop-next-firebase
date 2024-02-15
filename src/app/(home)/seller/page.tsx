"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthUserProvider";
import app, { db } from "../../config/firebase-config";
import { addDoc, collection, doc, getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getUserById } from "../../api/user/user";
import { User } from "../../model/user";

const HomeSeller = () => {
  const { user, logOut } = useAuth();

  const [productData, setProductData] = useState({
    file: "",
    name: "",
    description: "",
    price: 0,
    category: "",
  });

  let userRef: User | null = null;

  useEffect(() => {
    console.log("useEffect", productData);
  }, [productData]);

  const uploadFile = async (file: File): Promise<string> => {
    const storage = getStorage(app);

    const storageRef = ref(storage, `/products/${file.name}`);

    try {
      const snapshot = await uploadBytes(storageRef, file);

      const fileUrl = await getDownloadURL(snapshot.ref);
      return fileUrl;
    } catch (error) {
      console.error("Upload failed", error);
      throw new Error("Upload failed: " + error);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length === 0) {
      console.log("No file selected.");
      return;
    }

    const file = files[0];

    try {
      const fileUrl = await uploadFile(file);

      setProductData((prevProductData) => ({
        ...prevProductData,
        file: fileUrl,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user && user.uid) {
      userRef = doc(db, "users", user.uid);
      return userRef?.id;
    } else {
      console.error("No user found");
    }

    if (!productData.file) {
      console.log("No file selected.");
      return;
    }

    try {
      const firestore = getFirestore();
      await addDoc(collection(firestore, "products"), {
        ...productData,
        category: productData.category,
        description: productData.description,
        price: productData.price,
        name: productData.name,
        // user: userRef,
      });

      console.log("Product uploaded successfully", productData);
    } catch (error) {
      console.error("An error occurred during the product upload:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <label>Nom du produit</label>
        <Input
          type="text"
          name="name"
          placeholder="Nom du produit"
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>Description</label>
        <Input
          type="text"
          name="description"
          placeholder="Description du produit"
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label> Prix</label>
        <Input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label> Categorie</label>
        <Input
          type="text"
          name="category"
          placeholder="Category"
          onChange={handleInputChange}
        />
      </div>
      <Input type="file" onChange={handleFileChange} />

      <Button type="submit">Add Product</Button>
    </form>
  );
};

export default HomeSeller;
