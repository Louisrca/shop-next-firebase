"use client";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthUserProvider";
import { db } from "../api/firebase-config";
import app from "../api/firebase-config";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getUserById } from "../api/user/user";

export default function Home() {
  const { user, logOut } = useAuth();
  

  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: 0,
  });
  const [file, setFile] = useState(null);

  const uploadFile = async (file: File): Promise<string> => {
    const storage = getStorage(app);

    const storageRef = ref(storage, `some-child/${file.name}`);

    try {
      const snapshot = await uploadBytes(storageRef, file);
      console.log("Uploaded a blob or file!", snapshot);

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
      console.log("File available at", fileUrl);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e: any) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Assurez-vous que le fichier est sélectionné
    if (!file) {
      console.log("No file selected.");
      return;
    }

    try {
      const fileUrl = await uploadFile(file);

      const firestore = getFirestore();
      const productRef = await addDoc(collection(firestore, "products"), {
        ...productData,
        imageUrl: fileUrl,
        userId: user?.uid,
      });

      console.log("Product added with ID:", productRef.id);
    } catch (error) {
      console.error("An error occurred during the product upload:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label> Title</label>
          <Input
            type="text"
            name="title"
            placeholder="Title"
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label> Description</label>
          <Input
            type="text"
            name="description"
            placeholder="Description du produit"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label> Description</label>
          <Input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleInputChange}
          />
        </div>

        <Input type="file" onChange={handleFileChange} />

        <Button type="submit">Add Product</Button>
      </form>
    </div>
  );
}
