import BecomeVendor from "@components/becomeVendor/BecomeVendor";
import { GetServerSideProps } from "next";
import React from "react";

const Vendor = ({ isLoggedIn }: any) => {
  return <BecomeVendor isLoggedIn={isLoggedIn} />;
};

export default Vendor;

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  const isLoggedIn = ctx.req.cookies.customerToken;

  return {
    props: {
      isLoggedIn: isLoggedIn ? true : false,
    },
  };
};
