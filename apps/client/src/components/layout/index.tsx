import { Box, Flex } from "@chakra-ui/react";
import { UserContext } from "@components/Context/UserContext";
import CustomerHeader from "@components/header/CustomerHeader";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { Footer, Header } from "..";

export const Layout: React.FC = ({ children }) => {
  const router = useRouter();
  const { userType, user } = useContext(UserContext);
  const noNav =
    router.asPath.startsWith("/login") || router.asPath.startsWith("/register");
  return (
    <>
      {noNav ? (
        <Box>{children}</Box>
      ) : (
        <>
          {userType == "Customer" ? <CustomerHeader /> : <Header />}
          <Box as="main" minH="50vh">
            {children}
          </Box>
          <Footer />
        </>
      )}
    </>
  );
};
