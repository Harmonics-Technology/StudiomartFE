import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { FaHome } from "react-icons/fa";
import { BsFillGridFill } from "react-icons/bs";
import { BsArchiveFill } from "react-icons/bs";
import { FaWallet } from "react-icons/fa";
import { BsCardHeading } from "react-icons/bs";
import { BsFillChatSquareTextFill } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";

import { FiLogOut } from "react-icons/fi";
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
                    >
                        StudioMart
                    </Text>
                </HStack>
            </Link>
            <VStack align="left" gap="1.5rem" pr="1.5rem">
                <MenuItem menuTitle="dashboard" icon={<BsFillGridFill />} />
                <MenuItem menuTitle="services" icon={<BsArchiveFill />} />
                <MenuItem menuTitle="wallets" icon={<FaWallet />} />
                <MenuItem menuTitle="bookings" icon={<BsCardHeading />} />
                <MenuItem menuTitle="message" icon={<BsFillChatSquareTextFill />} />
                <MenuItem menuTitle="account" icon={<BsFillPersonFill />} />
            </VStack>
            <Box pos="absolute" bottom="10%" color="red !important">
                <MenuItem menuTitle="logout" icon={<FiLogOut />} />
            </Box>
        </Box>
    );
}

export default VendorSideNav;
