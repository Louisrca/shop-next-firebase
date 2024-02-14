"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../api/firebase-config";
import { useForm } from "react-hook-form";

// import { useAuth } from '../context/AuthUserContext';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");
  const form = useForm();

  const handleOnSubmit = async (event: any) => {
    event.preventDefault();
    try {
      if (passwordOne)
        createUserWithEmailAndPassword(auth, email, passwordOne)
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleOnSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default SignUp;
