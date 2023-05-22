import React, {
  ReactNode,
  createContext,
  useEffect,
  useState,
  useContext,
} from "react";
import { auth } from "@components/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { UserContext } from "./UserContext";
import Cookies from "js-cookie";

export const AuthContext = createContext<any>(null);
export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<any>();
  // const [user, setUser] = useState<any>();
  const loggedInUser = Cookies.get("vendor");

  // const chatUser = {
  //   uid: user?.id,
  //   displayName: user?.firstName,
  //   photoURL: user?.profilePicture,
  // };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (loggedUser) => {
      // setCurrentUser(loggedUser);
      if (loggedInUser !== undefined) {
        const user = JSON.parse(loggedInUser);
        setCurrentUser({
          uid: user?.id,
          displayName: user?.firstName,
          photoURL: user?.profilePicture,
        });
      }
    });
    return () => {
      unsub();
    };
  }, []);

  const contextValue = { currentUser, setCurrentUser };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
