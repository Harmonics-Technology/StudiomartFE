import { Box, Icon, Text, VStack } from "@chakra-ui/react";
import React from "react";

export const Options = ({
  onClick,
  icon,
  text,
}: {
  onClick: any;
  icon: any;
  text: string;
}) => {
  return (
    <VStack
      w="full"
      borderRadius="6px"
    //   bgColor="#e5e5e5"
      boxShadow="lg"
      p="1rem"
      onClick={onClick}
      justify="center"
    //   role='group'
      _hover={{
        bgColor: 'brand.100',
        color: 'white'
      }}
    >
      <Icon as={icon} fontSize="3rem" />
      <Text textAlign="center" mb="0">
        {text}
      </Text>
    </VStack>
  );
};
