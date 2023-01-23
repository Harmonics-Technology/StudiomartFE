import { Flex, Icon } from "@chakra-ui/react";
import {
    Button,
    Heading,
    HStack,
    Input,
    InputGroup,
    InputRightElement,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { IoIosNotifications, IoIosBookmark } from "react-icons/io";
import CustomerSidebar from "./CustomerSidebar";

const CustomerHeader = () => {
    const router = useRouter();
    return (
        <>
            <Flex
                w="90%"
                mx="auto"
                py={["5", "2"]}
                gap={{ base: 10, lg: 24 }}
                align="center"
                justify="space-between"
            >
                <HStack
                    align="center"
                    spacing={["7", "10"]}
                    justify="space-between"
                >
                    <CustomerSidebar />
                    <Link href="/customer" passHref>
                        <Heading
                            fontWeight="700"
                            cursor="pointer"
                            fontSize={{ base: "1.4rem", lg: "1.8rem" }}
                        >
                            StudioMart
                        </Heading>
                    </Link>
                </HStack>
                <InputGroup
                    display={["none", "block"]}
                    alignSelf="center"
                    py={{ base: "0", lg: "1" }}
                    size="lg"
                    boxShadow="0px 4px 4px rgba(0, 0, 0, 0.2)"
                    borderRadius="4px"
                    pl="2"
                >
                    <Input
                        type="text"
                        border="none"
                        _focus={{ outline: "none" }}
                        _placeholder={{ fontSize: "1rem" }}
                        placeholder="Search studio by name, category"
                        overflow="hidden"
                    />
                    <InputRightElement
                        w={{ base: "90px", lg: "120px" }}
                        h="full"
                    >
                        <Button
                            h="full"
                            w="full"
                            bg="brand.100"
                            color="white"
                            size="sm"
                        >
                            Search
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <HStack
                    align="center"
                    spacing={["5", "7"]}
                    justifySelf="flex-end"
                >
                    <Link href="/customer/saved-studios" passHref>
                        <a>
                            <Icon
                                as={IoIosBookmark}
                                fontSize="1.5rem"
                                cursor="pointer"
                                color={
                                    router.asPath === "/customer/saved-studios"
                                        ? "#1570FA"
                                        : "black"
                                }
                            />
                        </a>
                    </Link>
                    <Link href="/" passHref>
                        <a>
                            <Icon
                                as={IoIosNotifications}
                                fontSize="1.5rem"
                                cursor="pointer"
                            />
                        </a>
                    </Link>
                </HStack>
            </Flex>
        </>
    );
};

export default CustomerHeader;
