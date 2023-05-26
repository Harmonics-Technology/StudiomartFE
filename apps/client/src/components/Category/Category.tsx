import { Box, Flex, Text, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import { BackToPage } from 'ui';
import { FiFilter } from 'react-icons/fi';
import { BiMessageRoundedError } from 'react-icons/bi';
import PopularStudioCard from '@components/Home/PopularStudioCard';
import { ISingleCategory } from 'src/models/schema';
import category from '../utils/category.json';

const Category = ({ singlecategory, categoryId }: ISingleCategory) => {
  console.log(singlecategory);
  return (
    <Box>
      <Flex justify="space-between" px="1rem" my="1rem">
        <Box w="90%" mx="auto" py="1rem" pb="7">
          <BackToPage name="Back to the homepage" />
        </Box>
        <Flex
          gap="10px"
          bg="brand.100"
          color="white"
          borderRadius="4px"
          h="2.5rem "
          px="3rem"
          align="center"
        >
          <FiFilter /> Filters
        </Flex>
      </Flex>
      <Box
        px="20px"
        fontSize="22px"
        fontWeight="700"
        textTransform="capitalize"
      >
        {category?.find((x) => x.id == categoryId)?.name.toLowerCase()} studio
      </Box>

      <Box>
        {singlecategory?.value?.length == 0 ? (
          <Flex mx="2rem" gap=".5rem" justify="center">
            <BiMessageRoundedError color="blue" size={30} />
            <Text>
              Sorry, No{' '}
              {category.find((x) => x.id == categoryId)?.name.toLowerCase()}{' '}
              service is available
            </Text>
          </Flex>
        ) : (
          <SimpleGrid mt={['5', '10']} columns={[2, 3]} spacing={['3', '6']}>
            {singlecategory?.value?.map((service, index) => (
              <PopularStudioCard key={index} service={service} />
            ))}
          </SimpleGrid>
        )}
      </Box>
    </Box>
  );
};

export default Category;
