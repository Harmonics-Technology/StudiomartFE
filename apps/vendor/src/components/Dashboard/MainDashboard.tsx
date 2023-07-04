import { Box, Text, Grid, useDisclosure, Tr, Td } from "@chakra-ui/react";
import DashboardBanner from "./DashboardBanner";
import {
  CustomTable,
  DrawerWrapper,
  HandleSelectChat,
  Naira,
  TableStatus,
  TableWithSub,
} from "ui";
import React, { useContext, useState } from "react";
import { OrderCounts } from "./OrderCounts";
import { TopServiceSlider } from "./TopServiceSlider";
import { ServiceSlider } from "./ServicesSlider";
import { UserContext } from "@components/Context/UserContext";
import TopPage from "../../utils/TopPage";
import { BsFillChatRightTextFill, BsThreeDotsVertical } from "react-icons/bs";
import {
  BookingView,
  ServiceTypeViewListStandardResponse,
  ServiceViewPagedCollection,
  VendorDashboardView,
} from "src/services";
import moment from "moment";

import BookingDetails from "@components/pages/BookingDetails";
import BeatLoader from "react-spinners/BeatLoader";
import { useRouter } from "next/router";

interface DashboardProps {
  serviceTypes: ServiceTypeViewListStandardResponse;
  dashboardMetrics: VendorDashboardView;
  services: ServiceViewPagedCollection;
}

const MainDashboard = ({
  serviceTypes,
  dashboardMetrics,
  services,
}: DashboardProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useContext(UserContext);
  const [data, setData] = useState<BookingView>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const openDrawer = (value: any) => {
    setData(value);
    onOpen();
  };
  // console.log({ user });

  const thead = [
    "Service Name",
    "Service Cost",
    "Date",
    "Client Name",
    "Status",
    "Chats",
    "Action",
  ];
  // console.log({ services });

  console.log({ dashboardMetrics });

  return (
    <>
      <Box mb="4rem">
        <Box>
          <TopPage
            page={`${user?.lastName}!`}
            details={"Welcome to your dashboard"}
            right={true}
            serviceTypes={serviceTypes}
          />
        </Box>

        <DashboardBanner />

        <Box w={{ base: "full", md: "94%" }} mx="auto">
          <Grid
            templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
            gap={{ base: "1rem", md: "2rem" }}
            w="full"
            display={["flex", "grid"]}
            flexDir={["column", "row"]}
          >
            <Box w={{ base: "90%", md: "100%" }} mx="auto">
              <Text
                fontFamily="BR Firma"
                fontSize={{ base: "14px", md: "20px" }}
                fontWeight="600"
              >
                Order Tracker
              </Text>
              <Grid
                templateColumns={"repeat(4, 1fr)"}
                w="full"
                bgColor="white"
                h={{ base: "5rem", md: "9.6rem" }}
                alignItems="center"
              >
                <OrderCounts
                  count={dashboardMetrics?.totalOrders}
                  title="Total Orders"
                />
                <OrderCounts
                  count={dashboardMetrics.activeOrders}
                  title="Pending Orders"
                />
                <OrderCounts
                  count={dashboardMetrics.inProgressOrders}
                  title="In Progress"
                />
                <OrderCounts
                  count={dashboardMetrics?.cancelledOrders}
                  title="Cancelled"
                  br
                />
              </Grid>
            </Box>
            <Box w={{ base: "full", md: "full" }}>
              <TopServiceSlider data={dashboardMetrics.topServices} />
            </Box>
          </Grid>
          <Box>
            <ServiceSlider data={services?.value} />
          </Box>
          <Box my="2rem" mx={{ base: "1rem", lg: "0" }}>
            <Text
              fontFamily="BR Firma"
              fontSize="18px"
              pl=".5rem"
              fontWeight="600"
            >
              Recent Orders
            </Text>
            <Box
              bgColor="white"
              borderRadius="8px"
              boxShadow="sm"
              p="1rem 2rem"
            >
              <CustomTable tableHead={thead}>
                <>
                  {dashboardMetrics?.recentBookings?.map(
                    (info: BookingView, i) => (
                      <Tr key={i}>
                        <TableWithSub
                          top={info?.service?.name}
                          sub={""}
                          onClick={() => router.push(`/bookings/${info?.id}`)}
                        />
                        <TableWithSub
                          top={Naira(info?.totalAmount as number)}
                          sub={""}
                        />
                        <TableWithSub
                          top={moment(info?.date).format("dddd, DD MMMM YYYY")}
                          sub={""}
                        />

                        <TableWithSub top={info?.user?.fullName} sub={""} />
                        <TableStatus name={info?.status as string} />

                        {info.status?.toLowerCase() !== "paid" ? (
                          <Td>
                            <BsFillChatRightTextFill />
                          </Td>
                        ) : (
                          <HandleSelectChat
                            chatUser={{
                              uid: info.user?.id,
                              displayName: info?.user?.firstName,
                              photoURL: info.user?.profilePicture,
                            }}
                            url="/message"
                            setLoading={setLoading}
                          >
                            <Td>
                              {loading ? (
                                <BeatLoader size={8} />
                              ) : (
                                <BsFillChatRightTextFill />
                              )}
                            </Td>
                          </HandleSelectChat>
                        )}

                        <Td
                          onClick={() => {
                            // setId(3);
                            openDrawer(info);
                          }}
                          cursor="pointer"
                        >
                          <BsThreeDotsVertical />
                        </Td>
                      </Tr>
                    )
                  )}
                </>
              </CustomTable>
            </Box>
          </Box>
        </Box>
      </Box>

      <DrawerWrapper isOpen={isOpen} onClose={onClose}>
        <BookingDetails closed={onClose} data={data as BookingView} />
      </DrawerWrapper>
    </>
  );
};

export default MainDashboard;
