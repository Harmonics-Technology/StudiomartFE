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
import Link from "next/link";
import React from "react";
import { FaHome } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { FaBook } from "react-icons/fa";
import { BiMessageDots } from "react-icons/bi";
import { BsPersonFill, BsWalletFill } from "react-icons/bs";
import { MenuItem } from "ui";
import { UserContext } from "@components/Context/UserContext";

function VendorSideNav() {
  const { logout } = useContext(UserContext);
  return (
    <Box
      bgColor="#FFFFFF"
      h="100vh"
      w="18%"
      pos="fixed"
      pl="2rem"
      pt="2rem"
      boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
    >
      <Link href="/" passHref>
        <HStack>
          {/* <Box h="2rem">
                        <Image src="/assets/logo.png" h="full" />
                    </Box> */}
                    <Text
                        fontSize="2rem"
                        fontWeight="bold"
                        color="brand.100"
                        pl=".7rem"
                    >
                        StudioMart
                    </Text>
                </HStack>
            </Link>
            <VStack align="left" gap="1.5rem" pr="1.5rem">
                <MenuItem menuTitle="dashboard" icon={<FaHome />} />
                <MenuItem menuTitle="services" icon={<FaHome />} />
                <MenuItem menuTitle="wallets" icon={<FaHome />} />
                <MenuItem menuTitle="bookings" icon={<FaHome />} />
                <MenuItem menuTitle="message" icon={<FaHome />} />
                <MenuItem menuTitle="account" icon={<FaHome />} />
            </VStack>
            <Box pos="absolute" bottom="13%" color="red !important">
                <MenuItem menuTitle="logout" icon={<FiLogOut />} />
            </Box>
        </Box>
    );
}

export default VendorSideNav;
