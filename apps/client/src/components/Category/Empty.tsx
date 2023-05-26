import {
  Box,
  VStack,
  Text,
  Button,
  Heading,
  SimpleGrid,
} from '@chakra-ui/react';
import React from 'react';
import { BackToPage } from 'ui';
import PopularStudioCard from '@components/Home/PopularStudioCard';
import { ImSad2 } from 'react-icons/im';
import { IStudios } from 'src/models/schema';

const Empty = ({ singlecategory }: IStudios) => {
  return (
    <Box mx="auto" py="1rem" px="7" pb="7" bgColor="gray.100">
      <BackToPage name="Back to the homepage" />
      <VStack
        w="90"
        gap=".5rem"
        justify="center"
        align="center"
        mx="auto"
        my="2rem"
        py="4rem"
        bgColor="white"
      >
        <ImSad2 color="#1570fa" size="45px" />

        <Text textColor="brand.100" fontSize="24px">
          Opps! you do not have any saved studio.
        </Text>

        <Text pb="25px" fontSize="10px">
          Kindly browse our category to explore our studios.
        </Text>

        <Button
          bgColor="brand.100"
          textColor="white"
          px="30px"
          fontSize="14px"
          fontWeight="500"
        >
          Browse studios
        </Button>
      </VStack>
      <Heading>Studios for you</Heading>
      <Box>
        <SimpleGrid mt={['5', '10']} columns={[2, 3]} spacing={['3', '6']}>
          {singlecategory?.value?.map((service, index) => (
            <PopularStudioCard key={index} service={service} />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Empty;
