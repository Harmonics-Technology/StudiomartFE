import React, { useEffect, useState } from "react";
import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@definitions/chakra/theme";
import "@styles/global.css";
import { RootStoreProvider } from "@mobx";
import { Layout } from "@components/layout";
import { UserProvider } from "@components/Context/UserContext";
import Cookies from "js-cookie";
import { OpenAPI, UserView } from "src/services";
import NextNProgress from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  OpenAPI.BASE = process.env.NEXT_PUBLIC_API_BASEURL as string;
  const [token, setToken] = useState<UserView>({});
  useEffect(() => {
    if (Cookies.get("user") !== undefined) {
      setToken(JSON.parse(Cookies.get("user") as string));
    }
  }, []);
  OpenAPI.TOKEN = token.token as string;
  // console.log(OpenAPI.TOKEN);
  return (
    <ChakraProvider theme={theme}>
      <UserProvider>
        <Toaster position="top-right" reverseOrder={false} />
        <NextNProgress color="#1570FA" />
        <RootStoreProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </RootStoreProvider>
      </UserProvider>
    </ChakraProvider>
  );
}

export default MyApp;
