import React, { ReactNode, createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export const UserContext = createContext<any>(null);
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>();
  const logout = ({ tokenValue, userDetails }: any) => {
    Cookies.remove(tokenValue);
    Cookies.remove(userDetails);
    Cookies.remove("user");
  };
  const loggedInUser = Cookies.get("client");

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
