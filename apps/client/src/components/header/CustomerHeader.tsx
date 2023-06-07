import {
  Button,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  Flex,
  Box,
  Image,
  useDisclosure,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { UserContext } from "@components/Context/UserContext";
import { SearchBox } from "@components/Home/SearchBox";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { IoIosNotifications, IoIosBookmark } from "react-icons/io";
import CustomerSidebar from "./CustomerSidebar";

const CustomerHeader = () => {
  const router = useRouter();
  const { user, logout } = useContext(UserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      console.log("yeah");
      if (event.ctrlKey && event.key === "q") {
        onOpen();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <>
      <Flex
        w="90%"
        mx="auto"
        py={["5", "1rem"]}
        gap={{ base: 10, lg: 24 }}
        align="center"
        justify="space-between"
      >
        <HStack align="center" spacing={["7", "10"]} justify="space-between">
          <CustomerSidebar user={user} />
          <Link href="/" passHref>
            <HStack>
              <Box w="13rem" pl=".5rem" cursor="pointer">
                <Image src="/assets/studiomart.png" w="full" alt="logo" />
              </Box>
            </HStack>
          </Link>
        </HStack>
        <Box width={["50%"]}>
          <InputGroup
            display={["none", "block"]}
            alignSelf="center"
            py={{ base: "0", lg: "1" }}
            size="lg"
            boxShadow="sm"
            borderRadius="4px"
            border="2px solid"
            borderColor="brand.100"
            pl="2"
            onClick={onOpen}
          >
            <InputLeftElement pointerEvents="none" h="full">
              <Icon as={BsSearch} color="brand.100" />
            </InputLeftElement>
            <Input
              type="text"
              border="none"
              _focusVisible={{ outline: "none" }}
              _placeholder={{ fontSize: "1rem" }}
              placeholder="Search studio by name, category"
              overflow="hidden"
              pointerEvents="none"
            />
            <InputRightElement w={{ base: "90px", lg: "120px" }} h="full">
              {/* <Button h="full" w="full" bg="brand.100" color="white" size="sm">
              Search
            </Button> */}
              <Text mb="0" fontWeight="500" fontSize=".9rem">
                Ctrl + Q
              </Text>
            </InputRightElement>
          </InputGroup>
        </Box>
        <HStack align="center" spacing={["5", "7"]} justifySelf="flex-end">
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
          <Link href="/customer/notification" passHref>
            <a>
              <Icon
                as={IoIosNotifications}
                fontSize="1.5rem"
                cursor="pointer"
              />
            </a>
          </Link>
          <Button
            h="3rem"
            w="full"
            px="3rem"
            bg="brand.100"
            color="white"
            onClick={() => logout(["customerToken", "customer"])}
          >
            Logout
          </Button>
        </HStack>
      </Flex>
      <SearchBox isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default CustomerHeader;
