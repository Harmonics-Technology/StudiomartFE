import { Box, HStack, Icon, Td, Tr, useDisclosure } from "@chakra-ui/react";
import moment from "moment";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsFillChatRightTextFill, BsThreeDotsVertical } from "react-icons/bs";
import BeatLoader from "react-spinners/BeatLoader";
import { BookingView, BookingViewPagedCollection } from "src/services";
import TopPage from "src/utils/TopPage";
import {
  BookingFilters,
  CustomTable,
  DrawerWrapper,
  HandleSelectChat,
  Naira,
  Pagination,
  TableData,
  TableStatus
} from "ui";
import BookingDetails from "./BookingDetails";

interface BookingProps {
  allBookings: BookingViewPagedCollection;
}

function BookingsHome({ allBookings }: BookingProps) {
  //
  const { isOpen, onOpen, onClose } = useDisclosure();
  const thead = [
    "Booking ID",
    "Clients",
    "Amount",
    "Date",
    "Status",
    "Chat",
    "",
  ];
  const [data, setData] = useState<BookingView>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const openDrawer = (value: any) => {
    setData(value);
    onOpen();
  };
  return (
    <Box>
      <TopPage
        page={"Bookings"}
        details={"Veiw all your bookings here!"}
        right={false}
      />
      <Box w="95%" mx="auto" mt="2rem" my="8" bgColor="white">
        <BookingFilters w="90%" />
        <Box w="90%" mx="auto" pb="2rem" borderRadius="20px">
          <CustomTable tableHead={thead}>
            <>
              {allBookings?.value?.map((info: BookingView) => (
                <Tr key={info.id}>
                  <TableData
                    name={info.bookingReference}
                    full
                    onClick={() => router.push(`/bookings/${info?.id}`)}
                  />
                  <TableData
                    name={info.user?.fullName}
                    full
                    onClick={() => router.push(`/bookings/${info?.id}`)}
                  />
                  <TableData
                    name={Naira(info.amount as number)}
                    full
                    onClick={() => router.push(`/bookings/${info?.id}`)}
                  />
                  <TableData
                    name={moment(info.date).format("DD MMM, YYYY")}
                    full
                    onClick={() => router.push(`/bookings/${info?.id}`)}
                  />
                  <TableStatus name={info.status as string} />
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
                      openDrawer(info);
                    }}
                    cursor="pointer"
                    p="0"
                    ml="auto"
                  >
                    <Icon as={BsThreeDotsVertical} />
                  </Td>
                </Tr>
              ))}
            </>
          </CustomTable>
          <HStack justifyContent="center" mt="3rem">
            <Pagination data={allBookings} />
          </HStack>
        </Box>
        {isOpen && (
          <DrawerWrapper isOpen={isOpen} onClose={onClose}>
            <BookingDetails closed={onClose} data={data as BookingView} />
          </DrawerWrapper>
        )}
      </Box>
    </Box>
  );
}

export default BookingsHome;
