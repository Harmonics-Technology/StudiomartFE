import React, { useState } from 'react';
import { Link, Flex, Heading, Stack, Box, Button } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import Harmburger from 'src/utils/Harmburger';

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
<<<<<<< HEAD
        color={router.asPath === path ? "brand.100" : "black"}
        fontWeight="500"
        cursor="pointer"
        fontSize={{ base: ".9rem", lg: ".9rem" }}
        _hover={{ color: "brand.100" }}
=======
        color={router.asPath === path ? 'brand.100' : 'black'}
        fontWeight="500"
        cursor="pointer"
        fontSize={{ base: '.9rem', lg: '.9rem' }}
        _hover={{ color: 'brand.100' }}
>>>>>>> b037c3a (worked on the ui)
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
          <Heading
            zIndex={10}
<<<<<<< HEAD
            textAlign={"center"}
            cursor="pointer"
            fontSize={{ base: "1.4rem", lg: "2rem" }}
=======
            textAlign={'center'}
            cursor="pointer"
            fontSize={{ base: '1.4rem', lg: '2rem' }}
>>>>>>> b037c3a (worked on the ui)
          >
            StudioMart
          </Heading>
        </NextLink>
        <Stack
<<<<<<< HEAD
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
=======
          pos={['fixed', 'unset']}
          h={['100vh', 'unset']}
          transition={['all .5s ease', 'unset']}
          bg={['white', 'unset']}
          w={['100%', 'auto']}
          left={isOpened ? '0' : '-100%'}
          top="0"
          align={['center']}
          justify={['center', 'unset']}
          p={['10', 'unset']}
          zIndex={5}
          direction={['column', 'row']}
          spacing={{ base: '5', md: '4', lg: '6', xl: '14' }}
>>>>>>> b037c3a (worked on the ui)
        >
          <NavLink path="/" name="Home" />
          <NavLink path="/studio" name="Studios" />
          <NavLink path="/about" name="About" />
          <NavLink path="/#how-it-works" name="How It Works" />
          <NavLink path="/become-a-vendor" name="Become a Vendor" />
<<<<<<< HEAD
          <NavLink path="/login" display={["block", "none"]} name="Login" />
          <NextLink href="/register" passHref>
            <Button
              display={["block", "none"]}
              bgColor="brand.100"
              fontSize={{ base: ".9rem", lg: ".9rem" }}
              color="white"
              px={["8", "4", "4", "8"]}
=======
          <NavLink path="/login" display={['block', 'none']} name="Login" />
          <NextLink href="/register" passHref>
            <Button
              display={['block', 'none']}
              bgColor="brand.100"
              fontSize={{ base: '.9rem', lg: '.9rem' }}
              color="white"
              px={['8', '4', '4', '8']}
>>>>>>> b037c3a (worked on the ui)
            >
              Sign Up
            </Button>
          </NextLink>
        </Stack>
        <Stack
<<<<<<< HEAD
          display={["none", "flex"]}
          direction={["column", "row"]}
          align={["center"]}
          spacing={{ base: "5", md: "4", lg: "6", xl: "14" }}
=======
          display={['none', 'flex']}
          direction={['column', 'row']}
          align={['center']}
          spacing={{ base: '5', md: '4', lg: '6', xl: '14' }}
>>>>>>> b037c3a (worked on the ui)
        >
          <NavLink path="/login" name="Login" />
          <NextLink href="/register">
            <Button
              bgColor="brand.100"
<<<<<<< HEAD
              fontSize={{ base: ".9rem", lg: ".9rem" }}
              color="white"
              px={["8", "4", "4", "8"]}
=======
              fontSize={{ base: '.9rem', lg: '.9rem' }}
              color="white"
              px={['8', '4', '4', '8']}
>>>>>>> b037c3a (worked on the ui)
            >
              Sign Up
            </Button>
          </NextLink>
        </Stack>
        <Box
<<<<<<< HEAD
          display={["block", "none"]}
=======
          display={['block', 'none']}
>>>>>>> b037c3a (worked on the ui)
          zIndex={10}
          onClick={() => setIsOpened((prev) => !prev)}
        >
          <Harmburger isOpened={isOpened} />
        </Box>
      </Flex>
    </Flex>
  );
};
