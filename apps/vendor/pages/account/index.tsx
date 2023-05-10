import { GetServerSideProps } from "next";
import React from "react";

const index = () => {
  return <div>index</div>;
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
