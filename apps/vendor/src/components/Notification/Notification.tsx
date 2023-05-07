import React from "react";
import {
  Box,
  Container,
  Avatar,
  Grid,
  Text,
  Flex,
  SimpleGrid,
  Spacer,
  HStack,
  Stack,
  Button,
} from "@chakra-ui/react";
// import { NotificationTop } from "src/utils/NotificationTop";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import data from "@components/Dashboard/data";

const Notification = () => {
  return (
    <Box fontFamily="DM Sans">
      <Box>
        {/* <NotificationTop
          page={"Notification"}
          details={"Welcome to your dashboard"}
          right={true}
        /> */}
      </Box>

      <Box w="90%" my="8" h="40rem" bgColor="white" mx="auto" pt="6">
        <SimpleGrid bg="white">
          {data.notification.map((info) => (
            <>
              <Box height="100px" borderBottom="0.8px solid #D4DDDF">
                <Box ml="3">
                  <Flex fontWeight="bold" alignItems="center">
                    <Box
                      ml="4"
                      bgColor="brand.100"
                      h="10px"
                      w="10px"
                      borderRadius="full"
                    />
                    <Avatar src="#" mt="2" ml="4" />

                    <Text
                      mt="4"
                      ml="4"
                      fontSize="18px"
                      pr="4rem"
                      fontWeight="400"
                    >
                      {info.message}
                      <Text as="span" color="brand.100">
                        {" "}
                        View
                      </Text>
                    </Text>
                    <Spacer />
                    <Grid marginRight="4" ml="4" gap={3}>
                      <Box ml="7">
                        {" "}
                        <BsThreeDotsVertical />
                      </Box>

                      <Box>
                        {" "}
                        <Text fontSize="10px" pl="1" h="18px" w="49px">
                          {info.time}
                        </Text>
                      </Box>
                    </Grid>
                  </Flex>
                </Box>{" "}
              </Box>{" "}
            </>
          ))}

          <HStack justifyContent="center" mt="3rem">
            <SimpleGrid
              minChildWidth="10px"
              spacing="2"
              w="40%"
              fontWeight="500"
              fontSize="20px"
              justifyContent="center"
            >
              <Button
                bg="white"
                height="2rem"
                w="4rem"
                cursor="default"
                ml="-3"
              >
                <Flex>
                  <ChevronLeftIcon mt="1px" />
                  Prev.
                </Flex>
              </Button>
              <Button bg="white" height="30px" cursor="default">
                1
              </Button>
              <Button bg="white" height="30px" cursor="default">
                {" "}
                2
              </Button>
              <Button bg="white" height="30px" cursor="default">
                3
              </Button>
              <Button bg="white" height="30px" cursor="default">
                4...
              </Button>
              <Button height="2rem" w="4rem" cursor="default" bg="brand.100">
                <Flex color="white">
                  Next <ChevronRightIcon color="white" mt="1px" />
                </Flex>
              </Button>
            </SimpleGrid>
          </HStack>
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Notification;
