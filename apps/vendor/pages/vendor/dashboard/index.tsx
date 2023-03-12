import {Box} from "@chakra-ui/react";
import { MainDashboard } from "@components/Dashboard/MainDashboard";
import RecentOrders from "@components/Dashboard/RecentOrders";

import React from "react";

function index() {
  return (<Box>
    <MainDashboard />
    <RecentOrders />
  </Box>);
}

export default index;
