import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import NoSSR from "react-no-ssr";
import { Chat } from "./Chat";
import { SideBar } from "./SideBar";

export const ChatHome = () => {
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
        >
          <SideBar />
          <Chat />
        </Flex>
      </Box>
    </NoSSR>
  );
};
