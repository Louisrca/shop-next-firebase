"use client";
import React, { useContext } from "react";
import { useAuth } from "@/context/AuthUserProvider";

export default function page() {
  const { user } = useAuth();

  // Now you can use uuidUser in your component

  console.log("UUID User:", user.email);

  return <div>Youre in Home Page</div>;
}
