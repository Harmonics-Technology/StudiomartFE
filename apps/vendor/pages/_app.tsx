import React, { useEffect, useState } from "react";
import { AppProps } from "next/app";
import {
  Alert,
  AlertIcon,
  Box,
  ChakraProvider,
  CloseButton,
  Flex,
} from "@chakra-ui/react";
import theme from "@definitions/chakra/theme";
import "@styles/global.css";
import { Layout } from "@components/layout";
import { UserProvider } from "@components/Context/UserContext";
import Cookies from "js-cookie";
import { OpenAPI, UserView } from "src/services";
import NextNProgress from "nextjs-progressbar";
import { toast, ToastBar, Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  OpenAPI.BASE = process.env.NEXT_PUBLIC_API_BASEURL as string;
  OpenAPI.TOKEN = Cookies.get("customerToken");
  if (Cookies.get("user") == "Vendor") {
    OpenAPI.TOKEN = Cookies.get("vendorToken");
  }
  // console.log(OpenAPI.TOKEN);
  return (
    <ChakraProvider theme={theme}>
      <UserProvider>
        <Toaster
          position="top-center"
          containerClassName="toasts"
          toastOptions={{
            className: "toaster",
            // duration: 3000000,
          }}
          reverseOrder={false}
        >
          {(t: any) => (
            <ToastBar toast={t}>
              {({ icon, message }) => (
                <>
                  <Alert
                    bgColor="white"
                    p="0"
                    justifyContent="space-between"
                    mx="auto"
                  >
                    <Flex gap="1rem" align="center" h="fit-content">
                      {icon}
                      {message}
                    </Flex>

                    <CloseButton onClick={() => toast.dismiss(t.id)} />
                  </Alert>
                </>
              )}
            </ToastBar>
          )}
        </Toaster>
        <NextNProgress color="#1570FA" />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </ChakraProvider>
  );
}

export default MyApp;
