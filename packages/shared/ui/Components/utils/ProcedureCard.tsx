import { VStack, Text } from "@chakra-ui/react";
import React from "react";

export const ProcedureCard = ({ num, title, note }: any) => {
  return (
    <VStack spacing="1.2rem" w="290px">
      <Text
        fontSize="24px"
        fontWeight="700"
        color="#5D5FEF"
        mb="0"
        textAlign="center"
        fontFamily="Cabinet Grotesk"
      >
        {num}
      </Text>
      <Text
        fontSize="24px"
        fontWeight="700"
        color="#171717"
        mb="0"
        textAlign="center"
        fontFamily="Work Sans"
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
        fontFamily="Work Sans"
      >
        {note}
      </Text>
    </VStack>
  );
};
