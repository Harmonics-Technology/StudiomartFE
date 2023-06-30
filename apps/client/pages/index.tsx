import React from "react";
import HomePage from "@components/Home/HomePage";
import { GetServerSideProps } from "next";
import { OpenAPI, StudioService } from "src/services";
import { ICustomerHome } from "src/models/schema";
import axios from "axios";

const Home = ({ popularStudios }: ICustomerHome) => {
  return (
    <>
      <HomePage popularStudios={popularStudios} />
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  OpenAPI.BASE = process.env.NEXT_PUBLIC_API_BASEURL as string;
  OpenAPI.TOKEN = ctx.req.cookies.customerToken;

  try {
    const popularStudios = await StudioService.listServices({
      offset: 0,
      limit: 9,
    });

    return {
      props: {
        popularStudios: popularStudios.data,
      },
    };
  } catch (error: any) {
    console.log({ error });
    return {
      props: {
        popularStudios: [],
      },
    };
  }
};
