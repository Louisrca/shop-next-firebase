"use client";
import React, { useContext, useState, createContext, useEffect } from "react";

import { auth, db } from "../app/config/firebase-config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";
import { User } from "@/app/model/user";

interface AuthContextType {
  user: User | null;
  logIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    role: string,
  ) => Promise<void>;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>({ email: null, uid: null });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          email: user.email,
          uid: user.uid,
        });
      } else {
        setUser({ email: null, uid: null });
      }
    });

    setLoading(false);

    return () => unsubscribe();
  }, []);

  // Sign up the user
  const signUp = async (
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    role: string,
  ): Promise<void> => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;
    if (user) {
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        id: user.uid,
        firstname: firstname,
        lastname: lastname,
        role: role,
      });
    } else {
      throw new Error("User creation failed");
    }
  };

  const logIn = async (email: string, password: string): Promise<void> => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = async (): Promise<void> => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, signUp, logIn, logOut }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
