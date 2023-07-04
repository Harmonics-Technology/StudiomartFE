import {
  Box,
  Flex,
  Grid,
  HStack,
  Image,
  Text,
  Button,
  VStack,
} from "@chakra-ui/react";
import { InfoBox } from "@components/utils/InfoBox";
import React, { useState } from "react";
import { useDummyImage } from "react-simple-placeholder-image";
import { IBookingsProps } from "src/models/schema";

import {
  BookingFilters,
  getReviewSummary,
  Naira,
  NotFound,
  Pagination,
  ResponseBox,
  Rating,
} from "ui";
import dayjs from "dayjs";
import { useRouter } from "next/router";

export default function BookingHistory({ bookings }: IBookingsProps) {
  const image = useDummyImage({});
  const router = useRouter();

  return (
    <Box my={["1rem", "3rem"]}>
      <Box w={{ base: "90%", lg: "90%" }} mx="auto">
        <BookingFilters />
        {bookings?.value?.length == 0 ? (
          <NotFound />
        ) : (
          <>
            <Grid
              w="full"
              gap="1.5rem"
              my="1rem"
              templateColumns={["repeat(1, 1fr)", "repeat(3,1fr)"]}
            >
              {bookings?.value?.map((x) => (
                <>
                  <HStack
                    borderRadius="8px"
                    boxShadow="md"
                    p="1.5rem"
                    spacing="1rem"
                    w="full"
                    h="full"
                    key={x.id}
                  >
                    <Box
                      width={{ base: "10rem", lg: "10rem" }}
                      height="100%"
                      overflow="hidden"
                      borderRadius="10px"
                      bgColor="red"
                      // display={{ base: "none", lg: "block" }}
                    >
                      <Image
                        src={x.service?.bannerImageURL || image}
                        alt="image"
                        w="full"
                        h="full"
                        objectFit="cover"
                      />
                    </Box>
                    <VStack align="flex-start" w="full">
                      <HStack w="full">
                        <Text fontSize=".8rem" mb="0">
                          Booking ID: {x.bookingReference}
                        </Text>
                        <ResponseBox response={x.status?.toLowerCase()} />
                      </HStack>
                      <HStack>
                        <Text
                          fontSize={[".7rem", "1.5rem"]}
                          noOfLines={1}
                          fontWeight="700"
                          mb="0"
                        >
                          {x.service?.name}
                        </Text>
                      </HStack>
                      <HStack>
                        {x?.additionalServices?.map((b) => (
                          <Text
                            key={b.id}
                            mb="0"
                            fontSize=".8rem"
                            noOfLines={1}
                          >
                            {b.name}
                          </Text>
                        ))}
                      </HStack>
                      <Box>
                        <InfoBox
                          title="Date and Time"
                          desc={`${dayjs(x.date).format(
                            "DD/MM/YYYY"
                          )} - ${dayjs(
                            dayjs().format("YYYY-MM-DD") + `T${x.time}Z`
                          )
                            .subtract(1, "hour")
                            .format("hh:mm A")}`}
                        />
                      </Box>
                      <HStack justify="space-between" w="full">
                        <Rating
                          value={
                            getReviewSummary(x.service?.reviewCounts)
                              .reviewStars
                          }
                        />
                        <Button
                          bgColor="brand.100"
                          borderRadius="25px"
                          h="2rem"
                          color="white"
                          px="1rem"
                          fontSize=".8rem"
                          onClick={() =>
                            router.push(`/customer/history/${x.id}`)
                          }
                        >
                          View Details
                        </Button>
                      </HStack>
                    </VStack>
                  </HStack>
                </>
              ))}
            </Grid>
            <HStack my="3rem" w="full" justify="center">
              <Pagination data={bookings} />
            </HStack>
          </>
        )}
      </Box>
    </Box>
  );
}
