import {
  Box,
  Flex,
  Image,
  VStack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { AuthContext } from "@components/Context/AuthContext";
import { ChatContext } from "@components/Context/ChatContext";
import { ImageLightBox } from "ui";
import moment from "moment";
import React, { useContext, useEffect, useRef, useState } from "react";

export const Message = ({ message }: any) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef<any>();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const send = message.senderId === currentUser.uid;
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex ref={ref} flexDirection={send ? "row-reverse" : "row"} mb="1.5rem">
      <VStack align={send ? "flex-end" : "flex-start"}>
        {message?.img && (
          <Image src={message?.img} alt="" maxW="200px" onClick={onOpen} />
        )}

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
      <ImageLightBox isOpen={isOpen} onClose={onClose} image={message?.img} />
    </Flex>
  );
};
