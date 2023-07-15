import { GetServerSideProps } from "next";
import React from "react";
import { toast } from "react-hot-toast";
import { OpenAPI, StudioService } from "src/services";
import { FilterPagingOptions } from "ui";
import dynamic from "next/dynamic";

const SingleStudioPages = dynamic(
  () => import("@components/Home/SingleStudioPages"),
  {
    ssr: false,
  }
);

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
    return {
      props: {
        popularStudios: [],
      },
    };
  }
};
