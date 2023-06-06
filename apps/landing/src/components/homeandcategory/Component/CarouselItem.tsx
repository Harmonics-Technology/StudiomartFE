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
            fontSize={{ base: "35px", md: "45px", lg: "64px" }}
            w={{ base: "95%", md: "100%", lg: "100%" }}
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
          fontSize={{ base: "16px", md: "18px", lg: "18px" }}
          lineHeight="27px"
          textAlign="center"
          w={{ base: "90%", md: "80%", lg: "60%" }}
        >
          {note}
        </Text>
        <Flex justify="center" w={["80%", "20%"]}>
          <WaitBtn onOpen={onOpen} />
        </Flex>
      </VStack>
    </Flex>
  );
};
