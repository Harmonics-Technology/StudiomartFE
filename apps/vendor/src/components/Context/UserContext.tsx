import React, { ReactNode, createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export const UserContext = createContext<any>(null);
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>();
  const [userStudios, setUserStudios] = useState<any>();
  const [currentStudioId, setCurrentStudioId] = useState<any>();
  const userStudio = Cookies.get("vendorStudios");
  const router = useRouter();
  const logout = (tokenValue: any, userDetails: any, path?: any) => {
    Cookies.remove(tokenValue);
    Cookies.remove(userDetails);
    router.push(path || "/login");
    // Cookies.remove("user");
  };
  const studio = Cookies.get("currentStudioId");
  const loggedInUser = Cookies.get("vendor");

  useEffect(() => {
    if (loggedInUser !== undefined && userStudio) {
      setUser(JSON.parse(loggedInUser));
      setUserStudios(JSON.parse(userStudio as string));
      setCurrentStudioId(studio);
      // if (studio !== undefined) {
      //   setCurrentStudioId(studio);
      // } else {
      //   setCurrentStudioId(JSON.parse(userStudio as string)[0].id);
      // }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contextValue = {
    user,
    setUser,
    logout,
    userStudios,
    currentStudioId,
    setCurrentStudioId,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
