import React from "react";
import HomePage from "@components/Home/HomePage";
import { GetServerSideProps } from "next";
import { OpenAPI, StudioService } from "src/services";
import { ICustomerHome } from "src/models/schema";
import axios from "axios";

const Home = ({ popularStudios, location, studiosNearMe }: ICustomerHome) => {
  return (
    <>
      <HomePage
        popularStudios={popularStudios}
        location={location}
        studiosNearMe={studiosNearMe}
      />
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  OpenAPI.BASE = process.env.NEXT_PUBLIC_API_BASEURL as string;
  const ipAddress =
    ctx.req.headers["x-forwarded-for"] || ctx.req.socket.remoteAddress;

  // console.log({ ipAddress });

  try {
    const response = await axios.get(`http://ip-api.com/json`);
    const location = response.data;
    const popularStudios = await StudioService.listServices({
      offset: 0,
      limit: 9,
    });
    const studiosNearMe = await StudioService.listServices({
      offset: 0,
      limit: 9,
      state: location?.city,
    });

    return {
      props: {
        popularStudios: popularStudios.data,
        location,
        studiosNearMe: studiosNearMe.data,
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
