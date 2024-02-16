"use client";
import React, { useContext } from "react";
import { useAuth } from "@/context/AuthUserProvider";

export default function Home() {
  const { user, logOut } = useAuth();

  return <div>Youre in Home Page {user.email}</div>;
}
