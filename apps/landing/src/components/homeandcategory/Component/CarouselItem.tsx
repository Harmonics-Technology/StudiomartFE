import { Box, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { WaitBtn } from "./WaitBtn";

export const CarouselItem = ({ img, blueTitle, title, note, onOpen }: any) => {
  return (
    <Flex h="650px" bgImage={`url(${img})`} align="center">
      <VStack w="full" spacing="1.5rem">
        <HStack
          fontWeight="700"
          letterSpacing="-0.02em"
          color="white"
          justify="center"
        >
          <Heading
            fontFamily="Work Sans"
            color="white"
            fontSize="64px"
            w="100%"
            textAlign="center"
          >
            <span style={{ color: "#1570fa" }}>{blueTitle}</span> {title}
          </Heading>
          {/* <Heading fontFamily="Work Sans" fontSize="64px"></Heading> */}
        </HStack>
        <Text
          color="white"
          mb="0"
          fontWeight="600"
          fontSize="18px"
          lineHeight="27px"
          textAlign="center"
          w="60%"
        >
          {note}
        </Text>
        <Flex justify="center" w="20%">
          <WaitBtn onOpen={onOpen} />
        </Flex>
      </VStack>
    </Flex>
  );
};
