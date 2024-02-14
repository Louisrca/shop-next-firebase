"use client";
import React, { useContext } from "react";
import { useUserContext } from "@/context/AuthUserProvider";

export default function page() {
  const email = useUserContext();

  // Now you can use uuidUser in your component
  console.log("UUID User:", email);
  return <div>Youre in Home Page</div>;
}
