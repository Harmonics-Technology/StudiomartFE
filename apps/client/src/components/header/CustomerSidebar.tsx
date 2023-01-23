import {
    Drawer,
    DrawerBody,
    DrawerContent,
    Text,
    DrawerOverlay,
    Box,
    Flex,
    DrawerHeader,
    HStack,
    Link,
    useDisclosure,
    Collapse,
} from "@chakra-ui/react";
import React from "react";
import {
    BsFillCaretDownFill,
    BsFillCaretUpFill,
    BsFillPersonFill,
    BsFillClockFill,
    BsBorderWidth,
} from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { IoStorefront } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import NextLink from "next/link";

const NavLinks = ({
    name,
    path,
    onClick,
}: {
    name: string;
    path: string;
    onClick: any;
}) => {
    return (
        <NextLink href={path} passHref>
            <Link
                onClick={onClick}
                borderBottom="1px solid #F5F5F5"
                w="full"
                display="inline-block"
                px="7"
                py="3"
                _hover={{ bgColor: "brand.100", color: "white" }}
            >
                {name}
            </Link>
        </NextLink>
    );
};

const CustomerSidebar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isOpened, onToggle, onClose: onClosed } = useDisclosure();
    const {
        isOpen: isOpener,
        onToggle: onToggler,
        onClose: onCloser,
    } = useDisclosure();

    const handleSidebar = () => {
        onClose();
        onClosed();
        onCloser();
    };

    return (
        <>
            <Box
                onClick={onOpen}
                fontSize="1.5rem"
                cursor="pointer"
                mt={["1", "1.5"]}
            >
                <BsBorderWidth />
            </Box>
            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader px="3">
                        <HStack align="center" justify="space-between">
                            <Text mb="0" fontWeight={700}>
                                StudioMart
                            </Text>
                            <Box
                                onClick={onClose}
                                p="1"
                                cursor="pointer"
                                rounded="md"
                                bgColor="black"
                                color="white"
                            >
                                <IoMdClose />
                            </Box>
                        </HStack>
                    </DrawerHeader>
                    <DrawerBody w="full" px="0">
                        <Box>
                            <Box>
                                <Flex
                                    align="center"
                                    gap="3"
                                    onClick={() => {
                                        onCloser();
                                        onToggle();
                                    }}
                                    cursor="pointer"
                                    color={isOpened ? "white" : "black"}
                                    bgColor={isOpened ? "brand.100" : "white"}
                                    _hover={{
                                        bgColor: "brand.100",

                                        color: "white",
                                    }}
                                    borderBottom="1px solid #F5F5F5"
                                    py="3"
                                    px="7"
                                >
                                    <BsFillPersonFill fontSize="18px" />
                                    <Text mb="0" fontWeight="medium">
                                        Hi Fola
                                    </Text>
                                    {isOpened ? (
                                        <BsFillCaretUpFill fontSize="18px" />
                                    ) : (
                                        <BsFillCaretDownFill fontSize="18px" />
                                    )}
                                </Flex>
                                <Collapse in={isOpened} animateOpacity>
                                    <NavLinks
                                        name="My Profile"
                                        path="/customer/profile"
                                        onClick={handleSidebar}
                                    />
                                    <NavLinks
                                        name="Customer support"
                                        path="/customer/support"
                                        onClick={handleSidebar}
                                    />
                                </Collapse>
                            </Box>
                            <NextLink href="/customer" passHref>
                                <Flex
                                    align="center"
                                    onClick={handleSidebar}
                                    gap="3"
                                    cursor="pointer"
                                    _hover={{
                                        bgColor: "brand.100",
                                        color: "white",
                                    }}
                                    borderBottom="1px solid #F5F5F5"
                                    py="3"
                                    px="7"
                                >
                                    <FaHome fontSize="18px" />
                                    <Text mb="0" fontWeight="medium">
                                        Home
                                    </Text>
                                </Flex>
                            </NextLink>
                            <NextLink href="/customer" passHref>
                                <Flex
                                    onClick={handleSidebar}
                                    align="center"
                                    gap="3"
                                    cursor="pointer"
                                    _hover={{
                                        bgColor: "brand.100",
                                        color: "white",
                                    }}
                                    borderBottom="1px solid #F5F5F5"
                                    py="3"
                                    px="7"
                                >
                                    <BsFillClockFill fontSize="18px" />
                                    <Text mb="0" fontWeight="medium">
                                        History
                                    </Text>
                                </Flex>
                            </NextLink>
                            <Box>
                                <Flex
                                    align="center"
                                    gap="3"
                                    onClick={() => {
                                        onClosed();
                                        onToggler();
                                    }}
                                    cursor="pointer"
                                    color={isOpener ? "white" : "black"}
                                    bgColor={isOpener ? "brand.100" : "white"}
                                    _hover={{
                                        bgColor: "brand.100",

                                        color: "white",
                                    }}
                                    borderBottom="1px solid #F5F5F5"
                                    py="3"
                                    px="7"
                                >
                                    <IoStorefront fontSize="18px" />
                                    <Text mb="0" fontWeight="medium">
                                        Studios
                                    </Text>
                                    {isOpener ? (
                                        <BsFillCaretUpFill fontSize="18px" />
                                    ) : (
                                        <BsFillCaretDownFill fontSize="18px" />
                                    )}
                                </Flex>
                                <Collapse in={isOpener} animateOpacity>
                                    <NavLinks
                                        name="Music studio"
                                        path="/customer/studio-category/music-category"
                                        onClick={handleSidebar}
                                    />
                                    <NavLinks
                                        name="Photography studio"
                                        path="/customer/studio-category/photography-category"
                                        onClick={handleSidebar}
                                    />
                                    <NavLinks
                                        name="Make-up studio"
                                        path="/customer/studio-category/make-up-category"
                                        onClick={handleSidebar}
                                    />
                                </Collapse>
                            </Box>
                        </Box>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default CustomerSidebar;
