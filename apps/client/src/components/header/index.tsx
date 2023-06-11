import React, { useState } from "react";
import {
  Link,
  Flex,
  Image,
  Stack,
  Box,
  Button,
  HStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Harmburger } from "ui";

type NavProps = {
  name: string;
  path: string;
  display?: any;
};

const NavLink = ({ name, path, display }: NavProps) => {
  const router = useRouter();
  return (
    <NextLink href={path} passHref>
      <Link
        display={display}
        color={router.asPath === path ? "brand.100" : "black"}
        fontWeight="500"
        cursor="pointer"
        fontSize={{ base: ".9rem", lg: ".9rem" }}
        _hover={{ color: "brand.100" }}
      >
        {name}
      </Link>
    </NextLink>
  );
};

export const Header = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  return (
    <Flex bgColor="white" w="full" py="5" pos="sticky" top="0" zIndex={900}>
      <Flex align="center" justify="space-between" w="90%" mx="auto">
        <NextLink href="/">
          <HStack>
            <Box w="13rem" pl=".5rem" cursor="pointer">
              <Image src="/assets/studiomart.png" w="full" alt="logo" />
            </Box>
          </HStack>
        </NextLink>
        <Stack
          // display={{ base: 'none', md: 'flex' }}
          pos={["fixed", "unset"]}
          h={["100vh", "unset"]}
          transition={["all .5s ease", "unset"]}
          bg={["white", "unset"]}
          w={["100%", "auto"]}
          left={isOpened ? "0" : "-100%"}
          top="0"
          align={["center"]}
          justify={["center", "unset"]}
          p={["10", "unset"]}
          zIndex={5}
          direction={["column", "row"]}
          spacing={{ base: "5", md: "4", lg: "6", xl: "14" }}
        >
          <NavLink path="/" name="Home" />
          <NavLink path="/studio" name="Studios" />
          <NavLink path="/about" name="About" />
          <NavLink path="/#how-it-works" name="How It Works" />
          <NavLink path="/become-a-vendor" name="Become a Vendor" />
          <NavLink path="/login" display={["block", "none"]} name="Login" />
          <NextLink href="/register" passHref>
            <Button
              display={["block", "none"]}
              bgColor="brand.100"
              fontSize={{ base: ".9rem", lg: ".9rem" }}
              color="white"
              px={["8", "4", "4", "8"]}
            >
              Sign Up
            </Button>
          </NextLink>
        </Stack>
        <Stack
          display={["none", "flex"]}
          direction={["column", "row"]}
          align={["center"]}
          spacing={{ base: "5", md: "4", lg: "6", xl: "14" }}
        >
          <NavLink path="/login" name="Login" />
          <NextLink href="/register">
            <Button
              bgColor="brand.100"
              fontSize={{ base: ".9rem", lg: ".9rem" }}
              color="white"
              px={["8", "4", "4", "8"]}
            >
              Sign Up
            </Button>
          </NextLink>
        </Stack>
        <Box
          display={["block", "none"]}
          zIndex={10}
          onClick={() => setIsOpened((prev) => !prev)}
        >
          <Harmburger isOpened={isOpened} />
        </Box>
      </Flex>
    </Flex>
  );
};
