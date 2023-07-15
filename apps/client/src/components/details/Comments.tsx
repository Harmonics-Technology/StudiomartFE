import { Box, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { ReviewView } from "src/services";
import { Rating } from "ui";

const Comments = ({ rating }: { rating: ReviewView }) => {
  return (
    <Box
      borderBottom="2px solid"
      borderColor="brand.300"
      w="full"
      py={["5", "10"]}
    >
      <Box w="90%" mx="auto">
        <Rating value={rating.reviewCount as number} />
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
