import {
  Box,
  Flex,
  Text,
  HStack,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { RiSearch2Fill } from "react-icons/ri";
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from "react-icons/md";
import { BsFillCalendarEventFill } from "react-icons/bs";
import { GoSettings } from "react-icons/go";
import TopPage from "src/utils/TopPage";
import { BsThreeDotsVertical } from "react-icons/bs";
import BookingDetails from "./BookingDetails";
import { AlertBox, DrawerWrapper, TableStatus } from "ui";

function BookingsHome() {
  const [id, setId] = useState<any>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showAlert, setShowAlert] = useState<boolean>(true);
  return (
    <Box>
      <TopPage
        page={"Bookings"}
        details={"Veiw all your bookings here!"}
        right={true}
        // clickFunction={undefined}
      />
      <Box w="90%" mx="auto" mt="2rem">
        {showAlert && (
          <AlertBox
            status="success"
            text="Done loading"
            onClose={() => setShowAlert(false)}
          />
        )}

        <Box bgColor="white" borderRadius="8px" p="2rem .5rem 1rem">
          <HStack
            justify="space-between"
            px="2rem"
            fontSize=".8rem"
            align="center"
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
          <TableContainer mt="1.5rem">
            <Table>
              <Thead>
                <Tr fontWeight="600">
                  <Th>Booking ID</Th>
                  <Th>Clients</Th>
                  <Th>Amount</Th>
                  <Th>Date</Th>
                  <Th>Status</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr fontSize=".9rem">
                  <Td>AD0090HL30</Td>
                  <Td>Boluwatife Bolu</Td>
                  <Td>#45,000</Td>
                  <Td>3 Jun, 2021</Td>
                  <TableStatus name="Successful" />
                  <Td
                    onClick={() => {
                      setId(3);
                      onOpen();
                    }}
                    cursor="pointer"
                  >
                    <BsThreeDotsVertical />
                  </Td>
                </Tr>
                <Tr fontSize=".9rem">
                  <Td>AD0090HL30</Td>
                  <Td>Jennifer Thompson</Td>
                  <Td>#45,000</Td>
                  <Td>3 Jun, 2021</Td>
                  <TableStatus name="Successful" />
                  <Td
                    onClick={() => {
                      setId(2);
                      onOpen();
                    }}
                    cursor="pointer"
                  >
                    <BsThreeDotsVertical />
                  </Td>
                </Tr>
                <Tr fontSize=".9rem">
                  <Td>AD0090HL30</Td>
                  <Td>Fola Coker</Td>
                  <Td>#45,000</Td>
                  <Td>3 Jun, 2021</Td>
                  <TableStatus name="Cancelled" />
                  <Td
                    onClick={() => {
                      setId(2);
                      onOpen();
                    }}
                    cursor="pointer"
                  >
                    <BsThreeDotsVertical />
                  </Td>
                </Tr>
                <Tr fontSize=".9rem">
                  <Td>AD0090HL30</Td>
                  <Td>Promise Oseni</Td>
                  <Td>#45,000</Td>
                  <Td>3 Jun, 2021</Td>
                  <TableStatus name="In Progress" />
                  <Td
                    onClick={() => {
                      setId(2);
                      onOpen();
                    }}
                    cursor="pointer"
                  >
                    <BsThreeDotsVertical />
                  </Td>
                </Tr>
                <Tr fontSize=".9rem">
                  <Td>AD0090HL30</Td>
                  <Td>Oseni Kenny</Td>
                  <Td>#45,000</Td>
                  <Td>3 Jun, 2021</Td>
                  <TableStatus name="Pending Confirmation" />
                  <Td
                    onClick={() => {
                      setId(2);
                      onOpen();
                    }}
                    cursor="pointer"
                  >
                    <BsThreeDotsVertical />
                  </Td>
                </Tr>
                <Tr fontSize=".9rem">
                  <Td>AD0090HL30</Td>
                  <Td>Ivy Ololade</Td>
                  <Td>#45,000</Td>
                  <Td>3 Jun, 2021</Td>
                  <TableStatus name="Awaiting Payment" />
                  <Td
                    onClick={() => {
                      setId(2);
                      onOpen();
                    }}
                    cursor="pointer"
                  >
                    <BsThreeDotsVertical />
                  </Td>
                </Tr>
                <Tr fontSize=".9rem">
                  <Td>AD0090HL30</Td>
                  <Td>Rose Kaffy</Td>
                  <Td>#45,000</Td>
                  <Td>3 Jun, 2021</Td>
                  <TableStatus name="Successful" />
                  <Td
                    onClick={() => {
                      setId(2);
                      onOpen();
                    }}
                    cursor="pointer"
                  >
                    <BsThreeDotsVertical />
                  </Td>
                </Tr>
                <Tr fontSize=".9rem">
                  <Td>AD0090HL30</Td>
                  <Td>Oseni Kenny</Td>
                  <Td>#45,000</Td>
                  <Td>3 Jun, 2021</Td>
                  <TableStatus name="Pending Confirmation" />
                  <Td
                    onClick={() => {
                      setId(2);
                      onOpen();
                    }}
                    cursor="pointer"
                  >
                    <BsThreeDotsVertical />
                  </Td>
                </Tr>
                <Tr fontSize=".9rem">
                  <Td>AD0090HL30</Td>
                  <Td>Ivy Ololade</Td>
                  <Td>#45,000</Td>
                  <Td>3 Jun, 2021</Td>
                  <TableStatus name="Awaiting Payment" />
                  <Td
                    onClick={() => {
                      setId(2);
                      onOpen();
                    }}
                    cursor="pointer"
                  >
                    <BsThreeDotsVertical />
                  </Td>
                </Tr>
                <Tr fontSize=".9rem">
                  <Td>AD0090HL30</Td>
                  <Td>Rose Kaffy</Td>
                  <Td>#45,000</Td>
                  <Td>3 Jun, 2021</Td>
                  <TableStatus name="Successful" />
                  <Td
                    onClick={() => {
                      setId(2);
                      onOpen();
                    }}
                    cursor="pointer"
                  >
                    <BsThreeDotsVertical />
                  </Td>
                </Tr>
                <Tr fontSize=".9rem">
                  <Td>AD0090HL30</Td>
                  <Td>Jennifer Thompson</Td>
                  <Td>#45,000</Td>
                  <Td>3 Jun, 2021</Td>
                  <TableStatus name="Successful" />
                  <Td
                    onClick={() => {
                      setId(2);
                      onOpen();
                    }}
                    cursor="pointer"
                  >
                    <BsThreeDotsVertical />
                  </Td>
                </Tr>
                <Tr fontSize=".9rem">
                  <Td>AD0090HL30</Td>
                  <Td>Fola Coker</Td>
                  <Td>#45,000</Td>
                  <Td>3 Jun, 2021</Td>
                  <TableStatus name="Cancelled" />
                  <Td
                    onClick={() => {
                      setId(2);
                      onOpen();
                    }}
                    cursor="pointer"
                  >
                    <BsThreeDotsVertical />
                  </Td>
                </Tr>
                <Tr fontSize=".9rem">
                  <Td>AD0090HL30</Td>
                  <Td>Oseni Kenny</Td>
                  <Td>#45,000</Td>
                  <Td>3 Jun, 2021</Td>
                  <TableStatus name="Pending Confirmation" />
                  <Td
                    onClick={() => {
                      setId(2);
                      onOpen();
                    }}
                    cursor="pointer"
                  >
                    <BsThreeDotsVertical />
                  </Td>
                </Tr>
              </Tbody>
            </Table>
            <Button 
                bg="white" 
                height="2rem" 
                w="4rem" 
                cursor="default" 
                ml="-3">
              <Flex>
                <MdKeyboardArrowLeft mt="1px"/>
                Prev.
              </Flex>
            </Button>
            <Button bg="white" height="30px" cursor="default">
                1
            </Button>
            <Button bg="white" height="30px" cursor="default">
                2
            </Button>
            <Button bg="white" height="30px" cursor="default">
                3
            </Button>
            <Button bg="white" height="30px" cursor="default">
                4...
            </Button>
            <Button bg="brand.10" height="2rem" w="4rem" cursor="default">
                <Flex color="white">
                  Next <MdKeyboardArrowRight color="white" mt="1px"/>
                </Flex>
            </Button>
          </TableContainer>
        </Box>
        <DrawerWrapper isOpen={isOpen} onClose={onClose}>
          <BookingDetails
            showAlert={showAlert}
            closed=""
            alertText=""
            response="pending"
            id={id}
          />
        </DrawerWrapper>
      </Box>
    </Box>
  );
}

export default BookingsHome;
