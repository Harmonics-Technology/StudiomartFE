import { Box, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { FaStar } from "react-icons/fa";
import { ReviewView } from "src/services";
import dayjs from "dayjs";
import { Star, Rating } from "@smastrom/react-rating";

const Comments = ({ rating }: { rating: ReviewView }) => {
  const myStyles = {
    itemShapes: Star,
    activeFillColor: "#facc15",
    inactiveStrokeColor: "#facc15",
    itemStrokeWidth: 2,
    activeStrokeColor: "transparent",
  };
  return (
    <Box
      borderBottom="2px solid"
      borderColor="brand.300"
      w="full"
      py={["5", "10"]}
    >
      <Box w="90%" mx="auto">
        <Rating
          style={{ maxWidth: 100 }}
          value={rating.reviewCount as number}
          readOnly
          itemStyles={myStyles}
        />
        <Text fontWeight={700} mb="0" py="2" fontSize={["1rem", "1.2rem"]}>
          {rating.user?.fullName}
        </Text>
        <Text fontSize={["1rem", "1.1rem"]} mb="0" fontWeight={500}>
          {rating?.reviewNote}
        </Text>
        <Text color="gray.400" fontSize=".9rem">
          {dayjs(rating?.dateCreated).format("YYYY-MM-DD")} by{" "}
          {rating?.user?.firstName}
        </Text>
      </Box>
    </Box>
  );
};

export default Comments;
