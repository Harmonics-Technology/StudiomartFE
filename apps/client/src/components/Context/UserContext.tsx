import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { createContext, ReactNode, useEffect, useState } from "react";
import { getDeviceFromUserAgent } from "ui";

export const UserContext = createContext<any>(null);
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const logout = (tokenValue: any, path?: any) => {
    tokenValue.map((x: any) => Cookies.remove(x));
    router.push(path || "/login");
  };
  let user;
  const loggedInUser = Cookies.get("customer");
  let userType;
  let device;
  const router = useRouter();
  const isCustomer = Cookies.get("user");

  if (loggedInUser !== undefined) {
    user = JSON.parse(loggedInUser);
    userType = isCustomer;
    device = getDeviceFromUserAgent(window.navigator.userAgent);
  }


  const contextValue = {
    user,
    logout,
    userType,
    device,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
