import { Box } from '@chakra-ui/react';
import { MainDashboard } from '@components/Dashboard/MainDashboard';
import RecentOrders from '@components/Dashboard/RecentOrders';
import { GetServerSideProps } from 'next';

import React from 'react';
import {
  BookingView,
  DashboardService,
  StudioService,
  VendorDashboardView,
  BookingService,
} from 'src/services';
import { withPageAuth } from 'src/utils/withPageAuth';

interface DashboardProps {
  studios: any;
  dashboardMetrics: VendorDashboardView;
}

function index({ studios, dashboardMetrics }: DashboardProps) {
  return (
    <Box>
      <MainDashboard studios={studios} dashboardMetrics={dashboardMetrics} />
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

    const dashboardMetrics = await DashboardService.vendoDashboardMetrics({});

    return {
      props: {
        studios,
        dashboardMetrics: dashboardMetrics.data,
      },
    };
  } catch (error: any) {
    return {
      props: {
        data: [],
        dashboardMetrics: [],
      },
    };
  }
});
