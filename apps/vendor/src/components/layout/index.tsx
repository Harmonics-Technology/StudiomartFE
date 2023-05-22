import { Box, Flex } from "@chakra-ui/react";
import VendorHeader from "@components/header/VendorHeader";
import VendorSideNav from "@components/header/VendorSideNav";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { Footer, Header } from "..";
import Login from "@components/Authentication/Login";
import Notice from "@components/Dashboard/Notice";
import { UserContext } from "@components/Context/UserContext";
import { StudioView, UserView } from "src/services";
import NoSSR from "react-no-ssr";

export const Layout: React.FC = ({ children }) => {
  const router = useRouter();
  const { userStudios, currentStudioId } = useContext(UserContext);
  const notDone: StudioView = userStudios?.find(
    (x: any) => x.id == currentStudioId
  );
  // console.log({ notDone, userStudios, currentStudioId });
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
            <NoSSR>
              <Box as="div" w="100%" mb="1rem" minH="80vh">
                {notDone?.meansOfIdentification ||
                notDone?.cacDocumentReference ||
                router.pathname.startsWith("/account") ? (
                  <Box>{children}</Box>
                ) : (
                  <Notice />
                )}
                {/* <Box>{children}</Box> */}
              </Box>
            </NoSSR>
          </Box>
          <Footer />
        </Flex>
      )}
    </>
  );
};
