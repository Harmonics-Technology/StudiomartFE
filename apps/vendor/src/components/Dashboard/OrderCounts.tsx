import { HStack, Box, Text, Flex } from '@chakra-ui/react';
import React from 'react';

interface orderProps {
  br?: boolean;
  count: any;
  title: any;
}

export const OrderCounts = ({ br, count, title }: orderProps) => {
  return (
    <Flex
      h="fit-content"
      w="full"
      justify="center"
      borderRight={br ? 'none' : '2px solid #AFAFAF'}
      textAlign="center"
    >
      <Box>
        <Text
          as="b"
          // pl={{ base: '', md: '6' }}
          fontSize={{ base: '20px', md: '32px' }}
          fontWeight="700"
        >
          {count}
        </Text>
        <Text fontSize={{ base: '8px', md: '12px' }} fontWeight="400">
          {title}
        </Text>
      </Box>
    </Flex>
  );
};
