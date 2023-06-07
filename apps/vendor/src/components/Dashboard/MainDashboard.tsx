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
} from '@chakra-ui/react';
import DashboardBanner from './DashboardBanner';
import {
  CustomTable,
  DrawerWrapper,
  Naira,
  TableStatus,
  TableWithSub,
} from 'ui';
import React, { useContext, useEffect, useState } from 'react';
import { AddIcon } from '@chakra-ui/icons';
import { OrderCounts } from './OrderCounts';
import { TopServiceSlider } from './TopServiceSlider';
import { useRouter } from 'next/router';
import { ServiceSlider } from './ServicesSlider';
import { UserContext } from '@components/Context/UserContext';
import TopPage from '../../utils/TopPage';
import { BsFillChatRightTextFill, BsThreeDotsVertical } from 'react-icons/bs';
import {
  BookingView,
  ServiceTypeViewListStandardResponse,
  ServiceViewPagedCollection,
  VendorDashboardView,
} from 'src/services';
import toast from 'react-hot-toast';
import moment from 'moment';
import { ChatContext } from '@components/Context/ChatContext';
import { AuthContext } from '@components/Context/AuthContext';
import { db } from '@components/firebase/firebase';
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import BookingDetails from '@components/pages/BookingDetails';
import data from './data';

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
  const [data, setData] = useState<BookingView>();
  const openDrawer = (value: any) => {
    setData(value);
    onOpen();
  };
  // console.log({ user });

  const thead = [
    'Service Name',
    'Service Cost',
    'Date',
    'Client Name',
    'Status',
    'Chats',
    'Action',
  ];
  // console.log({ services });
  const { dispatch } = useContext(ChatContext);

  const { currentUser } = useContext(AuthContext);

  const handleSelect = async (chatUser: any) => {
    const combinedId =
      currentUser?.uid > chatUser.uid
        ? currentUser?.uid + chatUser.uid
        : chatUser.uid + currentUser?.uid;
    try {
      const res = await getDoc(doc(db, 'chats', combinedId));
      console.log({ res: res.exists() });
      if (!res.exists()) {
        await setDoc(doc(db, 'chats', combinedId), {
          messages: [],
        });
        await updateDoc(doc(db, 'userChats', currentUser?.uid), {
          [combinedId + '.userInfo']: {
            uid: chatUser.uid,
            displayName: chatUser.displayName,
            photoURL: chatUser.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        });
        await updateDoc(doc(db, 'userChats', chatUser.uid), {
          [combinedId + '.userInfo']: {
            uid: currentUser?.uid,
            displayName: currentUser?.displayName,
            photoURL: currentUser?.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        });
        router.push('/message');
      } else {
        dispatch({ type: 'CHANGE_USER', payload: chatUser });
        router.push('/message');
      }
    } catch (error) {}
  };

  console.log({ dashboardMetrics });

  return (
    <>
      <Box mb="4rem">
        <Box>
          <TopPage
            page={`${user?.lastName}!`}
            details={'Welcome to your dashboard'}
            right={true}
            serviceTypes={serviceTypes}
          />
        </Box>

        <DashboardBanner />

        <Box w={{ base: 'full', md: '94%' }} mx="auto">
          <Grid
            templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
            gap={{ base: '1rem', md: '2rem' }}
          >
            <Box w={{ base: '90%', md: '100%' }} mx="auto">
              <Text
                fontFamily="BR Firma"
                fontSize={{ base: '10px', md: '20px' }}
                fontWeight="600"
              >
                Order Tracker
              </Text>
              <Grid
                templateColumns={'repeat(4, 1fr)'}
                w="full"
                bgColor="white"
                h={{ base: '5rem', md: '9.6rem' }}
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
            <Box display={{ base: '80%', md: 'full' }}>
              <TopServiceSlider data={dashboardMetrics.topServices} />
            </Box>
          </Grid>
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
                        <TableWithSub top={info?.service?.name} sub={''} />
                        <TableWithSub
                          top={Naira(info?.totalAmount as number)}
                          sub={''}
                        />
                        <TableWithSub
                          top={moment(info?.date).format('dddd, DD MMMM YYYY')}
                          sub={''}
                        />

                        <TableWithSub top={info?.user?.fullName} sub={''} />
                        <TableStatus name={info?.status as string} />
                        <Td
                          onClick={() =>
                            handleSelect({
                              uid: info.user?.id,
                              displayName: info?.user?.firstName,
                              photoURL: info.user?.profilePicture,
                            })
                          }
                          cursor="pointer"
                        >
                          <BsFillChatRightTextFill />
                        </Td>
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
