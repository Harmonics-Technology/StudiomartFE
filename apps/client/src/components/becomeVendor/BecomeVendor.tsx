import {
  Box,
  Button,
  HStack,
  VStack,
  Text,
  Image,
  Heading,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { GoPrimitiveDot } from "react-icons/go";
import { getUrlRoute } from "ui";
import Fqa from "./Fqa";

const BecomeVendor = () => {
  return (
    <Box>
      <VStack
        w="full"
        minH={["350px", "500px"]}
        align="flex-start"
        justify="center"
        backgroundColor="rgba(4, 12, 33, 0.7)"
        backgroundImage="/assets/vendor-hero.png"
        backgroundBlendMode="color"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundPosition="center"
      >
        <VStack
          align="flex-start"
          spacing={["4", "8"]}
          w="90%"
          mx="auto"
          color="white"
        >
          <Text
            fontSize={["1.5rem", "2.7rem"]}
            fontWeight="700"
            mb="0"
            lineHeight="normal"
          >
            Do you own a Studio? Start earning
          </Text>
          <Text fontSize={[".9rem", "1.4rem"]} pb="9" fontWeight="500">
            List your studio and start earning from bookings.
          </Text>
          <Link href={`${getUrlRoute().vendorUrl}/register`}>
            <a target="_blank" rel="noopener noreferrer">
              <Button
                w="170px"
                h="50px"
                fontSize={[".8rem", "unset"]}
                bgColor="brand.100"
              >
                Become a Vendor
              </Button>
            </a>
          </Link>
        </VStack>
      </VStack>
      <Box w="90%" mx="auto" py={["10", "20"]}>
        <Heading
          textAlign="center"
          fontSize={["1.2rem", "2.2rem"]}
          color="brand.100"
        >
          Start Earning in Just 3 Steps
        </Heading>
        <SimpleGrid columns={[1, 3]} mt="16" spacing={["10", "16"]}>
          <Box>
            <Box>
              <Image src="assets/01.png" alt="one" />
            </Box>
            <Text mt="-6" zIndex="2" fontSize="1.2rem" fontWeight="600">
              Add Studio
            </Text>
            <Text fontSize={[".9rem", "1rem"]} lineHeight={["taller", "unset"]}>
              Discover Studios near you Nemo enim ipsam voluptatem quia voluptas
              sit aspernatur aut odit aut fugit, sed quia consequuntur magni
              dolores.s
            </Text>
          </Box>
          <Box>
            <Image src="assets/02.png" alt="one" />
            <Text
              mt="-6"
              bgColor="white"
              zIndex="2"
              fontSize="1.2rem"
              fontWeight="600"
            >
              Get Booked
            </Text>
            <Text fontSize={[".9rem", "1rem"]} lineHeight={["taller", "unset"]}>
              Discover Studios near you Nemo enim ipsam voluptatem quia voluptas
              sit aspernatur aut odit aut fugit, sed quia consequuntur magni
              dolores.s
            </Text>
          </Box>
          <Box>
            <Image src="assets/03.png" alt="one" />
            <Text
              mt="-6"
              bgColor="white"
              zIndex="2"
              fontSize="1.2rem"
              fontWeight="600"
            >
              Receive Payment
            </Text>
            <Text fontSize={[".9rem", "1rem"]} lineHeight={["taller", "unset"]}>
              Discover Studios near you Nemo enim ipsam voluptatem quia voluptas
              sit aspernatur aut odit aut fugit, sed quia consequuntur magni
              dolores.s
            </Text>
          </Box>
        </SimpleGrid>
        <Box textAlign={["start", "center"]} mt="10">
          <Link href="/">
            <Button
              w="170px"
              h="50px"
              fontSize={[".8rem", "unset"]}
              bgColor="brand.100"
              color="white"
            >
              Become a Vendor
            </Button>
          </Link>
        </Box>
      </Box>
      <Box bgColor="rgba(21, 112, 250, 0.08)" py="20">
        <Stack
          direction={"row"}
          w="90%"
          mx="auto"
          align="center"
          justify={["space-evenly"]}
          spacing={["8"]}
        >
          <Box color="black">
            <Image
              w={["90px", "auto"]}
              src="assets/Mock up.png"
              alt="mobile app"
            />
          </Box>
          <Box>
            <Heading fontSize={["1.3rem", "3rem"]}>
              Download the <br /> Mobile App
            </Heading>
            <Text my={["5", "10"]} fontSize={[".9rem", "1.2rem"]}>
              StudioMart is available on playstore.
            </Text>
            <HStack spacing="4">
              <Image
                width={["80px", "auto"]}
                cursor="pointer"
                src="assets/Download BTN (1).png"
                alt="download on a pay store"
              />
              <Image
                width={["80px", "auto"]}
                cursor="pointer"
                src="assets/Download BTN.png"
                alt="download on a pay store"
              />
            </HStack>
          </Box>
        </Stack>
      </Box>
      <Box w="90%" mx="auto" py={["10", "24"]}>
        <Heading
          textAlign="center"
          fontSize={["1.2rem", "2.2rem"]}
          color="brand.100"
        >
          Why StudioMart?
        </Heading>
        <SimpleGrid
          columns={[1, 2, 2, 2]}
          spacing={["5", "20"]}
          mt={["10", "20"]}
        >
          {Array(4)
            .fill(null)
            .map((x, index) => (
              <HStack
                key={index}
                align="baseline"
                spacing="7"
                w={["full", "90%"]}
              >
                <Box fontSize={["1.2rem", "1.5rem"]}>
                  <GoPrimitiveDot />
                </Box>
                <VStack align="start">
                  <Text
                    mb="0"
                    fontWeight="bold"
                    fontSize={["1.1rem", "1.5rem"]}
                  >
                    Rent a studio
                  </Text>
                  <Text
                    lineHeight={["24px", "32px"]}
                    fontSize={[".9rem", "1.1rem"]}
                  >
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
                    odit enim ipsam voluptatem quia voluptas sit aspernatur aut
                    odit aut odit aut odit.
                  </Text>
                </VStack>
              </HStack>
            ))}
        </SimpleGrid>
      </Box>
      <Box w="90%" mx="auto" pb={["14", "24"]}>
        <Heading
          textAlign="center"
          fontSize={["1.2rem", "2.2rem"]}
          color="brand.100"
        >
          Frequently Asked Questions
        </Heading>
        <VStack align="flex-start" mt={["8", "20"]} px={["0", "14"]} w="full">
          <Fqa title="What is StudioMart?" />
          <Fqa title="How do I add my studio?" />
          <Fqa title="How do I receive payment?" />
          <Fqa title="How do I verify my studio?" />
        </VStack>
      </Box>
    </Box>
  );
};

export default BecomeVendor;
