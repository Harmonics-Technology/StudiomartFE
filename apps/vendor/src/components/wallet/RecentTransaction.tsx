import React from 'react';
import { Box, HStack, Flex, Text, SimpleGrid, VStack } from '@chakra-ui/react';

interface recentTransactionProps {
  mode?: boolean;
  message: string;
  amount: string;
  date: string;
  time: string;
}
const RecentTransaction = ({
  mode,
  message,
  amount,
  date,
  time,
}: recentTransactionProps) => {
  return (
    <Box ml="2">
      {/* // <Box ml="2"  overflowY="auto" maxHeight="15rem"> */}
      <SimpleGrid bg="white" mt="-2">
        <>
          <Flex fontWeight="bold" alignItems="center">
            <Box
              mb="4"
              ml="4"
              bgColor={mode ? 'green' : 'red'}
              h="18px"
              w="18px"
              borderRadius="full"
            />
            <Flex flexDir="column">
              <HStack gap={mode ? '' : '6rem'} fontWeight="500">
                <Text pt="2" ml="2" fontSize="14px" pr=".5rem">
                  {message}
                </Text>

                <Text fontSize="16px" pb="2">
                  ₦{amount}
                </Text>
              </HStack>
              <Box mt="-2.5">
                <HStack textColor="#AFAFAF">
                  <Text ml="2" fontSize="10px" pr="4rem" fontWeight="400">
                    {date}
                  </Text>
                  <Box>
                    <Text ml="2" fontSize="10px" fontWeight="400">
                      {time}
                    </Text>
                  </Box>
                </HStack>
              </Box>
            </Flex>
          </Flex>
        </>
      </SimpleGrid>
    </Box>
  );
};

export default RecentTransaction;
