"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthUserProvider";

const HomeClient = () => {
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
};

export default HomeClient;
