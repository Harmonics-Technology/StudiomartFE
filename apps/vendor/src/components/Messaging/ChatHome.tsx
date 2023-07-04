import { Box, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import NoSSR from "react-no-ssr";
import TopPage from "src/utils/TopPage";
import { Chat } from "./Chat";
import { SideBar } from "./SideBar";

export const ChatHome = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <NoSSR>
      <Box mb="3rem">
        <TopPage
          page={"Messages"}
          details={"Here you can chat with your prospects"}
          right={false}
        />
        <Flex
          w="93%"
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
