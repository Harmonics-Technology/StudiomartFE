import {
    Link,
    Box,
    VStack,
    Heading,
    Image,
    Text,
    Stack,
    Divider,
    Flex,
    HStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
} from "react-icons/fa";

type Props = {
    name: string;
    path: string;
};

const NavLink = ({ name, path }: Props) => {
    return (
        <NextLink href={path} passHref>
            <Link
                fontSize={["14px", "16px"]}
                color="whiteAlpha.700"
                cursor="pointer"
                _hover={{ color: "white" }}
            >
                {name}
            </Link>
        </NextLink>
    );
};

export const Footer: React.FC = () => {
    return (
        <Box bg="black" pt={[10, 16]} pb={["10", "5"]}>
            <Box w="85%" mx="auto">
                <Stack
                    direction={["column", "row"]}
                    justify="space-between"
                    align="start"
                    flexWrap="wrap"
                    mb={["16", "10"]}
                    spacing={["8", "unset"]}
                >
                    <VStack align="flex-start">
                        <Heading fontSize={["1.4rem", "2rem"]} color="white">
                            StudioMart
                        </Heading>
                        <VStack spacing="4" pt={["8", "3"]} align="flex-start">
                            <NavLink path="/" name="Rent a studio" />
                            <NavLink path="/" name="Add a studio" />
                            <Box pt="8">
                                <Image
                                    w={["130px", "170px"]}
                                    src="/assets/googlePlay.png"
                                    alt="Download on Google Play"
                                />
                            </Box>
                        </VStack>
                    </VStack>
                    <VStack align="flex-start">
                        <Text
                            color="whiteAlpha.900"
                            fontSize={["1rem", "1.3rem"]}
                            fontWeight="500"
                        >
                            Studio Category
                        </Text>
                        <VStack spacing="5" align="flex-start">
                            <NavLink path="/" name="Music Studio" />
                            <NavLink path="/" name="Photo Studio" />
                            <NavLink path="/" name="Make Up Studio" />
                            <NavLink path="/" name="Art Studio" />
                            <NavLink path="/" name="Podcast Studio" />
                        </VStack>
                    </VStack>
                    <VStack align="flex-start">
                        <Text
                            color="whiteAlpha.900"
                            fontSize={["1rem", "1.3rem"]}
                            fontWeight="500"
                        >
                            Company
                        </Text>
                        <VStack spacing="5" align="flex-start">
                            <NavLink path="/" name="About Us" />
                            <NavLink path="/" name="Contact" />
                        </VStack>
                    </VStack>
                    <VStack align="flex-start">
                        <Text
                            color="whiteAlpha.900"
                            fontSize={["1rem", "1.3rem"]}
                            fontWeight="500"
                        >
                            Support
                        </Text>
                        <VStack spacing="5" align="flex-start">
                            <NavLink path="/" name="Studio Fee" />
                            <NavLink path="/" name="Terms & Conditions" />
                            <NavLink path="/" name="Privacy" />
                        </VStack>
                    </VStack>
                </Stack>
                <Divider />
                <Flex
                    mt="8"
                    gap={["8", "unset"]}
                    color="whiteAlpha.700"
                    justifyContent="space-between"
                    flexDir={["column-reverse", "row"]}
                >
                    <Text fontSize={["14px", "16px"]}>
                        &copy; StudioMart 2022. All Rights Reserved.
                    </Text>
                    <HStack spacing={["4", "2"]}>
                        <Link href="/">
                            <FaInstagram />
                        </Link>
                        <Link href="/">
                            <FaTwitter />
                        </Link>
                        <Link href="/">
                            <FaLinkedinIn />
                        </Link>
                        <Link href="/">
                            <FaFacebookF />
                        </Link>
                    </HStack>
                </Flex>
            </Box>
        </Box>
    );
};
