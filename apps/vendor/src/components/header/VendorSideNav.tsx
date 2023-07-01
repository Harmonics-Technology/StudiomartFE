import {
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  Square,
  Text,
  VStack,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import Link from "next/link";
import React, { useContext } from "react";
import { RxDashboard } from "react-icons/rx";
import { MdMiscellaneousServices } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { FaBook, FaHome } from "react-icons/fa";
import { BiMessageDots } from "react-icons/bi";
import { BsPersonFill, BsWalletFill } from "react-icons/bs";
import { RiRemoteControlFill } from "react-icons/ri";
import { MenuItem } from "ui";
import { UserContext } from "@components/Context/UserContext";

type Side = {
  setShowSide: any;
  showSide: boolean;
};
function VendorSideNav({ setShowSide, showSide }: Side) {
  const { logout } = useContext(UserContext);
  const closeSide = () => {
    setShowSide((prev: any) => !prev);
  };
  return (
    <VStack
      bgColor="#FFFFFF"
      h="100vh"
      w={{
        base: showSide ? "60%" : "0",
        md: showSide ? "30%" : "0",
        lg: "18%",
      }}
      pos="fixed"
      pl={{ base: showSide ? "2rem" : "0", lg: "2rem" }}
      pt="2rem"
      zIndex="1"
      align="flex-start"
      boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
      transition="all .2s ease-in"
    >
      <Flex
        justify="end"
        mb="1rem"
        w="90%"
        display={{ base: "flex", lg: "none" }}
      >
        <CloseIcon
          my="auto"
          onClick={() => setShowSide((prev: any) => !prev)}
        />
      </Flex>
      <Link href="/dashboard" passHref>
        <HStack>
          <Box w="85%" pl={{ base: ".2rem", md: ".5rem" }} gap={1}>
            <Image src="/assets/StudioMart.png" w="full" alt="logo" />{" "}
          </Box>
        </HStack>
      </Link>
      <VStack align="flex-start" justify="space-between" minH="75vh" w="full">
        <VStack
          align="flex-start"
          spacing={0}
          gap="1.5rem"
          mt="4rem"
          pr={{ base: showSide ? "2rem" : "0", lg: "2rem" }}
          w="full"
        >
          <MenuItem
            menuTitle="dashboard"
            icon={<RxDashboard cursor="default" />}
            close={closeSide}
          />
          <MenuItem
            menuTitle="services"
            icon={<FaHome cursor="default" />}
            close={closeSide}
          />
          <MenuItem
            menuTitle="wallets"
            icon={<BsWalletFill cursor="default" />}
            close={closeSide}
          />
          <MenuItem
            menuTitle="bookings"
            icon={<FaBook cursor="default" />}
            close={closeSide}
          />
          <MenuItem
            menuTitle="message"
            icon={<BiMessageDots cursor="default" />}
            close={closeSide}
          />
          <MenuItem
            menuTitle="studio/profile"
            icon={<RiRemoteControlFill cursor="default" />}
            close={closeSide}
          />
        </VStack>
        <Box w="100%">
          <Flex
            overflow="hidden"
            cursor="pointer"
            // p=".2rem 2rem"
            w="full"
            borderRadius="4px"
            h="3rem"
            color={"red"}
            onClick={() =>
              logout([
                "vendorToken",
                "vendor",
                "currentStudioId",
                "vendorStudios",
                "user",
              ])
            }
          >
            <HStack pl=".5rem">
              <Square bgColor="transparent" size="2rem" fontSize="1rem">
                <FiLogOut />
              </Square>
              <Text
                fontWeight="600"
                fontSize="1rem"
                pl=".5rem"
                textTransform="capitalize"
                mb="0"
              >
                Logout
              </Text>
            </HStack>
          </Flex>
        </Box>
      </VStack>
    </VStack>
  );
}

export default VendorSideNav;
