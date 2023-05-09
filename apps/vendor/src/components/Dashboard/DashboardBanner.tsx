import React from "react";
import {
  Box,
  Button,
  Flex,
  Spacer,
  Heading,
  HStack,
  Image,
  Grid,
} from "@chakra-ui/react";

function DashboardBanner() {
  return (
    <Flex bgColor="brand.100" m="2rem" borderRadius="xl">
      <Box w="70%">
        <Heading
          fontSize="48px"
          fontWeight="700"
          color="white"
          pl="2rem"
          py="2rem"
        >
          Life is much more easier <br />
          with our mobile app
        </Heading>
        <HStack pl="2rem" pb="2rem" mt="-1">
          <Image
            w="7rem"
            h="2.3rem"
            src="/assets/appstore.png"
            alt="app store"
          />
          <Image
            w="7rem"
            h="2.3rem"
            objectFit="fill"
            src="/assets/playstore.png"
            alt="playstore"
          />
        </HStack>
      </Box>
      <Box ml="-16" mt="6">
        <Image
          h="12rem"
          objectFit="cover"
          src="/assets/iphone.png"
          alt="image"
        />
      </Box>
    </Flex>
  );
}

export default DashboardBanner;
