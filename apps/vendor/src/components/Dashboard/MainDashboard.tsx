import { Box, Text } from "@chakra-ui/react";
import React from "react";

export const MainDashboard = () => {
  return (
    <Box bgColor="red" color="white" p="1rem 1rem" w="50%">
      <Box
        bgColor="blue"
        pl="1rem"
        py=".5rem"
        _hover={{
          bgColor: "yellow",
          transition: ".5s ease",
        }}
      >
        <Text fontWeight="bold" fontSize="3xl">
          This is a box and thid is yhj
        </Text>
      </Box>
    </Box>
  );
};
