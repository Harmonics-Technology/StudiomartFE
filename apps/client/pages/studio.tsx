import { GetServerSideProps } from "next";
import React from "react";
import { OpenAPI, StudioService } from "src/services";
import { FilterPagingOptions } from "ui";
import dynamic from "next/dynamic";

const AllStudios = dynamic(() => import("@components/studios/Studio"), {
  ssr: false,
});

const AllStudio = ({ allService }: any) => {
  return <AllStudios allService={allService} />;
};

export default AllStudio;

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  OpenAPI.BASE = process.env.NEXT_PUBLIC_API_BASEURL as string;
  OpenAPI.TOKEN = ctx.req.cookies.customerToken;
  const pagingOptions = FilterPagingOptions(ctx);
  try {
    const allService = await StudioService.listStudios({
      offset: pagingOptions.offset,
      limit: pagingOptions.limit || 9,
      search: pagingOptions.search,
    });
    return {
      props: {
        allService: allService.data,
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
