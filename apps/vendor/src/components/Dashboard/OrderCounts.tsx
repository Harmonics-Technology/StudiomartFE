import { HStack, Box, Text, Flex } from "@chakra-ui/react";
import React from "react";

interface orderProps {
  br?: boolean;
  count: any;
  title: any;
}

export const OrderCounts = ({ br, count, title }: orderProps) => {
  return (
    <Flex
      h="fit-content"
      w="full"
      justify="center"
      borderRight={br ? "none" : "2px solid #AFAFAF"}
    >
      <Box>
        <Text as="b" pl="6" fontSize="32px" fontWeight="700">
          {count}
        </Text>
        <Text fontSize="12px" fontWeight="400">
          {title}
        </Text>
      </Box>
    </Flex>
  );
};
