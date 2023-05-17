import { Box, Flex } from "@chakra-ui/react";
import VendorHeader from "@components/header/VendorHeader";
import VendorSideNav from "@components/header/VendorSideNav";
import { useRouter } from "next/router";
import React from "react";
import { Footer, Header } from "..";
import Login from "@components/Authentication/Login";

export const Layout: React.FC = ({ children }) => {
  const router = useRouter();
  const noNav =
    router.asPath.startsWith("/login") || router.asPath.startsWith("/register");
  return (
    <>
      {noNav ? (
        <Box>{children}</Box>
      ) : (
        <Flex pos="relative" bg="#f3f2f1">
          <VendorSideNav />
          <Box w={["full", "82%"]} as="main" ml="auto" minH="95vh">
            <VendorHeader />
            <Box as="div" w="100%" mb="3rem">
              <Box>{children}</Box>
            </Box>
          </Box>
        </Flex>
      )}
    </>
  );
};
