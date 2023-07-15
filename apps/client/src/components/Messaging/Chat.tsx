import {
  Avatar,
  Box,
  Circle,
  Heading,
  HStack,
  Icon,
  Text
} from "@chakra-ui/react";
import { AuthContext } from "@components/Context/AuthContext";
import { ChatContext } from "@components/Context/ChatContext";
import { useContext } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { MdBlock } from "react-icons/md";
import { MenuDropdown } from "ui";
import { Inputs } from "./Input";
import { Messages } from "./Messages";

export const Chat = ({ showChat, setShowChat }: any) => {
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  const deleteChat = () => {
    //
  };
  const reportChat = () => {
    //
  };
  return (
    <Box
      bgColor="white"
      borderRadius="8px"
      p={{ base: "2rem 0rem", lg: "2rem 2rem" }}
      w={{ base: "100%", lg: "72%" }}
      pos={{ base: "absolute", lg: "relative" }}
      left={{ base: showChat ? "0%" : "100%", lg: "0" }}
      transition="all .3s ease"
    >
      {data.chatId !== "null" && (
        <>
          <HStack
            justify="space-between"
            borderBottom="1px solid"
            borderColor="gray.300"
            pb=".5rem"
          >
            <HStack spacing={2}>
              <Icon
                as={IoIosArrowBack}
                onClick={() => setShowChat((prev: any) => !prev)}
                display={{ base: "block", lg: "none" }}
              />
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
