import { Box } from "@chakra-ui/react";
import { MainStudio } from "@components/studio/MainStudio";

import { GetServerSideProps } from "next";

import React from "react";
import { ServiceTypeViewListStandardResponse, StudioService } from "src/services";
import { withPageAuth } from "src/utils/withPageAuth";

interface StudioProps {
  studios: any;
  serviceTypes: ServiceTypeViewListStandardResponse
}

function index({ studios, serviceTypes }: StudioProps) {
  // console.log({ studios });
  return (
    <Box>
      <MainStudio studios={studios} serviceTypes={serviceTypes} />
    </Box>
  );
}

export default index;

export const getServerSideProps: GetServerSideProps = withPageAuth(
  async (ctx: any) => {
    const studioId = JSON.parse(ctx.req.cookies.vendorStudios)[0].id;
    const currentStudioId = ctx.req.cookies.currentStudioId;
    try {
      const studioServices = await StudioService.listStudioServices({
        offset: 0,
        limit: 10,
        studioId: currentStudioId || studioId,
      });
      const serviceTypes = await StudioService.getServiceTypes({});

      return {
        props: {
          studios: studioServices,
          serviceTypes,
        },
      };
    } catch (error: any) {
      return {
        props: {
          data: [],
        },
      };
    }
  }
);
