import AllServices from "@components/Home/AllServices";
import { GetServerSideProps } from "next";
import React from "react";
import { OpenAPI, RecentlyViewedService, StudioService } from "src/services";
import { FilterPagingOptions } from "ui";

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
  const { state } = ctx.query;
  try {
    const allService = await StudioService.listServices({
      offset: pagingOptions.offset,
      limit: pagingOptions.limit || 9,
      city: pagingOptions.city,
      maxPrice: pagingOptions.maxPrice,
      minPrice: pagingOptions.minPrice,
      rating: pagingOptions.rating as number,
      serviceTypeId: pagingOptions.serviceTypeId,
      state: pagingOptions.state || state,
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
    return {
      props: {
        popularStudios: [],
      },
    };
  }
};
