import React, { useEffect, useState } from "react";
import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@definitions/chakra/theme";
import "@styles/global.css";
import Cookies from "js-cookie";
import { OpenAPI, UserView } from "src/services";
import NextNProgress from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";
import { Layout } from "@components/layout";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ChakraProvider theme={theme}>
      <Toaster position="top-right" reverseOrder={false} />
      <NextNProgress color="#1570FA" />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
