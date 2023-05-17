import { Box, Flex, HStack, Text, Image } from "@chakra-ui/react";
import React from "react";

interface BankCardProps {
  bankName: string;
  accountNumber: string;
  accountName: string;
}

export const BankCard = ({
  bankName,
  accountNumber,
  accountName,
}: BankCardProps) => (
  <Box
    borderRadius="10px"
    bgColor={"brand.100"}
    fontFamily="'Orbitron', sans-serif"
    color="white"
    w="3.37in"
    h="1.125in"
    p=".5rem 1rem"
  >
    <Flex justify="flex-end">
      <Text fontFamily="inherit" fontSize=".7rem" mb="0">
        {bankName}
      </Text>
    </Flex>
    <HStack justify="space-between" align="center" my=".3rem">
      <Box>
        <Image src="/assets/chip.png" alt="" w="1.5rem" />
      </Box>
      <Box>
        <Image src="/assets/wifi.png" alt="" w=".7rem" />
      </Box>
    </HStack>
    <Text fontFamily="inherit" fontSize="1rem" mb="0rem" letterSpacing=".2rem">
      {accountNumber}
    </Text>
    <Text fontFamily="inherit" fontSize=".7rem">
      {accountName}
    </Text>
  </Box>
);
