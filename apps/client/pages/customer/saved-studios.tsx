import SavedStudiosComponent from "@components/Home/SavedStudiosComponent";
import React from "react";
import { GetServerSideProps } from "next";
import { withPageAuth } from "@components/utils/withPageAuth";
import { StudioService } from "src/services";

import { IStudios } from "src/models/schema";
import { FilterPagingOptions } from "ui";
import axios from "axios";

const savedStudiosComponent = ({ savedStudios, studioForYou }: IStudios) => {
  return (
    <SavedStudiosComponent
      savedStudios={savedStudios}
      studioForYou={studioForYou}
    />
  );
};

export default savedStudiosComponent;

export const getServerSideProps: GetServerSideProps = withPageAuth(
  async (ctx: any) => {
    const ipAddress =
      ctx.req.headers["x-forwarded-for"] || ctx.req.socket.remoteAddress;
    // console.log({ ipAddress });
    const pagingOptions = FilterPagingOptions(ctx);
    try {
      const response = await axios.get(`http://ip-api.com/json`);
      const location = response.data;
      const savedStudios = await StudioService.listSavedServices({
        offset: pagingOptions.offset,
        limit: pagingOptions.limit ,
        search: pagingOptions.search,
      });
      const studioForYou = await StudioService.listServices({
        offset: pagingOptions.offset,
        limit: pagingOptions.limit,
        state: location?.city,
      });

      return {
        props: {
          savedStudios: savedStudios.data,
          studioForYou: studioForYou.data,
        },
      };
    } catch (error: any) {
      return {
        props: {
          singlecategory: [],
        },
      };
    }
  }
);
