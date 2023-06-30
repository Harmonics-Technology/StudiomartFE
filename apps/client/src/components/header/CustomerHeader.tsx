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
  Circle,
} from "@chakra-ui/react";
import { UserContext } from "@components/Context/UserContext";
import { SearchBox } from "@components/Home/SearchBox";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { BsBell, BsBookmarkHeart, BsSearch } from "react-icons/bs";
import { IoIosNotifications, IoIosBookmark } from "react-icons/io";
import CustomerSidebar from "./CustomerSidebar";

const CustomerHeader = () => {
  const router = useRouter();
  const { user, logout } = useContext(UserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      // console.log("yeah");
      if (event.ctrlKey && event.key === "q") {
        onOpen();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onOpen]);
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
        <HStack align="center" spacing={["5", "10"]} justify="space-between">
          <CustomerSidebar user={user} logout={logout} opens={onOpen} />
          <Link href="/" passHref>
            <HStack>
              <Box
                w={{ base: "11rem", lg: "13rem" }}
                pl=".5rem"
                cursor="pointer"
              >
                <Image src="/assets/studiomart.png" w="full" alt="logo" />
              </Box>
            </HStack>
          </Link>
        </HStack>
        <Box width={["50%"]} display={{ base: "none", lg: "block" }}>
          <InputGroup
            alignSelf="center"
            py={{ base: "0", lg: "1" }}
            size="lg"
            boxShadow="sm"
            borderRadius="4px"
            border="0.5px solid #E8E8E8"
            // borderColor="brand.100"
            pl="2"
            onClick={onOpen}
          >
            <InputLeftElement pointerEvents="none" h="full">
              <Icon as={BsSearch} color="#AFAFAF" />
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
              <Text mb="0" fontWeight="500" fontSize=".9rem" color="gray.500">
                Ctrl + Q
              </Text>
            </InputRightElement>
          </InputGroup>
        </Box>
        <HStack
          align="center"
          spacing={["5", "5"]}
          justifySelf="flex-end"
          // display="none"
        >
          <Link href="/customer/saved-studios" passHref>
            <a>
              <Circle size="50px" bgColor="rgba(21, 112, 250, 0.05)">
                <Icon
                  as={BsBookmarkHeart}
                  fontSize="1rem"
                  cursor="pointer"
                  color={
                    router.asPath === "/customer/saved-studios"
                      ? "#1570FA"
                      : "black"
                  }
                />
              </Circle>
            </a>
          </Link>
          <Link href="/customer/notification" passHref>
            <a>
              <Circle size="50px" bgColor="rgba(21, 112, 250, 0.05)">
                <Icon
                  as={BsBell}
                  fontSize="1rem"
                  cursor="pointer"
                  color={
                    router.asPath === "/customer/notifications"
                      ? "#1570FA"
                      : "black"
                  }
                />
              </Circle>
            </a>
          </Link>
          <Button
            h="2.6rem"
            w="full"
            px="2rem"
            // bg="brand.100"
            borderRadius="4px"
            color="brand.100"
            borderColor="brand.100"
            variant="outline"
            display={{ base: "none", lg: "flex" }}
            onClick={() => logout(["customerToken", "customer"])}
          >
            Log out
          </Button>
        </HStack>
      </Flex>
      <SearchBox isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default CustomerHeader;
