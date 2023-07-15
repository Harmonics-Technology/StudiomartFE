import {
  Box,
  Button, Input,
  Text,
  Textarea,
  VStack
} from "@chakra-ui/react";
import { FaLocationArrow, FaMailBulk, FaPhone } from "react-icons/fa";
import { IconText } from "./IconText";

export const ContactUs = () => {
  return (
    <Box my={["4rem", "7rem"]} w={{ base: "90%", lg: "80%" }} mx="auto">
      <Box
        pos="relative"
        display={["flex", "block"]}
        flexDir="column-reverse"
        gap="2rem"
      >
        <Box
          boxShadow={["none", "0px 8px 16px 0px rgba(18, 18, 18, 0.15)"]}
          bgColor="white"
          border="0.5px solid #E8E8E8"
          p={["2rem", "4rem 4rem 8rem"]}
          w={["full", "80%"]}
        >
          <Box w={["full", "50%"]}>
            <Text
              fontSize={["1.5rem", "2rem"]}
              fontFamily="BR Firma"
              fontWeight="700"
              mb=".5rem"
            >
              Get In Touch
            </Text>
            <Text fontSize={["1.1rem"]}>
              Feel free to contact us any time, we will get back to you as soon
              as we can
            </Text>

            <VStack spacing="1.5rem" mt="3rem" align="flex-start">
              <Input
                placeholder="Your name"
                h="3rem"
                borderRadius="4px"
                w="full"
              />{" "}
              <Input
                placeholder="Your email"
                h="3rem"
                borderRadius="4px"
                w="full"
              />{" "}
              <Textarea
                placeholder="Your message"
                borderRadius="4px"
                w="full"
                resize="none"
              />
              <Button
                bgColor="brand.100"
                color="white"
                px="3rem"
                h="3rem"
                borderRadius="0"
              >
                Send Message
              </Button>
            </VStack>
          </Box>
        </Box>
        <Box
          bgColor="brand.100"
          w={["full", "29rem"]}
          p="2rem 1.5rem"
          pos={["relative", "absolute"]}
          right="0"
          top="50%"
          // order="0"
          color="white"
          transform={["0", "translateY(-50%)"]}
        >
          <Text
            fontSize={["1.5rem", "2rem"]}
            fontFamily="BR Firma"
            fontWeight="700"
            mb="2rem"
          >
            Contact us
          </Text>
          <VStack align="flex-start" spacing="2.2rem">
            <IconText
              icon={FaMailBulk}
              text="hello@studiomart.io, info@studiomart.io"
            />
            <IconText
              icon={FaLocationArrow}
              text="Harmonics Technology Building, Isolo, Lagos."
            />
            <IconText
              icon={FaPhone}
              text="+234 818 004 1801, +234 803 604 4563 "
            />
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};
