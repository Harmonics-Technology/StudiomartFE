import { Box, Flex } from "@chakra-ui/react";
import CustomerHeader from "@components/header/CustomerHeader";
import VendorHeader from "@components/header/VendorHeader";
import VendorSideNav from "@components/header/VendorSideNav";
import { useRouter } from "next/router";
import React from "react";
import { Footer, Header } from "..";

export const Layout: React.FC = ({ children }) => {
    const router = useRouter();
    const vendor = router.pathname.startsWith("/vendor");
    return (
        <>
            {vendor ? (
                <>
                    <Flex pos="relative" bg="#f6f7f8">
                        <VendorSideNav />
                        <Box
                            w={["full", "84%"]}
                            as="main"
                            ml="auto"
                            minH="95vh"
                        >
                            <VendorHeader />
                            <Box as="div" w="100%" mb="3rem">
                                <Box>{children}</Box>
                            </Box>
                        </Box>
                    </Flex>
                </>
            ) : (
                <>
                    {router.asPath === "/login" ||
                    router.asPath ===
                        "/register" ? null : router.pathname.startsWith(
                          "/customer",
                      ) ? (
                        <CustomerHeader />
                    ) : (
                        <Header />
                    )}
                    {children}

                    {router.asPath === "/login" ||
                    router.asPath === "/register" ? null : (
                        <Footer />
                    )}
                </>
            )}
        </>
    );
};
