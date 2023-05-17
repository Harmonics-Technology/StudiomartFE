import React from "react";
import { Box, Text } from "@chakra-ui/react";

interface InfoProps {
  title: any;
  desc: any;
  des?: boolean;
}

export const InfoBox = ({ title, desc, des }: InfoProps) => {
  return (
    <Box w="full">
      <Text fontWeight="600" mb="0">
        {title}
      </Text>
      <Text
        border="1px solid"
        borderColor="gray.300"
        p="1rem"
        borderRadius="8px"
        w="full"
        minH={des ? "11.2rem" : "3.5rem"}
      >
        {desc}
      </Text>
    </Box>
  );
};