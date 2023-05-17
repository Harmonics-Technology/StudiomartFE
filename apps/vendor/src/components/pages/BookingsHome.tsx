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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { RiSearch2Fill } from "react-icons/ri";
import { BsFillCalendarEventFill } from "react-icons/bs";
import { GoSettings } from "react-icons/go";
import TopPage from "src/utils/TopPage";
import { BsThreeDotsVertical } from "react-icons/bs";
import BookingDetails from "./BookingDetails";
import {
  CustomTable,
  DrawerWrapper,
  Naira,
  Pagination,
  TableData,
  TableStatus,
} from "ui";
import { BookingView, BookingViewStandardResponse } from "src/services";
import moment from "moment";

interface BookingProps {
  allBookings: BookingViewStandardResponse;
}

function BookingsHome({ allBookings }: BookingProps) {
  console.log({ allBookings });
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
        <Box borderBottom="1px solid" borderColor="gray.300">
          <HStack
            justify="space-between"
            p="2rem 0rem 1rem"
            fontSize=".8rem"
            align="center"
            w="90%"
            mx="auto"
          >
            <Text mb="0">Showing All</Text>
            <InputGroup w="30%">
              <InputLeftElement top=".2rem" color="gray.400" fontSize=".8rem">
                <RiSearch2Fill />
              </InputLeftElement>
              <Input
                type="search"
                placeholder="Search Bookings"
                borderRadius="5px 0 0 5px"
                w="100%"
                _placeholder={{
                  fontSize: ".8rem",
                }}
              />
            </InputGroup>
            <InputGroup w="20%">
              <InputLeftElement top=".2rem" color="gray.400" fontSize=".8rem">
                <BsFillCalendarEventFill />
              </InputLeftElement>
              <Input
                // type="search"
                placeholder="Search Date"
                borderRadius="5px 0 0 5px"
                w="100%"
                _placeholder={{
                  fontSize: ".8rem",
                }}
              />
            </InputGroup>
            <HStack>
              <Flex>
                <Box
                  transform="rotate(90deg)"
                  fontWeight="bold"
                  mr=".8rem"
                  fontSize="1rem"
                >
                  <GoSettings />
                </Box>
                Sort By:
              </Flex>
              <Text>Recent</Text>
              <Box color="gray.400">
                <FaAngleDown />
              </Box>
            </HStack>
          </HStack>
        </Box>
        <Box w="90%" mx="auto" pb="2rem" borderRadius="20px">
          <CustomTable tableHead={thead}>
            <>
              {allBookings?.data?.map((info: BookingView) => (
                <Tr key={info.id}>
                  <TableData name={info.id} />
                  <TableData name={info.user?.fullName} />
                  <TableData name={Naira(info.amount as number)} />
                  <TableData name={moment(info.date).format("DD MMM, YYYY")} />
                  <TableStatus name={info?.status as string} />
                  <Td
                    onClick={() => {
                      openDrawer(info);
                    }}
                    cursor="pointer"
                  >
                    <BsThreeDotsVertical />
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
