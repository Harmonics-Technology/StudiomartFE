import React, { ReactNode, createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export const UserContext = createContext<any>(null);
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>();
  const [userStudios, setUserStudios] = useState<any>();
  const loggedInUser = Cookies.get("vendor");
  const userStudio = Cookies.get("vendorStudios");

  const logout = ({ tokenValue, userDetails }: any) => {
    Cookies.remove(tokenValue);
    Cookies.remove(userDetails);
    Cookies.remove("user");
  };
  useEffect(() => {
    if (loggedInUser !== undefined) {
      setUser(JSON.parse(loggedInUser));
      setUserStudios(JSON.parse(userStudio as string));
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contextValue = { user, setUser, logout, userStudios, setUserStudios };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
