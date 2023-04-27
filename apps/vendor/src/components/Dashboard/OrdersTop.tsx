import React from "react";
import {
  Box,
  Button,
  Flex,
  Spacer,
  Text,
  HStack,
  Image,
  Grid,
} from "@chakra-ui/react";
import data from "./data";
function OrdersTop() {
  return (
    <Flex>
      <Grid
        templateColumns="repeat(4, 1fr)"
        mx="2rem"
        w="45%"
        bgColor="white"
        h="9rem"
      >
        {data.Orders.map((info) => (
          <>
            <HStack
              h="12"
              mt="3rem"
              borderRight={info.id == 4 ? "none" : "1px solid black"}
            >
              <Box pl="4" pt="auto" ml="2">
                <Text as="b" pl="6" fontSize="32px" fontWeight="700">
                  {info.no}
                </Text>
                <Text fontSize="12px" fontWeight="400">
                  {info.sub}
                </Text>
              </Box>
            </HStack>
          </>
        ))}
      </Grid>

      <Grid>
        <HStack spacing="10px">
          {/* <Carousel autoPlay> */}
          {data.Carousel.map((info) => (
            <>
              <Box w="9rem" h="9rem" bg="white" borderRadius="md">
                <Image
                  h="5rem"
                  objectFit="cover"
                  src={info.image}
                  alt="image"
                />
                <Box h="4rem" pl="2">
                  <Grid mt=".5" fontWeight="500" fontSize="16px">
                    <Text as="b">{info.heading}</Text>
                    <Text>{info.Order}</Text>
                  </Grid>
                </Box>
              </Box>
            </>
          ))}
          {/* </Carousel> */}
        </HStack>
      </Grid>
    </Flex>
  );
}

export default OrdersTop;
