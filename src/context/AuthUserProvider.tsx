import React, {
  ReactNode,
  useContext,
  useState,
  createContext,
  useEffect,
} from "react";

import { User } from "@/app/model/user";

import { auth } from "../app/api/firebase-config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

interface UserType {
  email: string | null;
  uid: string | null;
}

const AuthContext = createContext({});

interface AuthProviderProps {
  children: ReactNode;
}

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserType>({ email: null, uid: null });
  const [loading, setLoading] = useState<Boolean>(true);

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

  const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
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

  return (
    <AuthContext.Provider value={{ user, signUp, logIn, logOut }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
