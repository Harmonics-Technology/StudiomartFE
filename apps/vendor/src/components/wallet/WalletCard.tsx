import { Box, Image, Text, VStack, Flex } from '@chakra-ui/react';
import React from 'react';

interface walletCardProps {
  title: string;
  amount: string;
}
const WalletCard = ({ title, amount }: walletCardProps) => {
  return (
    <Flex bgColor="white" borderRadius="8px" w="18rem">
      <Box ml="2" alignSelf="center" my="4">
        <Image
          src="/assets/wallettab.png"
          alt="image"
          h="60px"
          w="60px"
          ml="4"
        />
      </Box>
      <VStack spacing={-5} align="start" ml="" mt="4px" w="10rem">
        <Text pl="5" pt="4" fontSize="16px" fontWeight="400" mt="-1.5">
          {title}
        </Text>

        <Text fontSize="32px" w="700" pl="4" mt="-2.5">
          {amount}
        </Text>
      </VStack>
    </Flex>
  );
};

export default WalletCard;
