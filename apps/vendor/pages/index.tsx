import React from "react";
import HomePage from "@components/Home/HomePage";
import { GetServerSideProps } from "next";

const Home = () => {
  return <HomePage />;
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
