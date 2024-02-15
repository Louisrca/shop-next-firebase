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
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const data = await getUserById(user, user.uid);
        setRole(data?.role);
      }
    };
    fetchData();
  }, [user]);

  useEffect(() => {
    if (user && role === "seller") {
      router.push("/home");
    } else if (user && role === "client") {
      router.push("/home-client");
    } else {
      router.push("/");
    }
  }, [role]);

  return <>{children}</>;
}
