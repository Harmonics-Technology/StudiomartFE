import { HStack, Circle, Text } from "@chakra-ui/react";
import React from "react";

interface LoginTypeProps {
  loginOption: any[];
  loginType: string;
}

export const LoginTypeBtn = ({ loginOption, loginType }: LoginTypeProps) => {
  return (
    <HStack w="80%" gap=".5rem">
      {loginOption.map((login, i) => (
        <HStack
          key={i}
          w="full"
          h="3rem"
          borderRadius="3px"
          border="2px solid"
          bgColor="transparent"
          borderColor="gray.400"
          color="gray.600"
          justify="center"
          align="center"
          fontWeight="700"
          cursor="pointer"
          onClick={() => {
            window.location.href = login.url;
          }}
        >
          <Circle
            size="1.5rem"
            border="2px solid"
            borderColor={login.text == loginType ? "brand.100" : "gray.300"}
          >
            <Circle
              size=".7rem"
              bgColor={login.text == loginType ? "brand.100" : "transparent"}
            />
          </Circle>
          <Text mb="0">{login.text}</Text>
        </HStack>
      ))}
    </HStack>
  );
};
