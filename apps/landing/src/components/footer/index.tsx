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
    <Box bg="#171717" h="100px">
      <Flex justify="space-between" h="full" align="center" w="85%" mx="auto">
        <Box>
          <Box w="13rem" pl=".5rem" cursor="pointer">
            <Image src="/assets/logowhite.png" w="full" alt="logo" />
          </Box>
        </Box>
        <HStack spacing={["4", "2"]} color="rgba(249, 249, 249, 0.72)">
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
        <Box>
          <Text fontSize="14px" color="rgba(249, 249, 249, 0.72)" mb="0">
            &copy; StudioMart 2022. All Rights Reserved.
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};
