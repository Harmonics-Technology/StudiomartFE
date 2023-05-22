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
  Select,
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
  BsFillCalendarEventFill,
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
  CustomTable,
  DrawerWrapper,
  Naira,
  Pagination,
  TableData,
  TableStatus,
} from "ui";
import { BookingView } from "src/services";
import moment from "moment";
import { useDebouncedCallback } from "use-debounce";
import { useRouter } from "next/router";
import { info } from "console";

interface BookingProps {
  allBookings: BookingView[];
}

function BookingsHome({ allBookings }: BookingProps) {
  console.log({ allBookings });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const thead = ["Booking ID", "Clients", "Amount", "Date", "Status", ""];
  const [filterLabel, setFilterLabel] = useState("All");
  const [showSelect, setShowSelect] = useState(false);
  const router = useRouter();
  const [data, setData] = useState<BookingView>();
  const openDrawer = (value: any) => {
    setData(value);
    onOpen();
  };
  const searchFn = useDebouncedCallback(
    (value) => {
      router.push({
        query: {
          ...router.query,
          search: value.trim(),
        },
      });
    },
    // delay in ms
    1000
  );
  const filterOptions = [
    { id: "", label: "All" },
    { id: 1, label: "Pending" },
    { id: 2, label: "Approved" },
    { id: 9, label: "Rejected" },
    { id: 14, label: "Cancelled" },
    { id: 15, label: "Paid" },
  ];
  const filterFn = (value: any) => {
    setShowSelect((prev) => !prev);
    setFilterLabel(value.label);
    router.push({
      query: {
        ...router.query,
        filters: value.id,
      },
    });
  };
  const { order } = router.query;
  const sortResponse = () => {
    if ((order as unknown as number) == 1) {
      router.push({
        query: { ...router.query, order: 2 },
      });
      return;
    }
    if ((order as unknown as number) == 2) {
      router.push({
        query: { ...router.query, order: 1 },
      });
      return;
    }
    router.push({
      query: { ...router.query, order: 2 },
    });
    return;
  };
  const [date, setDate] = useState<any>([
    new DateObject().subtract(4, "days"),
    new DateObject().add(4, "days"),
  ]);
  function filterByDate() {
    router.push({
      query: {
        ...router.query,
        from: date[0].format("YYYY-MM-DD"),
        to: date[1].format("YYYY-MM-DD"),
      },
    });
  }
  function clearfilter() {
    router.push({ query: { ...router.query, from: "", to: "" } });
  }
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
            <Text mb="0">Showing {filterLabel}</Text>
            <InputGroup w="30%">
              <InputLeftElement top=".2rem" color="gray.400" fontSize=".8rem">
                <RiSearch2Fill />
              </InputLeftElement>
              <Input
                type="search"
                placeholder="Search Bookings"
                borderRadius="5px"
                w="100%"
                _placeholder={{
                  fontSize: ".8rem",
                }}
                onChange={(e: any) => searchFn(e.target.value)}
              />
            </InputGroup>
            <HStack>
              <DatePicker
                value={date}
                onChange={setDate}
                range
                format="MMM DD, YYYY"
                render={(stringDates: any, openCalendar: any) => {
                  const from = stringDates[0] || "";
                  const to = stringDates[1] || "";
                  const value = from && to ? from + " - " + to : from;
                  return (
                    <HStack
                      w="fit-content"
                      px="1rem"
                      h="2.5rem"
                      justifyContent="center"
                      alignItems="center"
                      border="1px solid"
                      borderColor="gray.300"
                      color="gray.500"
                      boxShadow="sm"
                      borderRadius="0"
                      cursor="pointer"
                      fontSize=".9rem"
                      onClick={openCalendar}
                    >
                      <Text mb="0" whiteSpace="nowrap">
                        {value}
                      </Text>
                      <Icon as={FaRegCalendarAlt} />
                    </HStack>
                  );
                }}
              />
              <Menu>
                <MenuButton
                  ml=".5rem"
                  // bgColor="red"
                >
                  <Icon as={BsFilter} />
                </MenuButton>
                <MenuList borderRadius="8px" p="0" fontSize=".8rem">
                  <MenuItem
                    borderBottom="1px solid"
                    borderColor="gray.300"
                    as="div"
                    display="flex"
                    gap=".5rem"
                    py=".6rem"
                    onClick={filterByDate}
                  >
                    <Icon as={BsCheckAll} />
                    <Text mb="0">Apply Filter</Text>
                  </MenuItem>
                  <MenuItem
                    as="div"
                    display="flex"
                    gap=".5rem"
                    color="red"
                    py=".6rem"
                    onClick={clearfilter}
                  >
                    <Icon as={BsFillTrashFill} />
                    <Text mb="0"> Clear Filter</Text>
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>
            <HStack>
              <HStack w="full" align="center">
                <Icon
                  as={GoSettings}
                  transform="rotate(90deg)"
                  fontWeight="bold"
                  fontSize="1rem"
                />
                <Text mb="0">Filter By:</Text>
              </HStack>
              <Flex h="2rem" minW="6rem" pos="relative">
                <HStack
                  justify="space-between"
                  align="center"
                  w="full"
                  cursor="pointer"
                  onClick={() => setShowSelect((prev) => !prev)}
                >
                  <Text mb="0" fontWeight="500">
                    {filterLabel}
                  </Text>
                  <Icon as={FaAngleDown} />
                </HStack>
                {showSelect && (
                  <Box
                    pos="absolute"
                    top="100%"
                    zIndex="888"
                    bgColor="white"
                    w="8rem"
                    boxShadow="md"
                  >
                    {filterOptions
                      .filter((x) => x.label !== filterLabel)
                      .map((x) => (
                        <Flex
                          key={x.id}
                          px="1rem"
                          cursor="pointer"
                          h="2rem"
                          w="full"
                          align="center"
                          fontSize="inherit"
                          onClick={() => filterFn(x)}
                          _hover={{
                            bgColor: "brand.100",
                            color: "white",
                          }}
                        >
                          {x.label}
                        </Flex>
                      ))}
                  </Box>
                )}
              </Flex>
              <Icon
                as={
                  (order as unknown as number) == 1
                    ? BsSortAlphaDownAlt
                    : BsSortAlphaUp
                }
                cursor="pointer"
                onClick={() => sortResponse()}
              />
            </HStack>
          </HStack>
        </Box>
        <Box w="90%" mx="auto" pb="2rem" borderRadius="20px">
          <CustomTable tableHead={thead}>
            <>
              {allBookings?.map((info: BookingView) => (
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
