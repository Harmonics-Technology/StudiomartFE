import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { RxDashboard } from "react-icons/rx";
import {MdMiscellaneousServices } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { FaBook} from "react-icons/fa";
import { BiMessageDots } from "react-icons/bi";
import { BsPersonFill, BsWalletFill } from "react-icons/bs";
import MenuItem from "src/utils/MenuItem";

function VendorSideNav() {
    return (
        <Box
            bgColor="#FFFFFF"
            h="100vh"
            w="16%"
            pos="fixed"
            pl="1.5rem"
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
                        ml="-6"
                    >
                        StudioMart
                    </Text>
                </HStack>
            </Link>
            <VStack align="left" gap="1.5rem"  ml="-10"  >
                <MenuItem menuTitle="dashboard"  icon={<RxDashboard  cursor="default"/>} />
                <MenuItem menuTitle="services" icon={<MdMiscellaneousServices cursor="default" />} />
                <MenuItem menuTitle="wallets" icon={<BsWalletFill cursor="default" />} />
                <MenuItem menuTitle="bookings" icon={<FaBook cursor="default" />} />
                <MenuItem menuTitle="message" icon={<BiMessageDots cursor="default" />} />
                <MenuItem menuTitle="account" icon={<BsPersonFill cursor="default" />} />
            </VStack>
            <Box pos="absolute" bottom="13%" color="red !important" ml="-10">
                <MenuItem menuTitle="logout" icon={<FiLogOut cursor="default" />} />
            </Box>
        </Box>
    );
}

export default VendorSideNav;
