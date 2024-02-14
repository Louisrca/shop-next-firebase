"use client";
import React, { ReactNode, useContext, useState, createContext } from "react";

// Création du contexte avec un type de valeur correct
interface AuthContextType {
  uuidUser: string | undefined;
  setUuidUser: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const AuthContext = createContext<any>({
  uuidUser: undefined,
  setUuidUser: () => {},
});

// Composant de fourniture du contexte
export default function AuthUserProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [uuidUser, setUuidUser] = useState<string | undefined>(undefined);

  return (
    <AuthContext.Provider value={{ uuidUser, setUuidUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook pour consommer le contexte
export const useUserContext = () => useContext(AuthContext);
