import React from "react";
import {
  Box,
  Button,
  Flex,
  Spacer,
  Text,
  HStack,
  Image,
  Grid,
} from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon, AddIcon } from "@chakra-ui/icons";
function SubHeading() {
  return (
    <Flex>
      <Box>
        <Text fontSize="20px" m="2rem" fontWeight="600">
          Orders Track
        </Text>
      </Box>
      <Spacer />
      <Box>
        <Text fontSize="20px" m="2rem" ml="4rem" fontWeight="600">
          Top Services
        </Text>
      </Box>
      <Spacer />
      <Box>
        <Flex my="2rem" mr="2rem">
          <Box
            bgColor="#636363"
            w="24px"
            borderRadius="full"
            _hover={{
              bgColor: "black",
              transition: ".5s ease",
            }}
          >
            <ArrowBackIcon boxSize="1.2em" color="white" mt="-1" ml="3px" />
          </Box>
          <Spacer m="5px" />
          <Box
            h="23px"
            bgColor="#636363"
            w="24px"
            borderRadius="full"
            _hover={{
              bgColor: "black",
              transition: ".5s ease",
            }}
          >
            <ArrowForwardIcon boxSize="1.2em" color="white" mt="-1" ml="3px" />
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}

export default SubHeading;
