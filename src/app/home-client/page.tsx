"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthUserProvider";

export default function HomeClient() {
  const { user, logOut } = useAuth();
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
