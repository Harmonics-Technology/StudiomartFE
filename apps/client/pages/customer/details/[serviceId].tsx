import { withPageAuth } from "@components/utils/withPageAuth";
import { GetServerSideProps } from "next";
import React from "react";
import { ICustomerHome } from "src/models/schema";
import {
  RecentlyViewedService,
  ReviewService,
  ServiceView,
  StudioService,
} from "src/services";

import dynamic from "next/dynamic";

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

export const getServerSideProps: GetServerSideProps = withPageAuth(
  async (ctx: any) => {
    const { serviceId } = ctx.query;
    const userId = JSON.parse(ctx.req.cookies.customer).id;
    try {
      const singleService = await StudioService.getServiceById({
        id: serviceId,
      });
      const ratings = await ReviewService.getReviews({ serviceId });
      let studioService;
      if (singleService?.data?.studio !== null) {
        studioService = await StudioService.listStudioServices({
          studioId: singleService?.data?.studio?.id as string,
          // studioId: "08db45f1-c422-4ec8-84d5-49db9e72de96",
          limit: 6,
          offset: 0,
        });
      }
      await RecentlyViewedService.createRecentlyViewed({
        requestBody: { userId, serviceId },
      });

      return {
        props: {
          singleService: singleService.data,
          ratings: ratings?.data,
          studios: studioService?.data || {},
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
  }
);
