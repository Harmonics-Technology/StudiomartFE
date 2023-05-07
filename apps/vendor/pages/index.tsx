import React from "react";
import { GetServerSideProps } from "next";

const Home = () => {
  return <></>;
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    redirect: {
      permanent: false,
      destination: "/login",
    },
    props: {},
  };
};
