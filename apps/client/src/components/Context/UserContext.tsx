import React, { ReactNode, createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { getDeviceFromUserAgent } from "ui";

export const UserContext = createContext<any>(null);
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const logout = (tokenValue: any, path?: any) => {
    tokenValue.map((x: any) => Cookies.remove(x));
    router.push(path || "/login");
  };
  const [user, setUser] = useState<any>();
  const loggedInUser = Cookies.get("customer");
  const [userType, setUserType] = useState("");
  const [device, setDevice] = useState("");
  const router = useRouter();
  const isCustomer = Cookies.get("user");

  useEffect(() => {
    if (loggedInUser !== undefined) {
      setUser(JSON.parse(loggedInUser));
      isCustomer == "Customer" && setUserType(isCustomer);
    }

    setDevice(getDeviceFromUserAgent(window.navigator.userAgent));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contextValue = {
    user,
    setUser,
    logout,
    userType,
    device,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
