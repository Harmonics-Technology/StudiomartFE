import React from 'react';
import {
  Box,
  Button,
  Flex,
  Spacer,
  Text,
  HStack,
  Image,
  Grid,
} from '@chakra-ui/react';
import data from './data';
import { ArrowBackIcon, ArrowForwardIcon, AddIcon } from '@chakra-ui/icons';
function ServicesCard() {
  return (
    <>
      <Flex>
        <Box>
          <Flex m="2rem">
            <Text fontSize="20px" fontWeight="600">
              Services
            </Text>
            <Text
              color="brand.100"
              pl="4"
              fontWeight="600"
              fontSize="20px"
              cursor="default"
            >
              {' '}
              view all
            </Text>
          </Flex>
        </Box>
        <Spacer />
        <Box>
          <Flex my="2rem" mr="2rem">
            <Box
              bgColor="#636363"
              w="24px"
              borderRadius="full"
              _hover={{
                bgColor: 'black',
                transition: '.5s ease',
              }}
            >
              <ArrowBackIcon boxSize="1.2em" color="white" mt="-1" ml="3px" />
            </Box>
            <Spacer m="5px" />
            <Box
              h="23px"
              bgColor="#636363"
              w="24px"
              borderRadius="full"
              _hover={{
                bgColor: 'black',
                transition: '.5s ease',
              }}
            >
              <ArrowForwardIcon
                boxSize="1.2em"
                color="white"
                mt="-1"
                ml="3px"
              />
            </Box>
          </Flex>
        </Box>
      </Flex>
      <Grid templateColumns="repeat(3, 1fr)" ml="2rem">
        <HStack spacing="15px">
          {data.Card.map((info) => (
            <>
              <Box mr="1" h="28rem" w="22rem" bg="white" borderRadius="lg">
                <Image
                  h="14rem "
                  w="22rem"
                  objectFit="cover"
                  src={info.src}
                  alt="image"
                  bgColor="white"
                />
                <Box h="10rem" w="20rem" ml="2">
                  <Text mt="2" ml="3" pt="2" fontWeight="600" fontSize="20">
                    {info.name}
                  </Text>
                  <Text mt="-4" fontSize="15px" ml="3" fontWeight="400">
                    {info.description}
                  </Text>

                  <Button
                    w="100%"
                    ml="2"
                    bgColor="#AFAFAF"
                    cursor="default"
                    colorScheme="blue"
                  >
                    {info.button}
                  </Button>
                </Box>
              </Box>
            </>
          ))}
        </HStack>
      </Grid>
    </>
  );
}

export default ServicesCard;
