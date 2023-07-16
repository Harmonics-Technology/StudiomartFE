import { Box, Flex } from "@chakra-ui/react";
import { UserContext } from "@components/Context/UserContext";
import Notice from "@components/Dashboard/Notice";
import VendorHeader from "@components/header/VendorHeader";
import VendorSideNav from "@components/header/VendorSideNav";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { StudioView } from "src/services";
import { useComponentVisible } from "ui";
import { Footer } from "..";

export const Layout: React.FC = ({ children }) => {
  const router = useRouter();
  const { userStudios, currentStudioId } = useContext(UserContext);
  const notDone: StudioView = userStudios?.find(
    (x: any) => x.id == currentStudioId
  );

  // console.log({ notDone });

  const noNav =
    router.asPath.startsWith("/login") || router.asPath.startsWith("/register");
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  return (
    <>
      {noNav ? (
        <Box>{children}</Box>
      ) : (
        <Flex pos="relative" bg="#f3f2f1">
          <VendorSideNav
            showSide={isComponentVisible}
            setShowSide={setIsComponentVisible}
            navRef={ref}
          />
          <Box w={{ base: "full", lg: "82%" }} as="main" ml="auto" minH="95vh">
            <VendorHeader
              showSide={isComponentVisible}
              setShowSide={setIsComponentVisible}
            />
            <Box as="div" w="100%" mb="1rem" minH="80vh">
              {notDone?.meansOfIdentification ||
              router.asPath.startsWith("/account") ? (
                <Box>{children}</Box>
              ) : (
                <Notice />
              )}
              {/* <Box>{children}</Box> */}
            </Box>
          </Box>
          <Footer />
        </Flex>
      )}
    </>
  );
};
