import BookingSummary from "@components/bookingSummary/BookingSummary";
import { withPageAuth } from "@components/utils/withPageAuth";
import { GetServerSideProps } from "next";
import React from "react";
import { ICustomerHome } from "src/models/schema";
import { StudioService, ReviewService } from "src/services";

const summary = ({ singleService, ratings, id }: ICustomerHome) => {
  return (
    <BookingSummary singleService={singleService} ratings={ratings} id={id} />
  );
};

export default summary;

export const getServerSideProps: GetServerSideProps = withPageAuth(
  async (ctx: any) => {
    const { summaryId } = ctx.query;
    try {
      const singleService = await StudioService.getServiceById({
        id: summaryId,
      });
      const ratings = await ReviewService.getReviews({ serviceId: summaryId });
      return {
        props: {
          singleService: singleService.data,
          ratings: ratings?.data,
          id: summaryId,
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
