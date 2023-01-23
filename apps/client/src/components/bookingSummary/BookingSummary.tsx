import {
    Box,
    Checkbox,
    Heading,
    HStack,
    Stack,
    Text,
    VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react";
import BackToPage from "src/utils/BackToPage";
import Rating from "src/utils/Rating";
import { Button } from "..";

const BookingSummary = () => {
    const [checked, setChecked] = useState(true);
    return (
        <Box minH="screen" pb="20" pt={["5", "20"]} mx="auto" w="90%">
            <BackToPage path="/" name="Back to studio details" />
            <Stack mt={["10", "14"]} direction={["column", "row"]} spacing="5">
                <Box w={["full", "60%"]}>
                    <Box>
                        <Heading
                            fontSize={["1.2rem", "1.7rem"]}
                            p="4"
                            bgColor="brand.300"
                        >
                            Studio detail
                        </Heading>
                        <VStack py={["6", "8"]} align="flex-start" spacing="2">
                            <Text
                                mb="0"
                                fontWeight={700}
                                fontSize={["1.1rem", "1.3rem"]}
                            >
                                Juggarnaut studio -70,000 NGN {""}
                                <Text
                                    fontSize={[".9rem", "1rem"]}
                                    fontWeight={400}
                                    color="#808080"
                                    as="span"
                                >
                                    Per hour
                                </Text>
                            </Text>
                            <Text color="#808080" fontSize={[".9rem", "1rem"]}>
                                Lekki, Lagos
                            </Text>
                            <Rating />
                        </VStack>
                    </Box>
                    <Box>
                        <Heading
                            fontSize={["1.2rem", "1.7rem"]}
                            p="4"
                            bgColor="brand.300"
                        >
                            Date and time
                        </Heading>
                        <Text
                            py={["6", "8"]}
                            fontWeight={600}
                            fontSize={["1rem", "1.3rem"]}
                        >
                            Thur 16, June 2022{" "}
                            <Text as="span" fontWeight={400}>
                                {" "}
                                (10: 00 am - 11: 00 am)
                            </Text>
                        </Text>
                    </Box>
                    <Box>
                        <Heading
                            fontSize={["1.2rem", "1.7rem"]}
                            p="4"
                            bgColor="brand.300"
                        >
                            Additional services
                        </Heading>
                        <Checkbox
                            size="lg"
                            onChange={() => setChecked((prev) => !prev)}
                            py={["6", "8"]}
                            isChecked={checked}
                        >
                            <Text
                                mb="0"
                                as="span"
                                fontSize={["1rem", "1.3rem"]}
                                fontWeight={400}
                            >
                                Studio engineer -{" "}
                            </Text>
                            <Text
                                as="span"
                                fontWeight={700}
                                fontSize={[".9rem", "1rem"]}
                            >
                                {" "}
                                1,000 NGN
                            </Text>
                        </Checkbox>
                    </Box>
                </Box>
                <Box w={["full", "40%"]}>
                    <Heading
                        fontSize={["1.2rem", "1.7rem"]}
                        py="6"
                        color="brand.100"
                        px="4"
                        bgColor="brand.300"
                    >
                        Booking summary
                    </Heading>
                    <VStack
                        align="flex-start"
                        mt="1"
                        bgColor="brand.300"
                        px="4"
                        py={["8"]}
                        spacing="5"
                        h="80%"
                    >
                        <HStack align="center" w="full" justify="space-between">
                            <Text mb="0">Studio amount per hour:</Text>
                            <Text
                                fontSize={["1.1rem", "1.2rem"]}
                                fontWeight={600}
                            >
                                70,000 NGN
                            </Text>
                        </HStack>
                        {checked && (
                            <HStack
                                align="center"
                                w="full"
                                justify="space-between"
                            >
                                <Text mb="0">Studio engineer:</Text>
                                <Text
                                    fontSize={["1.1rem", "1.2rem"]}
                                    fontWeight={600}
                                >
                                    70,000 NGN
                                </Text>
                            </HStack>
                        )}
                        <HStack align="center" w="full" justify="space-between">
                            <Text
                                mb="0"
                                fontSize={["1.1rem", "1.2rem"]}
                                fontWeight={700}
                            >
                                Total
                            </Text>
                            <Text
                                fontSize={["1.1rem", "1.2rem"]}
                                fontWeight={700}
                            >
                                70,000 NGN
                            </Text>
                        </HStack>
                        <HStack
                            align="center"
                            w="full"
                            justify="center"
                            pt={["10", "20"]}
                            pb={["10", "initial"]}
                        >
                            <Link href="/customer">
                                <Button
                                    bgColor="brand.100"
                                    color="white"
                                    w={["150px", "200px"]}
                                    p="7"
                                    _hover={{
                                        color: "brand.100",
                                        bgColor: "transparent",
                                        border: "2px solid #1570FA",
                                    }}
                                    _focus={{
                                        outline: "none",
                                    }}
                                    variant="solid"
                                    borderRadius="4px"
                                >
                                    Select date
                                </Button>
                            </Link>
                        </HStack>
                    </VStack>
                </Box>
            </Stack>
        </Box>
    );
};

export default BookingSummary;
