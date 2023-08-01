import {
  Box, Button, Drawer,
  DrawerBody,
  DrawerContent, DrawerHeader, DrawerOverlay, HStack, Image, Link, Text, useDisclosure,
  VStack
} from "@chakra-ui/react";
import Menus from "@components/utils/Menus";
import {
  BsBorderWidth, BsFillChatRightTextFill, BsFillClockFill, BsFillPersonFill
} from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { IoStorefront } from "react-icons/io5";
import { ServiceView, UserView } from "src/services";
// import category from "../utils/category.json";
import { GlobalSearch } from "ui";

const CustomerSidebar = ({
  user,
  logout,
  category,
}: {
  user: UserView;
  logout: any;
  category: ServiceView[];
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
        <DrawerContent maxW={{ base: "70%", lg: "20%" }}>
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
                    <Image src="/assets/StudioMart.png" w="full" alt="logo" />
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
                  <GlobalSearch />
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
                      id: "javascript:;",
                      name: "customer support",
                    },
                  ]}
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

                <Menus
                  linkName="customer/history"
                  menuTitle={`History`}
                  icon={<BsFillClockFill opacity=".8" />}
                  option={false}
                  dropDown={[]}
                  onClose={onClose}
                />
                <Menus
                  linkName="customer/message"
                  menuTitle={`Messages`}
                  icon={<BsFillChatRightTextFill opacity=".8" />}
                  option={false}
                  dropDown={[]}
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
