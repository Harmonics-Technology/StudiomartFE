import { Box, Center, HStack, Image, Text, Button } from "@chakra-ui/react";
import React from "react";
import { FaStar } from "react-icons/fa";
import Link from "next/link";

const PopularStudioCard = () => {
    return (
        <Box role="group">
            <Box position="relative">
                <Image
                    h={["180px", "380px"]}
                    rounded="2xl"
                    objectFit="cover"
                    src="/pixel1.png"
                    alt=""
                />

                <Box
                    position="absolute"
                    rounded="2xl"
                    top="0"
                    w="full"
                    h="full"
                    transition="all .5s ease"
                    _groupHover={{ bgColor: "blackAlpha.600" }}
                >
                    <Center h="100%">
                        <Link href="/customer/details">
                            <Button
                                display="none"
                                bgColor="white"
                                color="brand.100"
                                fontSize={[".8rem", "1rem"]}
                                px={["5", "8"]}
                                h={["8", "12"]}
                                _groupHover={{ display: "block" }}
                            >
                                Book Now
                            </Button>
                        </Link>
                    </Center>
                </Box>
            </Box>
            <HStack align="baseline" justify="space-between" fontWeight="600">
                <Text fontSize={[".7rem", "1.3rem"]} noOfLines={1}>
                    Juggernaut Studio
                </Text>
                <Text fontSize={[".7rem", "1rem"]}>
                    70,000 NGN{" "}
                    <Text
                        color="#808080"
                        fontWeight="normal"
                        fontSize={["5px", "initial"]}
                        as="span"
                    >
                        per hour
                    </Text>
                </Text>
            </HStack>
            <HStack align="baseline" mt="-5" justify="space-between">
                <Text
                    color="#808080"
                    noOfLines={1}
                    fontSize={[".7rem", "14px"]}
                    mt={["2", "0"]}
                >
                    Ikoyi, Lagos
                </Text>
                <HStack
                    spacing={["1", "unset"]}
                    align="baseline"
                    fontSize={[".7rem", "13px"]}
                >
                    <FaStar color="#FACC15" />
                    <FaStar color="#FACC15" />
                    <FaStar color="#FACC15" />
                    <FaStar color="#FACC15" />
                    <FaStar color="#FACC15" />

                    <Text color="#808080" as="span" fontSize={["8px", "13px"]}>
                        5 star
                    </Text>
                </HStack>
            </HStack>
        </Box>
    );
};

export default PopularStudioCard;
