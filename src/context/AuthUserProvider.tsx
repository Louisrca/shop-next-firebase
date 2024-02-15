"use client";
import React, { useContext, useState, createContext, useEffect } from "react";

import { auth, db } from "../app/api/firebase-config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";

export interface UserType {
  email: string | null;
  uid: string | null;
}

interface AuthContextType {
  user: UserType | null;
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
  const [user, setUser] = useState<UserType>({ email: null, uid: null });
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
    // Assurez-vous que cette fonction ne retourne rien explicitement
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
      // Retiré la ligne 'return user;' pour respecter la signature de l'interface Promise<void>
    } else {
      throw new Error("User creation failed");
    }
  };

  // Login the user
  const logIn = async (email: string, password: string): Promise<void> => {
    // Assurez-vous que cette fonction ne retourne rien explicitement
    await signInWithEmailAndPassword(auth, email, password);
  };

  // Logout the user
  const logOut = async (): Promise<void> => {
    // Assurez-vous que cette fonction ne retourne rien explicitement
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, signUp, logIn, logOut }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
