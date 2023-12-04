import { Box } from "@chakra-ui/react";
import { UserContext } from "@components/Context/UserContext";
import CustomerHeader from "@components/header/CustomerHeader";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { ServiceTypeView, StudioService } from "src/services";
import { Footer, Header } from "..";

export const Layout: React.FC = ({ children }) => {
  const router = useRouter();
  const { userType, user } = useContext(UserContext);
  const [category, setCategory] = useState<ServiceTypeView[] | null>();
  const getCategory = async () => {
    try {
      const result = await StudioService.getServiceTypes({});
      if (result.status) {
        setCategory(result.data);
        return;
      }
      toast.error(result.message as string);
    } catch (error: any) {}
  };
  useEffect(() => {
    getCategory();
  }, []);

  const noNav =
    router.asPath.startsWith("/login") || router.asPath.startsWith("/register");
  return (
    <>
      {noNav ? (
        <Box>{children}</Box>
      ) : (
        <>
          {user ? (
            <CustomerHeader category={category} />
          ) : (
            <Header />
          )}
          <Box as="main" minH="50vh">
            {children}
          </Box>
          <Footer category={category} />
        </>
      )}
    </>
  );
};
