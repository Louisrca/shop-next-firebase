"use client";
import { useAuth } from "@/context/AuthUserProvider";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getUserById } from "../api/user/user";

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

    switch (role) {
      case "seller":
        if (user) router.push("/home");
        break;
      case "client":
        if (user) router.push("/home-client");
        break;
      default:
        router.push("/");
        break;
    }
  }, [user, role]);

  return <>{children}</>;
}
