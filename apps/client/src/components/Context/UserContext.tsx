import React, { ReactNode, createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export const UserContext = createContext<any>(null);
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>();
  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
  };
  const loggedInUser = Cookies.get("user");

  useEffect(() => {
    if (loggedInUser !== undefined) {
      setUser(JSON.parse(loggedInUser));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contextValue = { user, setUser, logout };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
