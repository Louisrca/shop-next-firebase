"use client";
import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthUserProvider";

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { signUp } = useAuth();

  const handleOnSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      if (password)
        await signUp(email, password).then(() => {
          console.log("Success. The user is created in Firebase");
          router.push("/home");
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form onSubmit={handleOnSubmit} className="space-y-8">
      <div>
        <label>Username</label>
        <Input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password</label>
        <Input
          placeholder="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <Button type="submit">Submit</Button>
      </div>
      <Button onClick={() => router.push("/login")}>Log In ? </Button>
    </form>
  );
};

export default SignUp;
