import React, { useState } from "react";
import {
  Link,
  Flex,
  Heading,
  Stack,
  Box,
  Button,
  Image,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Harmburger, getUrlRoute } from "ui";
import { WaitBtn } from "@components/homeandcategory/Component/WaitBtn";

type NavProps = {
  name: string;
  path: string;
  display?: any;
};

// console.log(getUrlRoute().clientUrl);

const NavLink = ({ name, path, display }: NavProps) => {
  console.log({ path });
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

export const Header = ({ onOpen }: any) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  return (
    <Flex bgColor="white" w="full" py="5" pos="sticky" top="0" zIndex={900}>
      <Flex align="center" justify="space-between" w="85%" mx="auto">
        <NextLink href="/">
          <Box w="20%">
            <Image src="/assets/studiomart.png" w="full" alt="logo" />
          </Box>
        </NextLink>

        <Box w="190px">
          <WaitBtn onOpen={onOpen} />
        </Box>
      </Flex>
    </Flex>
  );
};
