import { Avatar, Box, Circle, Heading, HStack, Text } from "@chakra-ui/react";
import { AuthContext } from "@components/Context/AuthContext";
import { ChatContext } from "@components/Context/ChatContext";
import React, { useContext } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { MdBlock } from "react-icons/md";
import { MenuDropdown } from "ui";
import { Inputs } from "./Input";
import { Messages } from "./Messages";

export const Chat = () => {
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);
  console.log({ data, currentUser });
  const deleteChat = () => {
    //
  };
  const reportChat = () => {
    //
  };
  return (
    <Box bgColor="white" borderRadius="8px" p="2rem 2rem" w="72%">
      {data.chatId !== "null" && (
        <>
          <HStack
            justify="space-between"
            borderBottom="1px solid"
            borderColor="gray.300"
            pb=".5rem"
          >
            <HStack spacing={2}>
              <Avatar src="" name={data?.user?.displayName} size="sm" />
              <Box>
                <Heading
                  fontSize="1rem"
                  color="#333333"
                  mb=".1rem"
                  textTransform="capitalize"
                >
                  {data?.user?.displayName}
                </Heading>
                <HStack>
                  <Circle size=".5rem" bgColor="green" />
                  <Text mb="0" fontSize=".8rem" noOfLines={1} color="gray.500">
                    Active
                  </Text>
                </HStack>
              </Box>
            </HStack>
            <MenuDropdown
              menus={[
                {
                  label: "Delete",
                  id: 1,
                  onclick: deleteChat,
                  icon: BsFillTrashFill,
                },
                {
                  label: "Report",
                  id: 1,
                  onclick: reportChat,
                  icon: MdBlock,
                  color: "red",
                },
              ]}
            />
          </HStack>
          <Messages />
          <Inputs />
        </>
      )}
    </Box>
  );
};
