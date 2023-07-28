import { Box } from "@chakra-ui/react";
import { GetServerSideProps } from "next";

import React from "react";
import {
  BookingView,
  DashboardService,
  StudioService,
  VendorDashboardView,
  ServiceViewPagedCollection,
  ServiceTypeViewListStandardResponse,
} from "src/services";
import { withPageAuth } from "src/utils/withPageAuth";
import dynamic from "next/dynamic";

const MainDashboard = dynamic(
  () => import("@components/Dashboard/MainDashboard"),
  { ssr: false }
);
interface DashboardProps {
  serviceTypes: ServiceTypeViewListStandardResponse;
  dashboardMetrics: VendorDashboardView;
  studioServices: ServiceViewPagedCollection;
}

function index({
  serviceTypes,
  dashboardMetrics,
  studioServices,
}: DashboardProps) {
  return (
    <Box>
      <MainDashboard
        serviceTypes={serviceTypes}
        dashboardMetrics={dashboardMetrics}
        services={studioServices}
      />
      {/* <RecentOrders /> */}
    </Box>
  );
}

export default index;

export const getServerSideProps: GetServerSideProps = withPageAuth(
  async (ctx: any) => {
    const vendorStudios = ctx.req.cookies.vendorStudios;
    const studioId = vendorStudios ? JSON.parse(vendorStudios).id : undefined;
    const currentStudioId = ctx.req.cookies.currentStudioId;
    //
    try {
      const studioServices = await StudioService.listStudioServices({
        offset: 0,
        limit: 10,
        studioId: currentStudioId || studioId,
      });

      const dashboardMetrics =
        await DashboardService.vendorStudioDashboardMetrics({
          studioId: currentStudioId || studioId,
        });
      const serviceTypes = await StudioService.getServiceTypes({});

      //

      return {
        props: {
          dashboardMetrics: dashboardMetrics.data,
          studioServices: studioServices.data,
          serviceTypes,
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
  }
);
