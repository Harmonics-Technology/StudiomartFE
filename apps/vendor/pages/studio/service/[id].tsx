import { Box } from "@chakra-ui/react";
import { MainStudio } from "@components/studio/MainStudio";

import { GetServerSideProps } from "next";

import React from "react";
import {
  ServiceTypeViewListStandardResponse,
  StudioService,
} from "src/services";
import { withPageAuth } from "src/utils/withPageAuth";

interface StudioProps {
  studios: any;
  serviceTypes: ServiceTypeViewListStandardResponse;
}

function index({ studios, serviceTypes }: StudioProps) {
  //
  return (
    <Box>
      <MainStudio studios={studios} serviceTypes={serviceTypes} />
    </Box>
  );
}

export default index;

export const getServerSideProps: GetServerSideProps = withPageAuth(
  async (ctx: any) => {
    const { id } = ctx.query;
    const studioId = id;
    try {
      const studioServices = await StudioService.listStudioServices({
        offset: 0,
        limit: 10,
        studioId: studioId,
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
