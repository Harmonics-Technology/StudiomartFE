import React, { useState } from "react";
import {
  Box,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
  useDisclosure,
  HStack,
  Grid,
} from "@chakra-ui/react";
import data from "./data";
import { TableStatus, DrawerWrapper, AlertBox } from "ui";
import { BsThreeDotsVertical, BsFillChatRightTextFill } from "react-icons/bs";
import OrderDetails from "./OrderDetails";

const RecentOrders = () => {
  const [id, setId] = useState<any>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  return (
    <Box>
      {showAlert && (
        <AlertBox
          status="success"
          text="Your service has been listed succesfully"
          onClose={() => setShowAlert(false)}
        />
      )}
      <Text fontSize="1rem" m="2rem" fontWeight="600">
        Recent Orders
      </Text>
      <Box w="90%" bg="white" ml="2rem">
        <TableContainer mt="1.5rem">
          <Table>
            <Thead pt="3">
              <Tr fontWeight="600">
                <Th>Service Name</Th>
                <Th pl="5.5rem">Date</Th>
                <Th>Clients Name</Th>
                <Th pl="2rem">Status</Th>
                <Td pl="1rem">Chats</Td>
              </Tr>
            </Thead>{" "}
            {data.Table.map((info, i) => (
              <Tbody key={i}>
                <Tr fontSize=".9rem">
                  <Td>
                    <Grid>
                      <Text fontSize="18px" fontWeight="500">
                        {info.text}
                      </Text>
                      <Text fontSize="12px" fontWeight="500" mt="-2">
                        {info.price}
                      </Text>
                    </Grid>
                  </Td>
                  <Td>
                    <Grid>
                      <Text fontSize="18px" fontWeight="500">
                        {info.date}
                      </Text>
                      <Text fontSize="12px" fontWeight="500" mt="-2">
                        {info.delivery}
                      </Text>
                    </Grid>
                  </Td>
                  <Td fontSize="18px" fontWeight="500">
                    {info.name}
                  </Td>
                  <TableStatus name={info.status} />
                  <Td>
                    <BsFillChatRightTextFill />
                  </Td>
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
              </Tbody>
            ))}
          </Table>
        </TableContainer>
      </Box>
      <DrawerWrapper isOpen={isOpen} onClose={onClose}>
        {/* <OrderDetails response="pending" id={id} /> */}
      </DrawerWrapper>
    </Box>
  );
};

export default RecentOrders;
