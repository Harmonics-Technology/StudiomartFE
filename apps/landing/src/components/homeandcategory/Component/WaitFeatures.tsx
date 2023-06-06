import { Flex, VStack, Box, Text, Image } from "@chakra-ui/react";
import { title } from "process";
import React from "react";

export const WaitFeatures = ({ title, note, img }: any) => {
  return (
    <Flex
      bgColor={"rgba(165, 166, 246, 0.15)"}
      borderRadius="4px"
      h={{ base: "290px", md: "300px", lg: "400px" }}
      w="full"
      align="center"
      justify="center"
      px="1rem"
    >
      <VStack>
        <Image src={img} alt="img" h="100px" w="auto" />
        <VStack mt="2rem">
          <Text
            fontSize="24px"
            fontWeight="600"
            color="#171717"
            mb="0"
            textAlign="center"
          >
            {title}
          </Text>
          <Text
            fontSize="16px"
            fontWeight="400"
            color="#171717"
            mb="0"
            lineHeight="27px"
            textAlign="center"
          >
            {note}
          </Text>
        </VStack>
      </VStack>
    </Flex>
  );
};
