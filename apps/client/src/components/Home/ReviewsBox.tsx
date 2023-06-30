import { Flex, VStack, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import React from "react";
import { ReviewView } from "src/services";
import { Rating } from "ui";

export const ReviewsBox = ({ review }: { review: ReviewView }) => {
  return (
    <Flex
      align="flex-start"
      justify="space-between"
      py="2rem"
      borderBottom="1px solid #e6e6e6"
      w="full"
    >
      <VStack align="flex-start">
        <Text fontWeight="500" color="#171717">
          {review?.user?.fullName}
        </Text>
        <Text
          fontWeight="400"
          color="#3d3d3d"
          fontSize="12px"
          lineHeight="18px"
        >
          {review?.reviewNote}
        </Text>
      </VStack>
      <VStack spacing="3rem" align="flex-end">
        <Rating value={review?.reviewCount} />
        <Text
          fontWeight="400"
          color="#3d3d3d"
          fontSize="12px"
          lineHeight="18px"
        >
          {dayjs(review?.dateCreated).format("MMMM DD, YYYY")}
        </Text>
      </VStack>
    </Flex>
  );
};
