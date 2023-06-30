import {
  Box,
  Circle,
  HStack,
  Input,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { IconText } from "./IconText";
import { FaMailBulk, FaLocationArrow, FaPhone } from "react-icons/fa";

export const ContactUs = () => {
  return (
    <Box my="7rem" w={{ base: "80%", lg: "80%" }} mx="auto">
      <Box pos="relative">
        <Box
          boxShadow="0px 8px 16px 0px rgba(18, 18, 18, 0.15)"
          bgColor="white"
          border="0.5px solid #E8E8E8"
          p="4rem 4rem 8rem"
          w="80%"
        >
          <Box w="50%">
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

            <VStack spacing="1.5rem" mt="1rem">
              <Input
                placeholder="Enter discount code"
                h="2.6rem"
                borderRadius="0"
                w="full"
              />{" "}
              <Input
                placeholder="Enter discount code"
                h="2.6rem"
                borderRadius="0"
                w="full"
              />{" "}
              <Textarea
                placeholder="Enter discount code"
                h="2.6rem"
                borderRadius="0"
                w="full"
                resize="none"
              />
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
          color="white"
          transform="translateY(-50%)"
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
              text="hi@studiomart.io, info@studiomart.io"
            />
            <IconText
              icon={FaLocationArrow}
              text="10, Kayode Street, Ikeja, Lagos."
            />
            <IconText icon={FaPhone} text="+2348031363759, +2347031363759 " />
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};
