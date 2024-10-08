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
import moment from "moment";
import React, { useContext } from "react";
import { BsCheckAll } from "react-icons/bs";

export const Chats = ({ chat, handleSelect }: any) => {
  const { currentUser } = useContext(AuthContext);

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
