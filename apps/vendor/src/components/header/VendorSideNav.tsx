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
import React, { useContext } from "react";
import { RxDashboard } from "react-icons/rx";
import { MdMiscellaneousServices } from "react-icons/md";
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
          <Box w="85%" pl=".5rem">
            <Image src="/assets/studiomart.png" w="full" alt="logo" />
          </Box>
        </HStack>
      </Link>
      <VStack align="flex-start" spacing={0} gap="1.5rem" mt="4rem" pr="2rem">
        <MenuItem
          menuTitle="dashboard"
          icon={<RxDashboard cursor="default" />}
        />
        <MenuItem
          menuTitle="services"
          icon={<MdMiscellaneousServices cursor="default" />}
        />
        <MenuItem
          menuTitle="wallets"
          icon={<BsWalletFill cursor="default" />}
        />
        <MenuItem menuTitle="bookings" icon={<FaBook cursor="default" />} />
        <MenuItem
          menuTitle="message"
          icon={<BiMessageDots cursor="default" />}
        />
        <MenuItem
          menuTitle="account"
          icon={<BsPersonFill cursor="default" />}
        />
      </VStack>
      <Box pos="absolute" bottom="13%" color="red">
        <Flex
          overflow="hidden"
          cursor="pointer"
          // p=".2rem 2rem"
          w="full"
          borderRadius="4px"
          h="3rem"
          color={"red"}
          onClick={logout}
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
            >
              Logout
            </Text>
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
}

export default VendorSideNav;
