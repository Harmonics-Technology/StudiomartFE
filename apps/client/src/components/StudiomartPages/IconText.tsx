import { Circle, HStack, Icon, Text } from "@chakra-ui/react";

export const IconText = ({ icon, text }: { icon: any; text: string }) => {
  return (
    <HStack spacing="1rem">
      <Circle bgColor="white" p="1rem">
        <Icon as={icon} color="brand.100" />
      </Circle>
      <Text fontSize={["1.1rem"]} mb="0">
        {text}
      </Text>
    </HStack>
  );
};
