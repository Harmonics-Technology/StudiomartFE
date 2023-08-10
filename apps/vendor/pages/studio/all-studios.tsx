import { GetServerSideProps } from "next";
import React from "react";
import { OpenAPI, StudioService } from "src/services";
import { FilterPagingOptions } from "ui";
import dynamic from "next/dynamic";
import { withPageAuth } from "src/utils/withPageAuth";

const AllStudios = dynamic(() => import("@components/studio/AllStudios"), {
  ssr: false,
});

const AllStudio = ({ studios }: any) => {
  return <AllStudios studios={studios} />;
};

export default AllStudio;

export const getServerSideProps: GetServerSideProps = withPageAuth(
  async (ctx: any) => {
    const pagingOptions = FilterPagingOptions(ctx);
    try {
      const allStudios = await StudioService.listUserStudios({
        offset: pagingOptions.offset,
        limit: pagingOptions.limit || 9,
        search: pagingOptions.search,
      });
      return {
        props: {
          studios: allStudios.data,
        },
      };
    } catch (error: any) {
      return {
        props: {
          popularStudios: [],
        },
      };
    }
  }
);
