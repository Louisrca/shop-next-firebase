import React, { ReactNode, useContext, useState, createContext } from "react";

const AuthContext = createContext<string | undefined>(undefined);

export default function AuthUserProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [uuidUser, setUuidUser] = useState<string | undefined>(undefined);

  return (
    <AuthContext.Provider value={uuidUser}>{children}</AuthContext.Provider>
  );
}

export const useUserContext = () => useContext(AuthContext);
