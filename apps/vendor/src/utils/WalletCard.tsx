import { Circle, Flex, Image, Text, VStack } from "@chakra-ui/react";

interface WalletProps {
  title: string;
  amount: any;
  image: string;
}

export const WalletCard = ({ title, amount, image }: WalletProps) => {
  return (
    <Flex
      bgColor="white"
      borderRadius="8px"
      w="full"
      p="1rem"
      gap=".5rem"
      align="center"
    >
      <Circle size="40px">
        <Image src={image} alt="image" h="full" w="full" objectFit="cover" />
      </Circle>
      <VStack spacing={0} align="start" w="max-content">
        <Text fontSize="16px" mb="0">
          {title}
        </Text>
        <Text fontSize="28px" fontWeight="500">
          {amount}
        </Text>
      </VStack>
    </Flex>
  );
};
