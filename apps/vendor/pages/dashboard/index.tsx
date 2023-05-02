import { Box } from "@chakra-ui/react";
import { MainDashboard } from "@components/Dashboard/MainDashboard";
import RecentOrders from "@components/Dashboard/RecentOrders";
import { GetServerSideProps } from "next";

import React from "react";
import { StudioService } from "src/services";
import { withPageAuth } from "src/utils/withPageAuth";

interface DashboardProps {
  studios: any;
}

function index({ studios }: DashboardProps) {
  return (
    <Box>
      <MainDashboard studios={studios} />
      {/* <RecentOrders /> */}
    </Box>
  );
}

export default index;

export const getServerSideProps: GetServerSideProps = withPageAuth(async () => {
  try {
    const studios = await StudioService.listUserStudios({
      offset: 0,
      limit: 10,
    });


    return {
      props: {
        studios,
      },
    };
  } catch (error: any) {
    return {
      props: {
        data: [],
      },
    };
  }
});
