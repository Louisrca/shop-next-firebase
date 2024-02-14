"use client";
import React, { useContext } from "react";
import { useAuth } from "@/context/AuthUserProvider";

export default function Home() {
   const { user, logOut } = useAuth();

  // Now you can use uuidUser in your component

  console.log("UUID User:", user);

  return <div>Youre in Home Page</div>;
}
