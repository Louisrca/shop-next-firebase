"use client";
import { useAuth } from "@/context/AuthUserProvider";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getUserById } from "../api/user/user";
import { User } from "../model/user";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const [role, setRole] = useState<string | null>();
  console.log("🚀 ~ role:", role);
  const router = useRouter();
  const { user } = useAuth();
  console.log("🚀 ~ user:", user);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const data = await getUserById(user, user?.uid);
        setRole(data?.role);
      }
    };
    fetchData();

    if (user && role === "seller") {
      router.push("/home");
    } else if (user && role === "client") {
      router.push("/home-client");
    } else {
      router.push("/");
    }
  }, []);

  return <>{children}</>;
}
