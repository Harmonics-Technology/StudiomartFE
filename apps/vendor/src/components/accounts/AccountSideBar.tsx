import { Box, Link, VStack } from "@chakra-ui/react";

import React from "react";
import { SideText } from "ui";

const AccountSideBar = () => {
  return (
    <Box w={{ base: "full", lg: "30%" }}>
      <VStack
        align="flex-start"
        spacing={0}
        gap="2rem"
        fontFamily='"DM Sans", sans-serif'
        flexDirection={{ base: "row", lg: "column" }}
        overflow="auto"
      >
        <SideText data="basic-information" />
        <SideText data="studio-kyc-information" />
        <SideText data="studio-bank-details" />
        <SideText data="2fa-update-security-question" />
        <SideText data="notifications" />
        <SideText data="password-setting" />
        {/* <Link href="/account/basic-information">Basic Information </Link>
        <Link href="/account/kyc-information"> KYC Information</Link>
        <Link href="/account/bank-details">Bank Details</Link>
        <Link href="/account/update-security-question">
          {" "}
          2FA: Update Security Question
        </Link>
        <Link href="/account/notifications"> Notification</Link>
        <Link href="/account/password-setting"> Password setting</Link> */}
      </VStack>
    </Box>
  );
};

export default AccountSideBar;
