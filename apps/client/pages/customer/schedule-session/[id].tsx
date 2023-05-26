import { Box } from "@chakra-ui/react";
import ScheduleDateTime from "@components/customerStudioScheduling/ScheduleDateTime";
import React from "react";
import { GetServerSideProps } from "next";
import { withPageAuth } from "@components/utils/withPageAuth";
import { BookingService, LookupModel } from "src/services";

const index = ({}: LookupModel) => {
  return (
    <>
      <ScheduleDateTime />
    </>
  );
};

export default index;

export const getServerSideProps: GetServerSideProps = withPageAuth(
  async (ctx: any) => {
    const { id } = ctx.query;
    try {
      const singleService = await StudioService.getServiceById({
        id,
      });
      const ratings = await ReviewService.getReviews({ serviceId });
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
