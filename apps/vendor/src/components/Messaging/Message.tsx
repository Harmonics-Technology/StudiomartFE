import { Box, Flex, Image, VStack, Text } from "@chakra-ui/react";
import { AuthContext } from "@components/Context/AuthContext";
import { ChatContext } from "@components/Context/ChatContext";
import moment from "moment";
import React, { useContext, useEffect, useRef } from "react";

export const Message = ({ message }: any) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef<any>();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const send = message.senderId === currentUser.uid;
  return (
    <Flex ref={ref} flexDirection={send ? "row-reverse" : "row"} mb="1.5rem">
      <VStack align={send ? "flex-end" : "flex-start"}>
        {message?.img && <Image src={message?.img} alt="" maxW="200px" />}

        {message?.text && (
          <Box
            p=".8rem 1rem"
            bgColor={send ? "gray.400" : "brand.100"}
            color="white"
            borderRadius={send ? "90px 90px 0px 90px" : "90px 90px 90px 0px"}
            maxW="25rem"
          >
            {message?.text}
          </Box>
        )}
        <Text fontSize=".6rem" color="gray.500">
          {moment(
            message?.date?.seconds * 1000 +
              Math.round(message?.date.nanoseconds / 1000000)
          ).calendar()}
        </Text>
      </VStack>
    </Flex>
  );
};
