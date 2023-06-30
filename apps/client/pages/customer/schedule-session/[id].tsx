import { Box } from "@chakra-ui/react";
import ScheduleDateTime from "@components/customerStudioScheduling/ScheduleDateTime";
import React from "react";
import { GetServerSideProps } from "next";
import { withPageAuth } from "@components/utils/withPageAuth";
import { BookingService, LookupModel, StudioService } from "src/services";
import { ICustomerHome } from "src/models/schema";

const index = ({ singleService, id }: ICustomerHome) => {
  return (
    <>
      <ScheduleDateTime singleService={singleService} id={id} />
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

      return {
        props: {
          singleService: singleService.data,
          id,
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
