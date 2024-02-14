"use client";
import React, {
  ReactNode,
  useContext,
  useState,
  createContext,
  useEffect,
  use,
} from "react";

import { auth, db } from "../app/api/firebase-config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import firebase from "firebase/app";
import "firebase/firestore";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

interface UserType {
  email: string | null;
  uid: string | null;
}

const AuthContext = createContext({});

export const useAuth = () => useContext<any>(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Define the constants for the user and loading state
  const [user, setUser] = useState<UserType>({ email: null, uid: null });
  const [loading, setLoading] = useState<Boolean>(true);

  // Update the state depending on auth
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
    role: string
  ) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
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
      return user;
    }
    throw new Error("User creation failed");
  };

  // Login the user
  const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Logout the user
  const logOut = async () => {
    setUser({ email: null, uid: null });
    return await signOut(auth);
  };

  // Wrap the children with the context provider
  return (
    <AuthContext.Provider value={{ user, signUp, logIn, logOut }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
