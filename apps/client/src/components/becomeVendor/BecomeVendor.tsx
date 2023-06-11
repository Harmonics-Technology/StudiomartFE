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
  Flex,
} from "@chakra-ui/react";
import { BecomeVendorInfo } from "@components/utils/BecomeVendorInfo";
import Link from "next/link";
import React from "react";
import { GoPrimitiveDot } from "react-icons/go";
import { getUrlRoute, ProcedureCard } from "ui";
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
        <Flex
          justify="space-between"
          align="center"
          gap="2rem"
          my="4rem"
          flexDirection={{ base: "column", lg: "row" }}
        >
          <ProcedureCard
            num="01"
            title="Create an Account"
            note="Create an account by completing  the registration process."
          />
          <Image src="/line.png" alt="line" w="80px" />
          <ProcedureCard
            num="02"
            title="List Your Services"
            note="Upload correct details of your  studio and services you offer."
          />
          <Image src="/line.png" alt="line" w="80px" />
          <ProcedureCard
            num="03"
            title="Get Notified"
            note="Connect with customers and get  notified when your services are needed."
          />
        </Flex>
        <Box
          textAlign={["start", "center"]}
          mt="10"
          mx="auto"
          w={{ base: "50%", lg: "fit-content" }}
        >
          <Link href={`${getUrlRoute().vendorUrl}/register`}>
            <Button
              w="full"
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
      <Box bgColor="rgba(21, 112, 250, 0.08)" py="20" w="full">
        <Stack
          direction={{ base: "column", lg: "row" }}
          w={{ base: "90%", lg: "60%" }}
          mx="auto"
          align="center"
          justify={["space-evenly"]}
          spacing={["8"]}
        >
          <Box color="black" w={{ base: "fit-content", lg: "full" }}>
            <Image
              w={["200px", "full"]}
              src="assets/mobileapp.png"
              alt="mobile app"
            />
          </Box>
          <VStack
            w="full"
            align={{ base: "center", lg: "flex-start" }}
            gap={{ base: "0", lg: "1rem" }}
          >
            <Heading fontSize={["1.5rem", "3rem"]} fontFamily="BR Firma">
              Download the Mobile App
            </Heading>
            <Text fontSize={[".9rem", "1.2rem"]}>
              StudioMart is available on playstore.
            </Text>
            <HStack spacing="4">
              <Box>
                <Image
                  width={["120px", "auto"]}
                  cursor="pointer"
                  src="assets/Download BTN (1).png"
                  alt="download on a pay store"
                />
              </Box>
              <Box>
                <Image
                  width={["120px", "auto"]}
                  cursor="pointer"
                  src="assets/Download BTN.png"
                  alt="download on a pay store"
                />
              </Box>
            </HStack>
          </VStack>
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
          <BecomeVendorInfo
            title="Expand Your Reach"
            content="By listing your studios on our platform, you tap into a vast community of potential clients actively seeking your services. Gain exposure to a broader audience and increase your chances of securing more bookings."
          />
          <BecomeVendorInfo
            title="Streamlined Booking Process"
            content="Our user-friendly interface makes it easy for clients to discover and book your studio. We provide a seamless booking experience, eliminating unnecessary complexities and saving you time and effort."
          />
          <BecomeVendorInfo
            title="Customer Support"
            content="Our dedicated customer support team is always ready to assist you and address any queries or concerns. We strive to ensure a positive experience for both vendors and clients, providing prompt assistance whenever needed."
          />
          <BecomeVendorInfo
            title="Secure Payment System"
            content="Ensuring peace of mind for all your transactions. Enjoy seamless, fast, and reliable payments, all backed by our robust security measures. Trust us to safeguard your transactions and keep your sensitive data confidential."
          />
        </SimpleGrid>
      </Box>
      <Box w="90%" m={{ base: "3rem auto 6rem", lg: "2rem auto 6rem" }}>
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
