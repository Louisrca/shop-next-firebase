"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthUserProvider";

export default function HomeClient() {
  const { logOut } = useAuth();
  return (
    <div>
      <Button
        onClick={() => {
          logOut();
        }}
      >
        Logout
      </Button>
    </div>
  );
}
