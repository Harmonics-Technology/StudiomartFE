import {
  Avatar,
  Box,
  Circle,
  Flex,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { AuthContext } from "@components/Context/AuthContext";
import { ChatContext } from "@components/Context/ChatContext";
import { app, db } from "@components/firebase/firebase";
import { doc, onSnapshot, updateDoc, getFirestore } from "firebase/firestore";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { BsCheckAll } from "react-icons/bs";

export const Chats = ({ chat }: any) => {
  const { dispatch, data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  const handleSelect = async (u: any) => {
    const combinedId =
      currentUser?.uid > u?.userInfo.uid
        ? currentUser?.uid + u?.userInfo?.uid
        : u?.userInfo?.uid + currentUser?.uid;
    console.log({ combinedId, u });
    dispatch({ type: "CHANGE_USER", payload: u?.userInfo });
    if (u.isRead == false) {
      await updateDoc(doc(db, "userChats", u.userInfo.uid), {
        [combinedId + ".isRead"]: true,
        [combinedId + ".lastMessage.isRead"]: true,
      });
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [combinedId + ".isRead"]: true,
        [combinedId + ".lastMessage.isRead"]: true,
      });
    }
  };

  // await updateDoc(doc(db, "userChats", currentUser.uid), {
  //   [data.chatId + ".isRead"]: true,
  //   [data.chatId + ".lastMessage.isRead"]: true,
  // });

  console.log({ chat });

  return (
    <>
      {!chat ? (
        <></>
      ) : (
        <Box
          py="1rem"
          borderBottom="1px solid"
          borderColor="gray.200"
          mt="1rem"
        >
          {Object?.entries(chat)?.map((chat: any) => (
            <Flex
              justify="space-between"
              px="1rem"
              key={chat[1]?.userInfo?.id}
              onClick={() => handleSelect(chat[1])}
              cursor="pointer"
            >
              <HStack spacing={2} w="78%">
                <Avatar
                  src={chat[1]?.userInfo?.photoURL}
                  name={chat[1]?.userInfo?.displayName}
                  size="md"
                />
                <Box>
                  <Heading fontSize="1rem" color="#333333" mb=".1rem">
                    {chat[1]?.userInfo?.displayName}
                  </Heading>
                  <Text mb="0" fontSize=".9rem" noOfLines={1}>
                    {chat[1]?.lastMessage?.text}
                  </Text>
                </Box>
              </HStack>
              <VStack h="full" justify="space-between" align="flex-end">
                <Text mb="0" fontSize=".9rem" noOfLines={1}>
                  {moment(
                    chat[1]?.date?.seconds * 1000 +
                      Math.round(chat[1]?.date?.nanoseconds / 1000000)
                  ).calendar(null, {
                    sameDay: "[] LT",
                    sameElse: "[] MMM DD",
                    nextDay: "[] MMM DD",
                    nextWeek: "[] MMM DD",
                    lastDay: "[] MMM DD",
                    lastWeek: "[] MMM DD",
                  })}
                </Text>
                {chat[1]?.lastMessage?.isRead == true &&
                chat[1].lastMessage.senderId === currentUser.uid ? (
                  <Icon as={BsCheckAll} color="green" fontSize=".9rem" />
                ) : chat[1]?.lastMessage?.isRead == false &&
                  chat[1].lastMessage.senderId === currentUser.uid ? (
                  <Icon as={BsCheckAll} color="gray.300" fontSize=".9rem" />
                ) : chat[1]?.lastMessage?.isRead == false &&
                  chat[1].lastMessage.senderId !== currentUser.uid ? (
                  <Circle
                    bgColor="red"
                    color="white"
                    size=".9rem"
                    fontSize=".6rem"
                  >
                    1
                  </Circle>
                ) : (
                  ""
                )}
              </VStack>
            </Flex>
          ))}
        </Box>
      )}
    </>
  );
};
