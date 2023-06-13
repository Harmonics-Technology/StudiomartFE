import { HStack, Box, Text } from "@chakra-ui/react";
import ProgressBar from "@components/details/Progress";
import { FaStar } from "react-icons/fa";
import { CalculatePercent } from "ui";

export const RatingInfo = ({ count, num, total }: any) => {
  return (
    <HStack spacing="4">
      <Text fontWeight={500} mb="0" w="1rem">
        {num}
      </Text>
      <FaStar color="#FACC15" />
      <Text fontWeight="400" mb="0">
        ({count})
      </Text>
      <Box w="15rem">
        <ProgressBar size={CalculatePercent(count, total)} color="#FACC15" />
      </Box>
    </HStack>
  );
};
