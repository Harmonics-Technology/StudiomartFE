import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import React from "react";
import { OpenAPI, RecentlyViewedService, StudioService } from "src/services";
import { FilterPagingOptions } from "ui";
const AllServices = dynamic(() => import("@components/Home/AllServices"), {
  ssr: false,
});

const AllService = ({ allService, recentlyViewed }: any) => {
  return (
    <AllServices allService={allService} recentlyViewed={recentlyViewed} />
  );
};

export default AllService;

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  OpenAPI.BASE = process.env.NEXT_PUBLIC_API_BASEURL as string;
  OpenAPI.TOKEN = ctx.req.cookies.customerToken;
  const pagingOptions = FilterPagingOptions(ctx);
  try {
    const allService = await StudioService.listServices({
      offset: pagingOptions.offset,
      limit: pagingOptions.limit || 9,
      city: pagingOptions.city,
      maxPrice: pagingOptions.maxPrice,
      minPrice: pagingOptions.minPrice,
      rating: pagingOptions.rating as number,
      serviceTypeId: pagingOptions.serviceTypeId,
      state: pagingOptions.state,
      studioId: pagingOptions.studioId,
    });
    let recentlyViewed;
    if (OpenAPI.TOKEN !== undefined) {
      recentlyViewed = await RecentlyViewedService.getRecentlyViewedItems({
        type: "service",
      });
    }
    return {
      props: {
        allService: allService.data,
        recentlyViewed: recentlyViewed?.data || [],
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
