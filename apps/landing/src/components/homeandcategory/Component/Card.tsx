import React from "react";
import {
    Box,
    Button,
    HStack,
    Image,
    Center,
    Link,
    Text,
    VStack,
    Spacer,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

const Card = (props: any) => {
    return (
        <Box
            w={{ base: "full", md: "100%", lg: "25rem", xl: "25rem" }}
            h={{ base: "full", md: "100%", lg: "25rem", xl: "25rem" }}
            p="0.25rem"
            mb="2rem"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            alignItems="center"
            role="group"
        >
            <Box
                w={{ base: "full", md: "100%", lg: "25rem", xl: "25rem" }}
                h={["full", ""]}
                position="relative"
            >
                <Image
                    transition=".5s ease"
                    src={props.img}
                    alt="image one"
                    _groupHover={{ filter: "blur(5px)" }}
                    w="full"
                    h="full"
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
                                fontSize={[".5rem", "1rem"]}
                                px={["2", "8"]}
                                h={["6", "12"]}
                                w={["25vw", "15vw"]}
                                _groupHover={{ display: "block" }}
                            >
                                Book Now
                            </Button>
                        </Link>
                    </Center>
                </Box>
            </Box>
            <Box
                mt={["2", "4"]}
                w="100%"
                alignItems="center"
                justifyContent="space-between"
                display="flex"
            >
                <VStack align="flex-start">
                    <Text
                        fontWeight="600"
                        fontSize={[".5em", "1rem", "1rem", "1em"]}
                        whiteSpace="nowrap"
                        mb="-1"
                    >
                        Juggernaut Studio &nbsp;
                    </Text>
                    <Text
                        fontWeight="400"
                        fontSize={[".5em", "1rem", "1rem", "1em"]}
                        color="#808080"
                    >
                        Lekki, Lagos
                    </Text>
                </VStack>
                <Spacer />
                <VStack>
                    <Text
                        fontWeight="600"
                        fontSize={[".45em", "1rem", "1rem", "1em"]}
                        whiteSpace="nowrap"
                        mb="0"
                    >
                        70,000 NGN{" "}
                        <small style={{ color: "#808080" }}> per hour</small>
                    </Text>

                    <Box
                        fontWeight=""
                        fontSize={[".5em", "1rem", "1rem", "1em"]}
                    >
                        <HStack spacing="">
                            <HStack
                                spacing={["1", "unset"]}
                                align="baseline"
                                fontSize={[".65em", "1rem", "1rem", "1em"]}
                            >
                                <FaStar color="#FACC15" />
                                <FaStar color="#FACC15" />
                                <FaStar color="#FACC15" />
                                <FaStar color="#FACC15" />
                                <FaStar color="#FACC15" />
                            </HStack>
                            {/* <Image src="/star.png" boxSize="" alt="" /> */}
                            <small style={{ color: "#808080" }}>. 5 star</small>
                        </HStack>
                    </Box>
                </VStack>
            </Box>
        </Box>
    );
};

export default Card;
