import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import BackToPage from "src/utils/BackToPage";
import Rating from "src/utils/Rating";

const booking = () => {
  return (
    <Box w=" 100%" minH="100vh" py="30px">
      <Box w="90%" mx="auto">
        <BackToPage name="Back to booking" path="/" />
        <Flex
          flexDirection={["column", "column", "row"]}
          gap={["0px", "30px"]}
          pt="30px"
        >
          <Box width={["100%", "100%", "50%"]}>
            <Heading
              w="100%"
              bg="rgba(21, 112, 250, 0.1)"
              p="10px"
              fontSize={["24px", "32px"]}
              sx={{
                "::first-letter": {
                  textTransform: "capitalize",
                },
              }}
            >
              studio detail
            </Heading>

            <VStack alignItems="flex-start" w="100%" mt="15px" pl="10px">
              <Text
                w="100%"
                fontWeight={600}
                sx={{
                  "::first-letter": {
                    textTransform: "uppercase",
                  },
                }}
                mb="0"
              >
                jugernaut studio - 70,000 NGN{" "}
                <span
                  style={{
                    fontSize: "12px",
                    color: "#718096",
                    textTransform: "capitalize",
                  }}
                >
                  per hour
                </span>
              </Text>

              <Text
                lineHeight={1.5}
                color="gray.500"
                w="100%"
                fontWeight={600}
                textTransform="capitalize"
              >
                lekki, lagos
              </Text>

              <Rating />
            </VStack>

            <VStack alignItems="flex-start" w="100%" mt="10px" spacing={3}>
              <Heading
                w="100%"
                mt="20px"
                bg="rgba(21, 112, 250, 0.1)"
                p="10px"
                fontSize={["24px", "32px"]}
                sx={{
                  "::first-letter": {
                    textTransform: "capitalize",
                  },
                }}
              >
                date and time
              </Heading>

              <Text
                lineHeight={1.5}
                w="100%"
                fontWeight={600}
                textTransform="capitalize"
                pl="10px"
                pt="10px"
              >
                thursday 16, june 2022{" "}
                <span
                  style={{
                    fontWeight: 400,
                    textTransform: "lowercase",
                  }}
                >
                  (10:00a.m-11a.m)
                </span>
              </Text>
            </VStack>

            <Heading
              w="100%"
              bg="rgba(21, 112, 250, 0.1)"
              p="10px"
              fontSize={["24px", "32px"]}
              mt="20px"
              sx={{
                "::first-letter": {
                  textTransform: "capitalize",
                },
              }}
            >
              additional service
            </Heading>

            <Checkbox p="10px">
              Studio Engineer -
              <span
                style={{
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                1,000 ngn
              </span>
            </Checkbox>
          </Box>
          <Box width={["100%", "100%", "50%"]}>
            <Heading
              textTransform="capitalize"
              bg="rgba(21, 112, 250, 0.1)"
              fontSize={["24px", "26px"]}
              p="25px 20px"
              color="brand.100"
            >
              booking summary
            </Heading>

            <VStack
              spacing={5}
              alignItems="flex-start"
              p="20px 20px 30px"
              bg="rgba(21, 112, 250, 0.1)"
              borderTop="2px solid white"
            >
              <Flex alignItems="center" w="100%">
                <Text
                  w="50%"
                  mb="0"
                  fontSize={["14px", "16px"]}
                  sx={{
                    "::first-letter": {
                      textTransform: "capitalize",
                    },
                  }}
                >
                  studio name:
                </Text>
                <Text
                  w="50%"
                  mb="0"
                  textAlign="right"
                  fontWeight={600}
                  fontSize={["16px", "18px"]}
                  sx={{
                    "::first-letter": {
                      textTransform: "capitalize",
                    },
                  }}
                >
                  jaggernaut studios
                </Text>
              </Flex>

              <Flex alignItems="center" w="100%">
                <Text
                  w="50%"
                  mb="0"
                  fontSize={["14px", "16px"]}
                  sx={{
                    "::first-letter": {
                      textTransform: "capitalize",
                    },
                  }}
                >
                  studio date:
                </Text>
                <Text
                  w="50%"
                  mb="0"
                  textAlign="right"
                  fontWeight={600}
                  fontSize={["16px", "18px"]}
                  sx={{
                    "::first-letter": {
                      textTransform: "capitalize",
                    },
                  }}
                >
                  07/07/07
                </Text>
              </Flex>

              <Flex alignItems="center" w="100%">
                <Text
                  w="50%"
                  mb="0"
                  fontSize={["14px", "16px"]}
                  sx={{
                    "::first-letter": {
                      textTransform: "capitalize",
                    },
                  }}
                >
                  studio time:
                </Text>
                <Text
                  w="50%"
                  mb="0"
                  textAlign="right"
                  fontWeight={600}
                  fontSize={["16px", "18px"]}
                  sx={{
                    "::first-letter": {
                      textTransform: "capitalize",
                    },
                  }}
                >
                  10a.m - 11a.m
                </Text>
              </Flex>
            </VStack>

            <VStack
              spacing={5}
              alignItems="flex-start"
              p="20px 20px 30px"
              bg="rgba(21, 112, 250, 0.1)"
              borderTop="2px solid white"
            >
              <Flex alignItems="center" w="100%">
                <Text
                  w="50%"
                  mb="0"
                  fontSize={["14px", "16px"]}
                  sx={{
                    "::first-letter": {
                      textTransform: "capitalize",
                    },
                  }}
                >
                  studio amount per hour:
                </Text>
                <Text
                  w="50%"
                  mb="0"
                  textAlign="right"
                  fontWeight={600}
                  fontSize={["16px", "18px"]}
                  sx={{
                    "::first-letter": {
                      textTransform: "capitalize",
                    },
                  }}
                >
                  70,000 NGN
                </Text>
              </Flex>

              <Flex alignItems="center" w="100%">
                <Text
                  w="50%"
                  mb="0"
                  fontSize={["14px", "16px"]}
                  sx={{
                    "::first-letter": {
                      textTransform: "capitalize",
                    },
                  }}
                >
                  studio engineer:
                </Text>
                <Text
                  w="50%"
                  mb="0"
                  textAlign="right"
                  fontWeight={600}
                  fontSize={["16px", "18px"]}
                  sx={{
                    "::first-letter": {
                      textTransform: "capitalize",
                    },
                  }}
                >
                  1,000 NGN
                </Text>
              </Flex>

              <Flex alignItems="center" w="100%">
                <Text
                  w="50%"
                  mb="0"
                  fontSize={["14px", "16px"]}
                  fontWeight={600}
                  sx={{
                    "::first-letter": {
                      textTransform: "capitalize",
                    },
                  }}
                >
                  total:
                </Text>
                <Text
                  w="50%"
                  mb="0"
                  textAlign="right"
                  fontWeight={600}
                  fontSize={["16px", "18px"]}
                  sx={{
                    "::first-letter": {
                      textTransform: "capitalize",
                    },
                  }}
                >
                  71,000 NGN
                </Text>
              </Flex>

              <Flex w="100%">
                <Box
                  mt="30px"
                  w="110px"
                  h="50px"
                  bg="brand.100"
                  borderRadius="5px"
                  overflow="hidden"
                  mx="auto"
                >
                  <Button
                    width="100%"
                    height="100%"
                    bg="transparent"
                    outline="none"
                    borderRadius="none"
                    color="white"
                    textTransform="capitalize"
                  >
                    checkout
                  </Button>
                </Box>
              </Flex>
            </VStack>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default booking;
