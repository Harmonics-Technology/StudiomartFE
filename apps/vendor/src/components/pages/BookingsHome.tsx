import {
  Box,
  Flex,
  Text,
  HStack,
  InputGroup,
  InputLeftElement,
  Input,
  Tr,
  Td,
  useDisclosure,
  Icon,
  Menu,
  MenuItem,
  MenuButton,
  MenuList,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaAngleDown, FaRegCalendarAlt } from "react-icons/fa";
import { RiSearch2Fill } from "react-icons/ri";
import {
  BsCheckAll,
  BsFillTrashFill,
  BsFilter,
  BsSortAlphaDownAlt,
  BsSortAlphaUp,
} from "react-icons/bs";
import { GoSettings } from "react-icons/go";
import TopPage from "src/utils/TopPage";
import { BsThreeDotsVertical } from "react-icons/bs";
import BookingDetails from "./BookingDetails";
import DatePicker, { DateObject } from "react-multi-date-picker";
import {
  BookingFilters,
  CustomTable,
  DrawerWrapper,
  Naira,
  Pagination,
  TableData,
  TableStatus,
} from "ui";
import { BookingView, BookingViewPagedCollection } from "src/services";
import moment from "moment";
import { useDebouncedCallback } from "use-debounce";
import { useRouter } from "next/router";

interface BookingProps {
  allBookings: BookingViewPagedCollection;
}

function BookingsHome({ allBookings }: BookingProps) {
  // console.log({ allBookings });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const thead = ["Booking ID", "Clients", "Amount", "Date", "Status", ""];
  const [data, setData] = useState<BookingView>();
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
                  <TableData name={info.bookingReference} full />
                  <TableData name={info.user?.fullName} full />
                  <TableData name={Naira(info.amount as number)} full />
                  <TableData
                    name={moment(info.date).format("DD MMM, YYYY")}
                    full
                  />
                  <TableStatus name={info.status as string} />
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
        <DrawerWrapper isOpen={isOpen} onClose={onClose}>
          <BookingDetails closed={onClose} data={data as BookingView} />
        </DrawerWrapper>
      </Box>
    </Box>
  );
}

export default BookingsHome;
