import { Box, Stack } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import AccountSideBar from "./AccountSideBar";

const AccountContainer = ({ children }: { children: ReactNode }) => {
  return (
    <Stack
      direction={{ base: "column", lg: "row" }}
      spacing={0}
      gap="2rem"
      width="90%"
      ml={{ base: "1rem", lg: "5rem" }}
      py="5rem"
    >
      <AccountSideBar />
      <Box w={{ base: "full", lg: "45%" }} fontFamily='"DM Sans", sans-serif'>
        {children}
      </Box>
    </Stack>
  );
};

export default AccountContainer;
