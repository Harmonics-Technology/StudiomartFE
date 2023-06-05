import AllStudios from "@components/Home/AllStudios";
import SingleStudioPages from "@components/Home/SingleStudioPages";
import { GetServerSideProps } from "next";
import React from "react";
import { OpenAPI, StudioService } from "src/services";
import { FilterPagingOptions } from "ui";

const SingleStudio = ({ allService, studio }: any) => {
  return <SingleStudioPages allService={allService} studio={studio} />;
};

export default SingleStudio;

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  OpenAPI.BASE = process.env.NEXT_PUBLIC_API_BASEURL as string;
  OpenAPI.TOKEN = ctx.req.cookies.customerToken;
  const pagingOptions = FilterPagingOptions(ctx);
  const { id } = ctx.query;
  try {
    const studio = await StudioService.getStudioById({
      id,
    });
    const allService = await StudioService.listStudioServices({
      offset: pagingOptions.offset,
      limit: pagingOptions.limit || 9,
      studioId: id,
    });
    return {
      props: {
        studio: studio.data,
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