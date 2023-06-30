import React from "react";
import { Box, Text } from "@chakra-ui/react";
import parse from "html-react-parser";

export const SingleText = ({
  title,
  text,
}: {
  title: string;
  text: string;
}) => {
  return (
    <Box>
      <Text
        fontSize={["1rem", "1.5rem"]}
        fontFamily="BR Firma"
        fontWeight="700"
        mb="2rem"
      >
        {title}
      </Text>
      <Text fontSize={["1.1rem"]} mb="0" px={[".5rem", "1.5rem"]}>
        {parse(text)}
      </Text>
    </Box>
  );
};
