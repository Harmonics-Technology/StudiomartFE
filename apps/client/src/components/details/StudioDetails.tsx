import React from "react";
import {
    Box,
    Heading,
    VStack,
    Text,
    HStack,
    ListItem,
    OrderedList,
    SimpleGrid,
} from "@chakra-ui/react";
import Rating from "src/utils/Rating";
import { Button } from "..";
import Comments from "./Comments";
import { FaStar } from "react-icons/fa";
import ProgressBar from "./Progress";
import BackToPage from "src/utils/BackToPage";
import Carousel from "./Carousel";
import Link from "next/link";

export const StudioDetails = () => {
    return (
        <Box pb="10" pt={["5", "10"]}>
            <Box w="90%" mx="auto" pb="7">
                <BackToPage name="Back to category" path="/customer" />
            </Box>
            <Box>
                <Carousel />
            </Box>

            <Box w="90%" mx="auto">
                <Box>
                    <Heading
                        fontSize={["1.2rem", "1.7rem"]}
                        p="4"
                        bgColor="brand.300"
                    >
                        Studio brief
                    </Heading>
                    <Box py={["6", "8"]}>
                        <VStack align="flex-start" spacing="2">
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
                            <Text
                                fontWeight={500}
                                color="#808080"
                                fontSize={[".9rem", "1rem"]}
                            >
                                Lekki, Lagos
                            </Text>
                            <Rating />
                        </VStack>
                        <Text mt="4" fontWeight={500}>
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Doloribus soluta excepturi iste totam modi
                            eaque culpa fugiat laudantium non tempora,
                            necessitatibus recusandae explicabo officiis? Minima
                            facere mollitia odio laudantium animi vel, debitis
                            officia error placeat maxime eum dicta temporibus
                            incidunt quae architecto accusantium, nostrum esse
                            optio est fugiat. Officiis optio minus hic,
                            recusandae sint asperiores. Eligendi culpa odio ea
                            nulla, quas hic, quaerat veniam vitae provident
                            obcaecati repudiandae eum vero reiciendis illum quam
                            deserunt fuga dolore mollitia error nisi quae? Alias
                            perferendis quisquam quod omnis recusandae. Pariatur
                            iure suscipit aliquam facere possimus non ea quae
                            minima repellendus sed, quidem, nesciunt distinctio
                        </Text>
                    </Box>
                </Box>
                <Box>
                    <Heading
                        fontSize={["1.2rem", "1.7rem"]}
                        p="4"
                        bgColor="brand.300"
                    >
                        Additional services
                    </Heading>
                    <Box py={["6", "8"]}>
                        <Text fontSize={[".9rem", "1rem"]} fontWeight={400}>
                            Studio engineer -{" "}
                            <Text
                                as="span"
                                fontWeight={700}
                                fontSize={["1rem", "1.2rem"]}
                            >
                                {" "}
                                1,000 NGN
                            </Text>
                        </Text>
                        <Text
                            mb="0"
                            fontSize={[".9rem", "1rem"]}
                            fontWeight={400}
                        >
                            Sound mixer -{" "}
                            <Text
                                as="span"
                                fontWeight={700}
                                fontSize={["1rem", "1.2rem"]}
                            >
                                {" "}
                                1,000 NGN
                            </Text>
                        </Text>
                    </Box>
                </Box>
                <Box>
                    <Heading
                        fontSize={["1.2rem", "1.7rem"]}
                        p="4"
                        bgColor="brand.300"
                    >
                        Details to remeber
                    </Heading>
                    <VStack py={["6", "8"]} align="flex-start" spacing="4">
                        <HStack
                            w="300px"
                            fontWeight={500}
                            align="center"
                            justify="space-between"
                            fontSize={[".9rem", "1rem"]}
                        >
                            <Text mb="0">Studio hours</Text>
                            <Text>Open for 12hrs</Text>
                        </HStack>
                        <HStack
                            w="300px"
                            fontWeight={500}
                            align="center"
                            justify="space-between"
                            fontSize={[".9rem", "1rem"]}
                        >
                            <Text mb="0">Max occupancy</Text>
                            <Text>20 people</Text>
                        </HStack>
                        <HStack
                            w="300px"
                            fontWeight={500}
                            align="center"
                            justify="space-between"
                            fontSize={[".9rem", "1rem"]}
                        >
                            <Text mb="0">Max booking</Text>
                            <Text>6hrs</Text>
                        </HStack>
                    </VStack>
                </Box>
                <Box>
                    <Heading
                        fontSize={["1.2rem", "1.7rem"]}
                        p="4"
                        bgColor="brand.300"
                    >
                        Amenities
                    </Heading>
                    <VStack py={["6", "8"]} align="flex-start" spacing="4">
                        <Text fontWeight={500} fontSize={[".9rem", "1rem"]}>
                            Water, Electricity, Generator, CCTV, Free Wifi
                        </Text>
                    </VStack>
                </Box>
                <Box>
                    <Heading
                        fontSize={["1.2rem", "1.7rem"]}
                        p="4"
                        bgColor="brand.300"
                    >
                        Studio rules and regulations
                    </Heading>
                    <OrderedList
                        py={["6", "8"]}
                        spacing="4"
                        fontWeight={500}
                        fontSize={[".9rem", "1rem"]}
                    >
                        <ListItem>Lorem ipsum dolor sit amet</ListItem>
                        <ListItem>Consectetur adipiscing elit</ListItem>
                        <ListItem>Integer molestie lorem at massa</ListItem>
                        <ListItem>Facilisis in pretium nisl aliquet</ListItem>
                    </OrderedList>
                </Box>
                <Box>
                    <Link href="/customer/booking-summary">
                        <Button
                            w="full"
                            h="3.5rem"
                            mb="3"
                            fontWeight={500}
                            bgColor="brand.100"
                            fontSize={["1rem", "1.3rem"]}
                            textTransform="capitalize"
                            color="white"
                            transition="0.5s linear"
                            borderRadius="4px"
                            cursor="pointer"
                            _hover={{
                                backgroundColor: "transparent",
                                color: "brand.100",
                                border: "2px solid #1570FA",
                            }}
                            _focus={{
                                outline: "none",
                            }}
                        >
                            Proceed
                        </Button>
                    </Link>
                    <Button
                        w="full"
                        h="3.5rem"
                        fontWeight={500}
                        bgColor="white"
                        fontSize={["1rem", "1.3rem"]}
                        textTransform="capitalize"
                        color="brand.100"
                        transition="0.5s linear"
                        borderRadius="4px"
                        border="2px solid #1570FA"
                        cursor="pointer"
                        _hover={{
                            backgroundColor: "brand.100",
                            color: "white",
                        }}
                        _focus={{
                            outline: "none",
                        }}
                    >
                        Save studio
                    </Button>
                </Box>
            </Box>
            <Box bgColor="brand.300" py="1px" my="10" />
            <SimpleGrid
                columns={[1, 2]}
                bgColor="brand.300"
                spacingY="9"
                pb="4rem"
                w="90%"
                mx="auto"
                pt="8"
                px="5"
            >
                <VStack align="flex-start" spacing={1}>
                    <Heading fontSize={["1.2rem", "1.6rem"]}>
                        Customer reviews
                    </Heading>
                    <Text fontWeight={500} color="GrayText">
                        20 verified rating
                    </Text>
                    <Rating />
                    <Text fontWeight={900} fontSize={["1rem", "1.2rem"]}>
                        3.9/5
                    </Text>
                </VStack>
                <VStack align="flex-start">
                    <HStack spacing="4">
                        <Text fontWeight={500} mb="0">
                            5
                        </Text>
                        <FaStar color="#FACC15" />
                        <ProgressBar />
                    </HStack>
                    <HStack spacing="4">
                        <Text fontWeight={500} mb="0">
                            4
                        </Text>
                        <FaStar color="#FACC15" />
                        <ProgressBar />
                    </HStack>
                    <HStack spacing="4">
                        <Text fontWeight={500} mb="0">
                            3
                        </Text>
                        <FaStar color="#FACC15" />
                        <ProgressBar />
                    </HStack>
                    <HStack spacing="4">
                        <Text fontWeight={500} mb="0">
                            2
                        </Text>
                        <FaStar color="#FACC15" />
                        <ProgressBar />
                    </HStack>
                    <HStack spacing="4">
                        <Text fontWeight={500} mb="0">
                            1
                        </Text>
                        <FaStar color="#FACC15" />
                        <ProgressBar />
                    </HStack>
                </VStack>
            </SimpleGrid>
            <VStack align="flex-start" w="full" py="5" pb={["10", "20"]}>
                <Comments />
                <Comments />
                <Comments />
            </VStack>
        </Box>
    );
};
