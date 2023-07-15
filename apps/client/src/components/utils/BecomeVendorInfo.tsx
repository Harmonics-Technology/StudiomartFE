import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { PiDotFill } from "react-icons/pi";

export const BecomeVendorInfo = ({ content, title }: any) => {
  return (
    <HStack align="baseline" spacing="7" w={["full", "90%"]}>
      <Box fontSize={["1.2rem", "1.5rem"]}>
        <PiDotFill />
      </Box>
      <VStack align="start">
        <Text
          mb="0"
          fontWeight="bold"
          fontSize={["1.1rem", "1.5rem"]}
          fontFamily="BR Firma"
        >
          {title}
        </Text>
        <Text lineHeight={["24px", "32px"]} fontSize={[".9rem", "1.1rem"]}>
          {content}
        </Text>
      </VStack>
    </HStack>
  );
};
