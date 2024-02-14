"use client";
import { useState, FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../api/firebase-config";

import { useUserContext } from "@/context/AuthUserProvider";

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const setUuidUser = useUserContext();

  const handleOnSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      if (password)
        await createUserWithEmailAndPassword(auth, email, password).then(
          async (userCredentials) => {
            const user = userCredentials.user;
            console.log("Success. The user is created in Firebase");
            if (user) {
              setUuidUser(user.uid);
              router.push("/home");
            }
          }
        );
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
