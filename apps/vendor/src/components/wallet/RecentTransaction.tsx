import {
  Box, Circle, HStack, Text, VStack
} from "@chakra-ui/react";
import moment from "moment";
import { Naira } from "ui";

interface recentTransactionProps {
  mode?: string;
  message: string;
  amount: number;
  date: any;
  time: any;
}
const RecentTransaction = ({
  mode,
  message,
  amount,
  date,
  time,
}: recentTransactionProps) => {
  return (
    <HStack justify="space-between" align="flex-start" w="full">
      <HStack align="flex-start">
        <Circle
          bgColor={mode?.toLowerCase() == "payment" ? "#16A34A" : "#DC2626"}
          size="18px"
        />
        <VStack spacing={0} w="full" align="flex-start">
          <Text fontSize="14px" mb="0" fontWeight="500">
            {message}
          </Text>
          <HStack textColor="#AFAFAF" fontSize="10px">
            <Text mb="0">{moment(date).format("ddd, DD MMM YYYY")}</Text>
            <Box>
              <Text mb="0">{moment(time).format("LT")}</Text>
            </Box>
          </HStack>
        </VStack>
      </HStack>
      <Text fontSize="16px" mb="0" fontWeight="500">
        {Naira(amount)}
      </Text>
    </HStack>
  );
};

export default RecentTransaction;
