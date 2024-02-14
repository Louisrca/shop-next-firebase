"use client";
import React, { useContext } from "react";
import { AuthContext } from "@/context/AuthUserProvider";

export default function page() {
  const uuidUser = useContext(AuthContext);

  // Now you can use uuidUser in your component
  console.log("UUID User:", uuidUser);
  return <div>Youre in Home Page</div>;
}
