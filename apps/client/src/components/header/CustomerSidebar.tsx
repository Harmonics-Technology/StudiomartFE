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
  VStack,
  Button,
  Image,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import React from "react";
import {
  BsFillCaretDownFill,
  BsFillCaretUpFill,
  BsFillPersonFill,
  BsFillClockFill,
  BsBorderWidth,
  BsSearch,
} from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { IoStorefront } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import NextLink from "next/link";
import { UserView } from "src/services";
import Menus from "@components/utils/Menus";
import category from "../utils/category.json";

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

const CustomerSidebar = ({
  user,
  logout,
  opens,
}: {
  user: UserView;
  logout: any;
  opens: any;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box w="full">
      <Box
        onClick={onOpen}
        fontSize="1.5rem"
        cursor="pointer"
        mt={["1", "1.5"]}
      >
        <BsBorderWidth />
      </Box>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        trapFocus={false}
      >
        <DrawerOverlay />
        <DrawerContent maxW={{ base: "60%", lg: "20%" }}>
          <DrawerHeader px="3">
            <HStack
              align="center"
              justify="space-between"
              p="1rem 0rem 2rem"
              boxShadow="sm"
              borderBottom="1px solid"
              borderColor="gray.300"
            >
              <Link href="/">
                <HStack>
                  <Box w="10rem" pl=".5rem">
                    <Image src="/assets/studiomart.png" w="full" alt="logo" />
                  </Box>
                </HStack>
              </Link>
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
          <DrawerBody w="full" px="0rem">
            <VStack h="80vh" justify="space-between" align="flex-start">
              <VStack spacing={0} gap="1rem" w="full" align="flex" mt=".5rem">
                <Box
                  width="90%"
                  mx="auto"
                  mb="1rem !important"
                  display={{ base: "block", lg: "none" }}
                >
                  <InputGroup
                    alignSelf="center"
                    py={{ base: "0", lg: "1" }}
                    size="lg"
                    boxShadow="sm"
                    borderRadius="4px"
                    border="0.5px solid #E8E8E8"
                    // borderColor="brand.100"
                    pl="2"
                    onClick={opens}
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
                  </InputGroup>
                </Box>
                <Menus
                  linkName=""
                  menuTitle={`Home`}
                  icon={<FaHome opacity=".8" />}
                  option={false}
                  dropDown={[]}
                  onClose={onClose}
                />
                <Menus
                  linkName="customer"
                  menuTitle={`Hi ${user?.firstName}`}
                  icon={<BsFillPersonFill opacity=".8" />}
                  option={true}
                  dropDown={[
                    {
                      id: "my-profile",
                      name: "my profile",
                    },
                    {
                      id: "customer-support",
                      name: "customer support",
                    },
                  ]}
                  onClose={onClose}
                />

                <Menus
                  linkName="customer/history"
                  menuTitle={`History`}
                  icon={<BsFillClockFill opacity=".8" />}
                  option={false}
                  dropDown={[]}
                  onClose={onClose}
                />
                <Menus
                  linkName="category"
                  menuTitle={`Studios`}
                  icon={<IoStorefront opacity=".8" />}
                  option={true}
                  dropDown={[
                    {
                      id: category?.find(
                        (x: any) => x.name?.toLowerCase() == "music"
                      )?.id,
                      name: "music studio",
                    },
                    {
                      id: category?.find(
                        (x: any) => x.name?.toLowerCase() == "photo"
                      )?.id,
                      name: "photography studio",
                    },
                    {
                      id: category?.find(
                        (x: any) => x.name?.toLowerCase() == "makeup"
                      )?.id,
                      name: "makeup studio",
                    },
                    {
                      id: category?.find(
                        (x: any) => x.name?.toLowerCase() == "hair"
                      )?.id,
                      name: "hair studio",
                    },
                    {
                      id: category?.find(
                        (x: any) => x.name?.toLowerCase() == "video"
                      )?.id,
                      name: "video studio",
                    },
                  ]}
                  onClose={onClose}
                />
                <Button
                  h="3rem"
                  w="80%"
                  px="2rem"
                  mx="auto !important"
                  bg="brand.100"
                  color="white"
                  variant="outline"
                  display={{ base: "flex", lg: "none" }}
                  onClick={() => logout(["customerToken", "customer"])}
                >
                  Logout
                </Button>
              </VStack>
              <Link href="/become-a-vendor" pl="2rem" textDecor="none">
                <Text color="brand.100" fontWeight="600" mb="0">
                  Become a vendor
                </Text>
              </Link>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default CustomerSidebar;
