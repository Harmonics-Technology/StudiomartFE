import { StudioDetails } from "@components/details/StudioDetails";
import { withPageAuth } from "@components/utils/withPageAuth";
import { GetServerSideProps } from "next";
import React from "react";
import { ICustomerHome } from "src/models/schema";
import {
  RecentlyViewedService,
  ReviewService,
  StudioService,
} from "src/services";

const SingleServiceView = ({
  singleService,
  ratings,
  recentlyViewed,
}: ICustomerHome) => {
  return (
    <StudioDetails
      singleService={singleService}
      ratings={ratings}
      recentlyViewed={recentlyViewed}
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
      await RecentlyViewedService.createRecentlyViewed({
        requestBody: { userId, serviceId },
      });

      return {
        props: {
          singleService: singleService.data,
          ratings: ratings?.data,
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
