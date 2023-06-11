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
import { AiFillMail } from "react-icons/ai";
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
    <Box bg="#171717" h={["full", "100px"]} py={["2rem", "0"]}>
      <Flex
        justify="space-between"
        h="full"
        align="center"
        w="85%"
        mx="auto"
        flexDir={["column", "row"]}
        gap={["1rem", "0"]}
      >
        <Box>
          <Box w="13rem" pl=".5rem" cursor="pointer">
            <Image src="/assets/logowhite.png" w="full" alt="logo" />
          </Box>
        </Box>
        <HStack spacing={["4", "2"]} color="rgba(249, 249, 249, 0.72)">
          <Link href="https://instagram.com/studiomart.io" target="_blank">
            <FaInstagram />
          </Link>
          <Link href="https://twitter.com/studiomart_io" target="_blank">
            <FaTwitter />
          </Link>
          <Link href="https://linkedin.com/studiomart_io" target="_blank">
            <FaLinkedinIn />
          </Link>
          <Link href="mailto:hello@studiomart.io" target="_blank">
            <AiFillMail />
          </Link>
        </HStack>
        <Box>
          <Text
            fontSize="14px"
            color="rgba(249, 249, 249, 0.72)"
            mb="0"
            textAlign="center"
          >
            &copy; StudioMart 2022. All Rights Reserved.
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};
