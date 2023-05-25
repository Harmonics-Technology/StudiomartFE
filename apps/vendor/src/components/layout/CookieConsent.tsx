import { Button, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";

interface CookiesProps {
  message: string;
  acceptLabel: string;
  declineLabel: string;
  onAccept: () => void;
  onDecline: () => void;
  setIsConsented: any;
  isConsented: boolean;
}

const CookieConsent = ({
  message,
  acceptLabel,
  declineLabel,
  onAccept,
  onDecline,
  setIsConsented,
  isConsented,
}: CookiesProps) => {
  const handleAccept = () => {
    setIsConsented(true);
    onAccept();
  };

  const handleDecline = () => {
    setIsConsented(true);
    onDecline();
  };

  return (
    <Flex
      justify="center"
      pos="fixed"
      bottom="2%"
      bgColor="white"
      boxShadow="sm"
      // color="white"
      w="25%"
      // left="50%"
      // transform="translateX(-50%)"
      right={isConsented ? "-40%" : "2%"}
      transition=".5s all cubic-bezier(0,.88,.71,.07)"
      py="1.5rem"
      borderRadius="10px"
    >
      <VStack w="85%" justify="space-between" gap=".5rem">
        <Text w="full" mb="0" fontWeight="400">
          {message}
        </Text>
        <HStack gap=".5rem" color="white" w="full">
          <Button onClick={handleAccept} bgColor="brand.100" w="full">
            {acceptLabel}
          </Button>
          <Button onClick={handleDecline} bgColor="#DC2626" w="full">
            {declineLabel}
          </Button>
        </HStack>
      </VStack>
    </Flex>
  );
};

export default CookieConsent;