import { GetServerSideProps } from "next";
import React from "react";
import BasicInformation from "@components/accounts/basicInformation";

interface AccountProps {}

const index = () => {
  return 
  <div>
    <BasicInformation />
  </div>;
};

export default index;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    redirect: {
      permanent: false,
      destination: "/account/basic-information",
    },
    props: {},
  };
};
