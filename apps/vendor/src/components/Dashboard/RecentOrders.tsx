import React ,{ useState }from 'react'
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
    HStack, Grid
} from "@chakra-ui/react";
import { TableStatus } from "src/utils/Tables";
import { BsThreeDotsVertical, BsFillChatRightTextFill } from "react-icons/bs";
import DrawerWrapper from 'src/utils/DrawerWrapper';
import OrderDetails from './OrderDetails';
import AlertBox from "src/utils/AlertBox";

const RecentOrders = () => {
    const [id, setId] = useState<any>();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [showAlert, setShowAlert] = useState<boolean>(true);
  return (
      <Box>
                {showAlert && (
                    <AlertBox
                        status="success"
                  text="Your service has been listed succesfully"
                onClose={() => setShowAlert(false)}
                    />
                )}
          <Text fontSize="1rem" m="2rem" fontWeight="600">Recent Orders</Text>
          <Box>
          <TableContainer mt="1.5rem">
                    <Table >
                        <Thead>
                            <Tr  fontWeight="600" >
                                <Th>Service Name</Th>
                                <Th>Date</Th>
                                <Th>Clients Name</Th>
                                <Th>Status</Th>
                                <Td>Chats</Td>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr fontSize=".9rem">
                              <Td>
                                  <Grid >
                                      <Text >
                                      Bridal Makeover
                                      </Text>
                                      <Text fontSize="10px" mt="-2">
                                      N42,670.00
                              </Text>
                                  </Grid></Td>
                                  <Td>
                                  <Grid >
                                      <Text >
                                      Sat, 16 March 2020
                                      </Text>
                                      <Text fontSize="10px" mt="-2">
                                      Delivered on Tue, 19 March 2020
                              </Text>
                              </Grid></Td>
                              
                               
                              <Td >Olaleye Promise</Td>
                                <TableStatus name="Successful" />
                                <Td><BsFillChatRightTextFill/></Td>
                                <Td
                                    onClick={() => {
                                        setId(4);
                                        onOpen();
                                    }}
                                    cursor="pointer"
                                >
                                    <BsThreeDotsVertical />
                                </Td>
                            </Tr>
                            <Tr fontSize=".9rem">
                            <Td>
                                  <Grid >
                                      <Text >
                                      Gele Tying
                                      </Text>
                                      <Text fontSize="10px" mt="-2">
                                      N3,750.00
                              </Text>
                                  </Grid></Td>
                                  <Td>
                                  <Grid >
                                      <Text >
                                      Sat, 16 March 2020
                                      </Text>
                                      <Text fontSize="10px" mt="-2">
                                      Delivered on Tue, 19 March 2020
                              </Text>
                              </Grid></Td>
                                <Td>Olaleye Promise</Td>
                                <TableStatus name="Cancelled" />
                                <Td><BsFillChatRightTextFill/></Td>
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
                            <Td>
                                  <Grid >
                                      <Text >
                                      Birthday look
                                      </Text>
                                      <Text fontSize="10px" mt="-2">
                                      N3,750.00
                              </Text>
                                  </Grid></Td>
                                  <Td>
                                  <Grid >
                                      <Text >
                                      Sat, 16 March 2020
                                      </Text>
                                      <Text fontSize="10px" mt="-2">
                                      Delivered on Tue, 19 March 2020
                              </Text>
                              </Grid></Td>
                                <Td>Olaleye Promise</Td>
                                <TableStatus name="In progress" />
                                <Td><BsFillChatRightTextFill/></Td>
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
                            <Td>
                                  <Grid >
                                      <Text >
                                      Gele Tying
                                      </Text>
                                      <Text fontSize="10px" mt="-2">
                                      N3,750.00
                              </Text>
                                  </Grid></Td>
                                  <Td>
                                  <Grid >
                                      <Text >
                                      Sat, 16 March 2020
                                      </Text>
                                      <Text fontSize="10px" mt="-2">
                                      Delivered on Tue, 19 March 2020
                              </Text>
                              </Grid></Td>
                                <Td>Olaleye Promise</Td>
                                <TableStatus name="Cancelled" />
                                <Td><BsFillChatRightTextFill/></Td>
                                <Td
                                    onClick={() => {
                                        setId(1);
                                        onOpen();
                                    }}
                                    cursor="pointer"
                                >
                                    <BsThreeDotsVertical />
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
          </Box>
          <DrawerWrapper isOpen={isOpen} onClose={onClose}>
                    {/* <OrderDetails response="pending" id={id} /> */}
                </DrawerWrapper>
    </Box>
  )
}

export default RecentOrders