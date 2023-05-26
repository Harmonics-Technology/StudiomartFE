import React from "react";
import {
  Box,
  Heading,
  VStack,
  Text,
  HStack,
  ListItem,
  OrderedList,
  SimpleGrid,
  Button,
} from "@chakra-ui/react";
import Comments from "./Comments";
import { FaStar } from "react-icons/fa";
import ProgressBar from "./Progress";
import { BackToPage, Naira, Rating } from "ui";
import Carousel from "./Carousel";
import Link from "next/link";
import { ICustomerHome } from "src/models/schema";
import { AdditionalServiceView, MediaView, ReviewView } from "src/services";
import { DummyImage } from "react-simple-placeholder-image";
import NoSSR from "react-no-ssr";
import { useRouter } from "next/router";

export const StudioDetails = ({ singleService, ratings }: ICustomerHome) => {
  const router = useRouter();
  return (
    <Box pb="10" pt={["5", "10"]}>
      <Box w="90%" mx="auto" pb="7">
        <BackToPage name="Back to category" />
      </Box>
      <NoSSR>
        <Box>
          {(singleService?.media as MediaView[])?.length < 1 ? (
            <DummyImage height={100} />
          ) : (
            <Carousel media={singleService?.media as MediaView[]} />
          )}
        </Box>
      </NoSSR>

      <Box w="90%" mx="auto">
        <Box>
          <Heading fontSize={["1.2rem", "1.7rem"]} p="4" bgColor="brand.300">
            Studio brief
          </Heading>
          <Box py={["6", "8"]}>
            <VStack align="flex-start" spacing="2" pl="4">
              <Text mb="0" fontWeight={700} fontSize={["1.1rem", "1.3rem"]}>
                {singleService?.name} - {Naira(singleService?.price as number)}{" "}
                NGN
                <Text
                  fontSize={[".9rem", "1rem"]}
                  fontWeight={400}
                  color="#808080"
                  as="span"
                >
                  Per hour
                </Text>
              </Text>
              <Text
                fontWeight={500}
                color="#808080"
                fontSize={[".9rem", "1rem"]}
              >
                {singleService?.studio?.address}
              </Text>
              <Rating />
            </VStack>
            <Text mt="4" fontWeight={500} pl="4">
              {singleService?.description}
            </Text>
          </Box>
        </Box>
        <Box>
          <Heading fontSize={["1.2rem", "1.7rem"]} p="4" bgColor="brand.300">
            Additional services
          </Heading>
          <Box py={["6", "8"]}>
            {singleService?.additionalServices?.map(
              (x: AdditionalServiceView) => (
                <HStack key={x.id} pl="4">
                  <Text fontSize={[".9rem", "1rem"]} mb="0" fontWeight={400}>
                    {x.name}
                  </Text>
                  <Text fontWeight={700} fontSize={["1rem", "1.2rem"]} mb="0">
                    {Naira(x.price as number)}
                  </Text>
                </HStack>
              )
            )}
          </Box>
        </Box>
        <Box>
          <Heading fontSize={["1.2rem", "1.7rem"]} p="4" bgColor="brand.300">
            Details to remeber
          </Heading>
          <VStack py={["6", "8"]} align="flex-start" spacing="4" pl="4">
            <HStack
              w="300px"
              fontWeight={500}
              align="center"
              justify="space-between"
              fontSize={[".9rem", "1rem"]}
            >
              <Text mb="0">Studio hours</Text>
              <Text>Open for 12hrs</Text>
            </HStack>
            <HStack
              w="300px"
              fontWeight={500}
              align="center"
              justify="space-between"
              fontSize={[".9rem", "1rem"]}
            >
              <Text mb="0">Max occupancy</Text>
              <Text>{singleService?.studio?.studioCapacity} people</Text>
            </HStack>
            <HStack
              w="300px"
              fontWeight={500}
              align="center"
              justify="space-between"
              fontSize={[".9rem", "1rem"]}
            >
              <Text mb="0">Max booking</Text>
              <Text>6hrs</Text>
            </HStack>
          </VStack>
        </Box>
        <Box>
          <Heading fontSize={["1.2rem", "1.7rem"]} p="4" bgColor="brand.300">
            Amenities
          </Heading>
          <VStack py={["6", "8"]} align="flex-start" spacing="4" pl="4">
            <Text fontWeight={500} fontSize={[".9rem", "1rem"]}>
              Water, Electricity, Generator, CCTV, Free Wifi
            </Text>
          </VStack>
        </Box>
        <Box>
          <Heading fontSize={["1.2rem", "1.7rem"]} p="4" bgColor="brand.300">
            Studio rules and regulations
          </Heading>
          <OrderedList
            py={["6", "8"]}
            spacing="4"
            fontWeight={500}
            fontSize={[".9rem", "1rem"]}
            pl="4"
          >
            <ListItem>Lorem ipsum dolor sit amet</ListItem>
            <ListItem>Consectetur adipiscing elit</ListItem>
            <ListItem>Integer molestie lorem at massa</ListItem>
            <ListItem>Facilisis in pretium nisl aliquet</ListItem>
          </OrderedList>
        </Box>
        <Box>
          <Button
            w="full"
            h="3.5rem"
            mb="3"
            fontWeight={500}
            bgColor="brand.100"
            fontSize={["1rem", "1.3rem"]}
            textTransform="capitalize"
            color="white"
            transition="0.5s linear"
            borderRadius="4px"
            cursor="pointer"
            onClick={() =>
              router.push(`/customer/schedule-session${singleService?.id}`)
            }
            _hover={{
              backgroundColor: "transparent",
              color: "brand.100",
              border: "2px solid #1570FA",
            }}
            _focus={{
              outline: "none",
            }}
          >
            Proceed
          </Button>
          <Button
            w="full"
            h="3.5rem"
            fontWeight={500}
            bgColor="white"
            fontSize={["1rem", "1.3rem"]}
            textTransform="capitalize"
            color="brand.100"
            transition="0.5s linear"
            borderRadius="4px"
            border="2px solid #1570FA"
            cursor="pointer"
            _hover={{
              backgroundColor: "brand.100",
              color: "white",
            }}
            _focus={{
              outline: "none",
            }}
          >
            Save studio
          </Button>
        </Box>
      </Box>
      <Box bgColor="brand.300" py="1px" my="10" />
      <SimpleGrid
        columns={[1, 2]}
        bgColor="brand.300"
        spacingY="9"
        pb="4rem"
        w="90%"
        mx="auto"
        pt="8"
        px="5"
      >
        <VStack align="flex-start" spacing={1}>
          <Heading fontSize={["1.2rem", "1.6rem"]}>Customer reviews</Heading>
          <Text fontWeight={500} color="GrayText">
            {ratings?.size} verified rating
          </Text>
          <Rating />
          <Text fontWeight={900} fontSize={["1rem", "1.2rem"]}>
            3.9/5
          </Text>
        </VStack>
        <VStack align="flex-start">
          <HStack spacing="4">
            <Text fontWeight={500} mb="0">
              5
            </Text>
            <FaStar color="#FACC15" />
            <ProgressBar />
          </HStack>
          <HStack spacing="4">
            <Text fontWeight={500} mb="0">
              4
            </Text>
            <FaStar color="#FACC15" />
            <ProgressBar />
          </HStack>
          <HStack spacing="4">
            <Text fontWeight={500} mb="0">
              3
            </Text>
            <FaStar color="#FACC15" />
            <ProgressBar />
          </HStack>
          <HStack spacing="4">
            <Text fontWeight={500} mb="0">
              2
            </Text>
            <FaStar color="#FACC15" />
            <ProgressBar />
          </HStack>
          <HStack spacing="4">
            <Text fontWeight={500} mb="0">
              1
            </Text>
            <FaStar color="#FACC15" />
            <ProgressBar />
          </HStack>
        </VStack>
      </SimpleGrid>
      <VStack align="flex-start" py="5" pb={["10", "20"]} w="90%" mx="auto">
        {ratings?.value?.length == 0 ? (
          <Text>No Reviews yet!!!</Text>
        ) : (
          <>
            {ratings?.value?.map((rating: ReviewView, i: number) => (
              <Comments key={i} rating={rating} />
            ))}
          </>
        )}
      </VStack>
    </Box>
  );
};
