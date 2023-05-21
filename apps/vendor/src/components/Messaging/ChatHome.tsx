import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import TopPage from "src/utils/TopPage";
import { Chat } from "./Chat";
import { SideBar } from "./SideBar";

export const ChatHome = () => {
  return (
    <Box mb="3rem">
      <TopPage
        page={"Messages"}
        details={"Here you can chat with your prospects"}
        right={false}
      />
      <Flex w="93%" mx="auto" mt="1.8rem" gap="2rem" h="78vh" overflow="hidden">
        <SideBar />
        <Chat />
      </Flex>
    </Box>
  );
};
