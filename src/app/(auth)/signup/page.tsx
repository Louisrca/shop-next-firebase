"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../api/firebase-config";

// import { useAuth } from '../context/AuthUserContext';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");

  const handleOnSubmit = async (event: any) => {
    event.preventDefault();
    try {
      if (password)
        createUserWithEmailAndPassword(auth, email, password)
          .then(() => {
            console.log("Success. The user is created in Firebase");
            router.push("/login");
          })
          .catch((error) => {
            // An error occurred. Set error message to be displayed to user
            setError(error.message);
          });
      else setError("Password do not match");
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
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default SignUp;
