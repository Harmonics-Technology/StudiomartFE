import { AuthContext } from "@components/Context/AuthContext";
import { ChatContext } from "@components/Context/ChatContext";
import { db } from "@components/firebase/firebase";
import { Td, Spinner, Box } from "@chakra-ui/react";
import { BsFillChatRightTextFill } from "react-icons/bs";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { ReactNode, useContext, useState } from "react";

export default function HandleSelectChat({
  chatUser,
  url,
  setLoading,
  children,
}: {
  chatUser: any;
  url: string;
  setLoading: any;
  children: ReactNode;
}) {
  const { dispatch } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();
  const handleSelect = async (chatUser: any) => {
    setLoading(true);
    const combinedId =
      currentUser?.uid > chatUser.uid
        ? currentUser?.uid + chatUser.uid
        : chatUser.uid + currentUser?.uid;

        try {
          const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        console.log('yeah')
        await setDoc(doc(db, "chats", combinedId), {
          messages: [],
        });
        await updateDoc(doc(db, "userChats", currentUser?.uid), {
           [combinedId + '.userInfo']: {
            uid: chatUser.uid,
            displayName: chatUser.displayName,
            photoURL: chatUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", chatUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser?.uid,
            displayName: currentUser?.displayName,
            photoURL: currentUser?.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        setLoading(false);
        router.push(url);
      } else {
        console.log("nope")
        dispatch({ type: "CHANGE_USER", payload: chatUser });
        setLoading(false);
        router.push(url);
      }
    } catch (error) {
      setLoading(false);
      console.log({error})
    }
  };
  return (
    <Box onClick={() => handleSelect(chatUser)} cursor="pointer" w="full">
      {children}
    </Box>
  );
}
