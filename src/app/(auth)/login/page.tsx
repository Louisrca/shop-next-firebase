"use client";
import { useState, FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../api/firebase-config";


const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();


  const handleOnSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      if (password)
        await signInWithEmailAndPassword(auth, email, password).then(() => {
          console.log("Success. The user is logged in Firebase");
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
      <Button onClick={() => router.push("/")}>Sign Up ? </Button>
    </form>
  );
};

export default LogIn;
