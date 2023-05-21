import {
  Box,
  Button,
  Text,
  Flex,
  Select,
  Grid,
  Textarea,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  Tr,
  Td,
} from "@chakra-ui/react";
import DashboardBanner from "./DashboardBanner";
import { CustomTable, Naira, TableStatus, TableWithSub } from "ui";
import React, { useContext, useEffect, useState } from "react";
import { AddIcon } from "@chakra-ui/icons";
import { OrderCounts } from "./OrderCounts";
import { TopServiceSlider } from "./TopServiceSlider";
import { useRouter } from "next/router";
import { ServiceSlider } from "./ServicesSlider";
import { UserContext } from "@components/Context/UserContext";
import TopPage from "../../utils/TopPage";
import { BsFillChatRightTextFill, BsThreeDotsVertical } from "react-icons/bs";
import {
  BookingView,
  ServiceTypeViewListStandardResponse,
  ServiceViewPagedCollection,
  VendorDashboardView,
  VendorDashboardViewStandardResponse,
} from "src/services";
import toast from "react-hot-toast";
import moment from "moment";
import { ChatContext } from "@components/Context/ChatContext";
import { AuthContext } from "@components/Context/AuthContext";
import { db } from "@components/firebase/firebase";
import {
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";

interface DashboardProps {
  serviceTypes: ServiceTypeViewListStandardResponse;
  dashboardMetrics: VendorDashboardView;
  services: ServiceViewPagedCollection;
}

export const MainDashboard = ({
  serviceTypes,
  dashboardMetrics,
  services,
}: DashboardProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { user } = useContext(UserContext);
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
  const { dispatch } = useContext(ChatContext);

  const { currentUser } = useContext(AuthContext);
  const chatUser = {
    uid: "Wo4Xzjqr1UaSZD5sX3El1YBL9ql1",
    displayName: "brain",
    photoURL: "https://ucarecdn.com/e65c36c5-1939-4430-9110-c052cd154c5a/",
  };

  const combinedId =
    currentUser?.uid > chatUser.uid
      ? currentUser?.uid + chatUser.uid
      : chatUser.uid + currentUser?.uid;
  const handleSelect = async () => {
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      console.log({ res: res.exists() });
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), {
          messages: [],
        });
        await updateDoc(doc(db, "userChats", currentUser?.uid), {
          [combinedId + ".userInfo"]: {
            uid: chatUser.uid,
            displayName: chatUser.displayName,
            photoURL: chatUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", chatUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser?.uid,
            displayName: currentUser?.displayName,
            photoURL: currentUser?.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        router.push("/message");
      } else {
        dispatch({ type: "CHANGE_USER", payload: chatUser });
        router.push("/message");
      }
    } catch (error) {}
  };

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
        <Button bgColor="red" color="white" onClick={handleSelect}>
          Chat
        </Button>
        <DashboardBanner />

        <Box w="94%" mx="auto">
          <Flex gap="2rem">
            <Box w="60%">
              <Text fontFamily="BR Firma" fontSize="20px" fontWeight="600">
                Order Tracker
              </Text>
              <Grid
                templateColumns="repeat(4, 1fr)"
                w="full"
                bgColor="white"
                h="9.6rem"
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
            <Box w="40%">
              <TopServiceSlider data={dashboardMetrics.topServices} />
            </Box>
          </Flex>
          <Box>
            <ServiceSlider data={services?.value} />
          </Box>
          <Box my="2rem">
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
                        <TableWithSub top={info?.service?.name} sub={""} />
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
                        <Td>
                          <BsFillChatRightTextFill />
                        </Td>
                        <Td
                          onClick={() => {
                            // setId(3);
                            onOpen();
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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          fontFamily="DM Sans', sans-serif"
          w="40%"
          maxW="unset"
          minH="77vh"
        >
          <ModalHeader fontSize="20px" fontWeight="500">
            Add Services
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel fontSize="18px" fontWeight="400">
                Services Name
              </FormLabel>
              <Input
                fontSize="16px"
                fontWeight="400"
                placeholder="Bridal Make-up"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel fontSize="18px" fontWeight="400">
                Services Category
              </FormLabel>
              <Select placeholder="Select category">
                <option>Makeup studio</option>
                <option>Gele studio</option>
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel fontSize="18px" fontWeight="400">
                Services Price
              </FormLabel>
              <Input
                fontSize="16px"
                fontWeight="400"
                placeholder="Enter Price"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel fontSize="18px" fontWeight="400">
                Sevice Details
              </FormLabel>
              <Textarea h="10rem" />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel fontSize="18px" fontWeight="400">
                Upload images
              </FormLabel>
              <Grid templateColumns="repeat(4, 1fr)" gap={1}>
                <Box
                  w="100%"
                  h="10"
                  border="1px solid #AFAFAF"
                  borderRadius="md"
                >
                  <AddIcon mx="6" my="3" />
                </Box>
                <Box
                  w="100%"
                  h="10"
                  border="1px solid #AFAFAF"
                  borderRadius="md"
                >
                  <AddIcon mx="6" my="3" />
                </Box>
                <Box
                  w="100%"
                  h="10"
                  border="1px solid #AFAFAF"
                  borderRadius="md"
                >
                  <AddIcon mx="6" my="3" />
                </Box>
                <Box
                  w="100%"
                  h="10"
                  border="1px solid #AFAFAF"
                  borderRadius="md"
                >
                  <AddIcon mx="6" my="3" />
                </Box>
              </Grid>
            </FormControl>
            <Flex
              justifyContent="space-between"
              mt="2"
              fontSize="10px"
              fontWeight="500"
            >
              <Box>
                <Text>*First image will be set as service cover</Text>
              </Box>
              <Box>
                <Text color="brand.100">Add more</Text>
              </Box>
            </Flex>
          </ModalBody>

          <ModalFooter justifyContent="center" gap="3" mt="-6">
            <Button onClick={onClose} w="8rem" fontSize="14px" fontWeight="700">
              Cancel
            </Button>
            <Button
              bgColor="brand.100"
              color="white"
              fontSize="14px"
              fontWeight="700"
              w="8rem"
            >
              List Service
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
