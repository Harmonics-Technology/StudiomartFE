import { Box, VStack } from "@chakra-ui/react";

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
      </VStack>
    </Box>
  );
};

export default AccountSideBar;
