import { withPageAuth } from "@components/utils/withPageAuth";
import { GetServerSideProps } from "next";
import React from "react";
import { ICustomerHome } from "src/models/schema";
import {
  OpenAPI,
  RecentlyViewedService,
  ReviewService,
  ServiceView,
  StudioService,
} from "src/services";

import dynamic from "next/dynamic";
import { toast } from "react-hot-toast";

const ServiceDetails = dynamic(
  () => import("@components/details/ServiceDetails"),
  { ssr: false }
);

const SingleServiceView = ({
  singleService,
  ratings,
  studios,
}: ICustomerHome) => {
  return (
    <ServiceDetails
      service={singleService as ServiceView}
      reviews={ratings}
      studios={studios}
    />
  );
};

export default SingleServiceView;

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  OpenAPI.BASE = process.env.NEXT_PUBLIC_API_BASEURL as string;
  OpenAPI.TOKEN = ctx.req.cookies.customerToken;
  const { serviceId } = ctx.query;
  const userId =
    ctx.req.cookies.customer && JSON.parse(ctx.req.cookies.customer).id;
  try {
    const singleService = await StudioService.getServiceById({
      id: serviceId,
    });
    const ratings = await ReviewService.getReviews({ serviceId });
    let studioService;
    if (singleService?.data?.studio !== null) {
      studioService = await StudioService.listStudioServices({
        studioId: singleService?.data?.studio?.id as string,
        limit: 6,
        offset: 0,
      });
    }
    if (OpenAPI.TOKEN && userId) {
      await RecentlyViewedService.createRecentlyViewed({
        requestBody: { userId, serviceId },
      });
    }

    return {
      props: {
        singleService: singleService.data,
        ratings: ratings?.data,
        studios: studioService?.data || {},
      },
    };
  } catch (error: any) {
    toast(error?.statusText);
    return {
      props: {
        popularStudios: [],
      },
    };
  }
};
