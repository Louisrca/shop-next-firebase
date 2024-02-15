"use client";
import { useAuth } from "@/context/AuthUserProvider";
import { useEffect, useState } from "react";
import SignUp from "./(auth)/signup/page";
import { getUserById } from "./api/user/user";
import { User } from "./model/user";





export default function Home() {

  const [role, setRole] = useState<User>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserById(user, user.uid);
      setRole(data);
    };

    // Appeler la fonction fetchData définie dans useEffect
    fetchData();
  }, [user]);
  console.log(role);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignUp />
    </main>
  );
}
