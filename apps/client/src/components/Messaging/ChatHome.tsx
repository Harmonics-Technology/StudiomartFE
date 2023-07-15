import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";
import NoSSR from "react-no-ssr";
import { Chat } from "./Chat";
import { SideBar } from "./SideBar";

export const ChatHome = () => {
  const [showChat, setShowChat] = useState(false);
  return (
    <NoSSR>
      <Box mb="3rem">
        <Flex
          w="90%"
          mx="auto"
          mt="1.8rem"
          gap="2rem"
          h="78vh"
          overflow="hidden"
          pos="relative"
        >
          <SideBar showChat={showChat} setShowChat={setShowChat} />
          <Chat showChat={showChat} setShowChat={setShowChat} />
        </Flex>
      </Box>
    </NoSSR>
  );
};
