import React from "react";
import { VStack, Circle, Icon, Text } from "@chakra-ui/react";
import { GiMissileLauncher } from "react-icons/gi";

export const NotFound = () => {
  return (
    <VStack>
      <Circle size="20rem" bgColor="gray.100">
        <Icon as={GiMissileLauncher} fontSize="12rem" color="gray.500" />
      </Circle>
      <VStack justify="center">
        <Text mb="0" color="gray.500" fontSize="2rem">
          Sorry, we don&apos;t have that yet
        </Text>
        <Text
          mb="0"
          color="gray.400"
          fontSize="1rem"
          w="80%"
          textAlign="center"
        >
          We are constantly updating our services bank to ensure you get one at
          all but, please check back later
        </Text>
      </VStack>
    </VStack>
  );
};
