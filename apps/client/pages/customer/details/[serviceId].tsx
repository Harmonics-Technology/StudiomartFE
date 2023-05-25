import { StudioDetails } from "@components/details/StudioDetails";
import { withPageAuth } from "@components/utils/withPageAuth";
import { GetServerSideProps } from "next";
import React from "react";
import { ICustomerHome } from "src/models/schema";
import { ReviewService, StudioService } from "src/services";

const SingleServiceView = ({ singleService, ratings }: ICustomerHome) => {
  return <StudioDetails singleService={singleService} ratings={ratings} />;
};

export default SingleServiceView;

export const getServerSideProps: GetServerSideProps = withPageAuth(
  async (ctx: any) => {
    const { serviceId } = ctx.query;
    try {
      const singleService = await StudioService.getServiceById({
        id: serviceId,
      });
      const ratings = await ReviewService.getReviews({ serviceId });
      return {
        props: {
          singleService: singleService.data,
          ratings: ratings?.data
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
