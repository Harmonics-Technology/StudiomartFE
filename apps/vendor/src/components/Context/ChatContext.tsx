import React, {
  ReactNode,
  createContext,
  useEffect,
  useState,
  useContext,
  useReducer,
} from "react";
import { auth } from "@components/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext<any>(null);
export const ChatContextProvider = ({ children }: { children: ReactNode }) => {
  //   const [currentUser, setCurrentUser] = useState<any>();
  const { currentUser } = useContext(AuthContext);

  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };
  const chatReducer = (state: any, action: any) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser?.uid > action?.payload?.uid
              ? currentUser?.uid + action?.payload?.uid
              : action?.payload?.uid + currentUser?.uid,
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  const contextValue = { data: state, dispatch };
  return (
    <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>
  );
};
