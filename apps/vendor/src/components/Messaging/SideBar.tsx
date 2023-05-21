import { Box, Image, Text, VStack } from "@chakra-ui/react";
import { AuthContext } from "@components/Context/AuthContext";
import { db } from "@components/firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Chats } from "./Chats";
import { Search } from "./Search";

export const SideBar = () => {
  const [chat, setChat] = useState<any>([]);
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(
        doc(db, "userChats", currentUser?.uid),
        (doc) => {
          setChat(doc.data());
        }
      );
      return () => {
        unsub();
      };
    };

    currentUser?.uid && getChats();
  }, [currentUser?.uid]);
  return (
    <Box bgColor="white" borderRadius="8px" h="78vh" w="28%" py="2rem">
      {Object?.entries(chat)?.length > 0 ? (
        <>
          <Search chat={chat} setChat={setChat} />
          <Chats chat={chat} />
        </>
      ) : (
        <VStack spacing="1rem" justify="center" h="full">
          <Box w="60%">
            <Image src="/assets/no_chat.png" alt="" w="full" />
          </Box>
          <Text fontSize=".9rem" textAlign="center" w="70%">
            You currently don’t have any message, Messages sent to you will
            appear here.
          </Text>
        </VStack>
      )}
    </Box>
  );
};
