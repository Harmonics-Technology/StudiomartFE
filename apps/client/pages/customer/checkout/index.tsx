import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  HStack,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import BackToPage from "src/utils/BackToPage";
import Cvcinputgroup from "src/utils/Cvcinputgroup";
import PrimaryInput from "src/utils/PrimaryInput";
import PrimarySelect from "src/utils/PrimarySelect";

const CustomerCheckout = () => {
  const months = ["jan"];
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
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
              payment
            </Heading>

            <form>
              <VStack alignItems="flex-start" spacing={5}>
                <Box w={["100%", "100%", "350px"]}>
                  <PrimaryInput<any>
                    name="cardnumber"
                    register={register}
                    error={undefined}
                    label="card number*"
                    type="text"
                    placeholder="1234  5678  9101  1213"
                    fontWeight={500}
                  />
                </Box>

                <Box w="100%">
                  <Flex w="100%" justifyContent="space-between">
                    <Text
                      w="50%"
                      fontWeight={600}
                      textTransform="capitalize"
                      mb="0px"
                    >
                      expiration date
                    </Text>

                    <Text
                      w="50%"
                      fontWeight={600}
                      textTransform="uppercase"
                      mb="0px"
                      textAlign="right"
                    >
                      cvc*
                    </Text>
                  </Flex>
                  <HStack w="100%" spacing={3}>
                    <PrimarySelect label="" options={months} my="5px" />

                    <PrimarySelect options={months} label="" my="5px" />

                    <Cvcinputgroup />
                  </HStack>
                </Box>

                <PrimaryInput
                  name="cardnumber"
                  register={register}
                  error={undefined}
                  label="name on card*"
                  type="text"
                  placeholder="Enter your card holder's name"
                  fontWeight={500}
                />

                <HStack w="100%">
                  <Checkbox />

                  <Flex direction="column" w="100%" alignItems="flex-start">
                    <Text w="100%" mb="0px" fontWeight={600}>
                      Save credit card information for next time
                    </Text>

                    <Text
                      w="100%"
                      mb="0px"
                      fontSize="14px"
                      color="#DFDFE6"
                      fontWeight={600}
                    >
                      This will enable instant checkout in future
                    </Text>
                  </Flex>
                </HStack>
              </VStack>

              <Flex
                w="100%"
                my="30px"
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
                  book studio
                </Button>
              </Flex>
            </form>
          </Box>
          <Box width={["100%", "100%", "50%"]}>
            <Heading
              textTransform="capitalize"
              bg="rgba(21, 112, 250, 0.1)"
              fontSize={["20px", "24px"]}
              p="15px 20px"
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
            </VStack>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default CustomerCheckout;
