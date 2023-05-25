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
import { AuthContextProvider } from "@components/Context/AuthContext";
import { ChatContextProvider } from "@components/Context/ChatContext";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  OpenAPI.BASE = process.env.NEXT_PUBLIC_API_BASEURL as string;
  OpenAPI.TOKEN = Cookies.get("customerToken");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loader = document.getElementById("globalLoader");
      if (loader)
        setTimeout(() => {
          loader.remove();
        }, 1000);
    }
  }, []);
  // console.log(OpenAPI.TOKEN);
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
        <title>Studiomart Vendor</title>
        <link rel="icon" href="/stdd.gif" type="image/x-icon" />
      </Head>
      <UserProvider>
        <AuthContextProvider>
          <ChatContextProvider>
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
          </ChatContextProvider>
        </AuthContextProvider>
      </UserProvider>
    </ChakraProvider>
  );
}

export default MyApp;
