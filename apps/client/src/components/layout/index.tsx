import { Box, Flex } from "@chakra-ui/react";
import CustomerHeader from "@components/header/CustomerHeader";
import { useRouter } from "next/router";
import React from "react";
import { Footer, Header } from "..";

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <CustomerHeader />

      {children}

      <Footer />
    </>
  );
};
