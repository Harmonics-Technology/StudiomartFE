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
  Image,
} from "@chakra-ui/react";
import React from "react";
import {
  BsFillCaretDownFill,
  BsFillCaretUpFill,
  BsFillPersonFill,
  BsFillClockFill,
  BsBorderWidth,
} from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { IoStorefront } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import NextLink from "next/link";
import { UserView } from "src/services";
import Menus from "@components/utils/Menus";

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

const CustomerSidebar = ({ user }: { user: UserView }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpened, onToggle, onClose: onClosed } = useDisclosure();
  const {
    isOpen: isOpener,
    onToggle: onToggler,
    onClose: onCloser,
  } = useDisclosure();

  const handleSidebar = () => {
    onClose();
    onClosed();
    onCloser();
  };

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
        <DrawerContent maxW="20%">
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
                <Menus
                  linkName="/customer"
                  menuTitle={`Hi ${user?.firstName}`}
                  icon={<BsFillPersonFill opacity=".8" />}
                  option={true}
                  dropDown={["my profile", "customer support"]}
                />
                <Menus
                  linkName="/"
                  menuTitle={`Home`}
                  icon={<FaHome opacity=".8" />}
                  option={false}
                  dropDown={[]}
                />
                <Menus
                  linkName="/customer/history"
                  menuTitle={`History`}
                  icon={<BsFillClockFill opacity=".8" />}
                  option={false}
                  dropDown={[]}
                />
                <Menus
                  linkName="/studios"
                  menuTitle={`Studios`}
                  icon={<IoStorefront opacity=".8" />}
                  option={true}
                  dropDown={[
                    "music studio",
                    "photography studio",
                    "makeup studio",
                    "hair studio",
                    "video studio",
                  ]}
                />
              </VStack>
              <Link href="/become-a-vendor" pl="2rem">
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
