import {
  Box,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  VStack,
  Text,
  Button,
  HStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ExploreStudioCard from "./ExploreStudioCard";
import PopularStudioCard from "./PopularStudioCard";
import TextTransition, { presets } from "react-text-transition";
import { BookNowLink, getCityAndState } from "ui";
import { ICustomerHome } from "src/models/schema";
import { StudioService } from "src/services";
import category from "../utils/category.json";

const studios = [
  "music studio",
  "makeup studio",
  "photo studio",
  "art studio",
  "podcast studio",
];

const HomePage = ({
  popularStudios,
  location,
  studiosNearMe,
}: ICustomerHome) => {
  const [index, setIndex] = useState(0);

  // console.log({ location });

  const [locas, setLocas] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  // console.log({ locas });

  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  //   } else {
  //     setError("Geolocation is not supported by your browser");
  //   }
  // }, []);

  const handleSuccess = (position: any) => {
    const { latitude, longitude } = position.coords;
    getCityAndState(latitude, longitude)
      .then((result) => {
        setLocas(result);
      })
      .catch((error) => {
        console.error("Error getting city and state:", error);
      });
    // setLocas({ latitude, longitude });
  };
  const handleError = (error: any) => {
    // setError(error.message);
  };

  useEffect(() => {
    const intervalId = setInterval(() => setIndex((prev) => prev + 1), 2000);
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <Box as="div">
      <VStack
        w="full"
        minH={["400px", "90vh"]}
        align="flex-start"
        justify="center"
        backgroundColor="rgba(4, 12, 33, 0.7)"
        backgroundImage="/assets/homepage-hero.png"
        backgroundBlendMode="overlay"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundPosition="center bottom"
      >
        <Box w="90%" mx="auto">
          <Text
            fontSize={["1.5rem", "2.7rem"]}
            color="white"
            fontWeight="700"
            lineHeight="normal"
            as="h1"
          >
            Find the next{" "}
            <Text color="brand.100" as="span">
              <TextTransition inline springConfig={presets.slow}>
                {studios[index % studios.length]}
              </TextTransition>
            </Text>{" "}
            for <br /> your creative explorations.
          </Text>
          <HStack spacing="25px" pt="8">
            <Link passHref href="/all-services">
              <Button
                w="150px"
                h="50px"
                fontSize={[".8rem", "unset"]}
                borderRadius="0px"
                color="white"
                bgColor="brand.100"
              >
                Book Now
              </Button>
            </Link>
            <Link passHref href="/">
              <Button
                w="150px"
                h="50px"
                fontSize={[".8rem", "unset"]}
                borderRadius="0px"
                bgColor="white"
              >
                Download App
              </Button>
            </Link>
          </HStack>
        </Box>
      </VStack>
      <Stack
        w="90%"
        mx="auto"
        py={["2rem", "5rem"]}
        direction={["column-reverse", "row"]}
        spacing="10"
        align="center"
      >
        <Box>
          <Image src="assets/aboutus.png" w="full" alt="about us" />
        </Box>
        <Box w={{ base: "full", lg: "60%" }} textAlign={["center", "unset"]}>
          <Text
            fontWeight="600"
            color="brand.100"
            fontSize={["1rem", "1.2rem"]}
          >
            About Us
          </Text>
          <Heading fontWeight="700" fontSize={["1.3rem", "1.8rem"]}>
            We provide the best studio <br /> rental for you
          </Heading>
          <Box fontSize={[".85rem", "1.15rem"]}>
            <Text mt="5">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo.
            </Text>
            <Text mt="10">
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia consequuntur magni dolores eos qui ratione
              voluptatem sequi nesciunt.
            </Text>
          </Box>
        </Box>
      </Stack>
      <Box w="90%" mx="auto">
        <Box textAlign="center">
          <Text
            fontWeight="600"
            color="brand.100"
            fontSize={["1rem", "1.2rem"]}
          >
            Categories
          </Text>
          <Heading fontWeight="700" mb="2" fontSize={["1.3rem", "1.8rem"]}>
            Find the best studio rental for your occassion
          </Heading>
        </Box>
        <Stack
          minH="600px"
          direction={["column", "row"]}
          align="center"
          justify="space-evenly"
        >
          <Box>
            <Image
              w="full"
              h={["auto", "520px"]}
              src="assets/homepage-musicstudio.png"
              alt="music studio"
            />
          </Box>
          <Box textAlign={["center", "unset"]}>
            <Heading fontWeight="700" fontSize={["1.3rem", "1.8rem"]}>
              Music Studios
            </Heading>
            <Text my="5" fontSize={["0.85rem", "1.15rem"]}>
              Sed ut perspiciatis unde omnis iste natus error sit <br />
              voluptatem accusantium totam rem quia.
            </Text>
            <BookNowLink
              path={`category/${
                category?.find((x) => x.name?.toLowerCase() == "music")?.id
              }`}
            />
          </Box>
        </Stack>
        <Stack
          minH="600px"
          direction={["column-reverse", "row"]}
          align="center"
          justify="space-evenly"
        >
          <Box textAlign={["center", "unset"]}>
            <Heading fontWeight="700" fontSize={["1.3rem", "1.8rem"]}>
              Photo Studios
            </Heading>
            <Text my="5" fontSize={["0.85rem", "1.15rem"]}>
              Nemo enim ipsam voluptatem quia <br /> voluptas sit aspernatur aut
              odit aut fugit sed quia.
            </Text>
            <BookNowLink
              path={`category/${category?.find((x) => x.name == "PHOTO")?.id}`}
            />
          </Box>
          <Box>
            <Image
              w="full"
              h={["auto", "520px"]}
              src="assets/homepage-photostudio.png"
              alt="categories"
            />
          </Box>
        </Stack>
        <Stack
          minH="600px"
          direction={["column", "row"]}
          align="center"
          justify="space-evenly"
        >
          <Box>
            <Image
              w="full"
              h={["auto", "520px"]}
              src="assets/homepage-makeupstudio.png"
              alt="categories"
            />
          </Box>
          <Box textAlign={["center", "unset"]}>
            <Heading fontWeight="700" fontSize={["1.3rem", "1.8rem"]}>
              Make Up Studios
            </Heading>
            <Text my="5" fontSize={["0.85rem", "1.15rem"]}>
              Sed ut perspiciatis unde omnis iste natus error sit <br />
              voluptatem accusantium totam rem quia.
            </Text>
            <BookNowLink
              path={`category/${category?.find((x) => x.name == "MAKEUP")?.id}`}
            />
          </Box>
        </Stack>
      </Box>
      <Box w="90%" mx="auto" my={["3", "10"]}>
        <HStack align="center" justify="space-between">
          <Heading fontSize={["1.3rem", "2.3rem"]}>
            Explore Studios For You
          </Heading>
          <Link passHref href="/all-studios">
            <Text
              color="brand.100"
              fontWeight="500"
              textDecor="underline"
              cursor="pointer"
            >
              View All Studios
            </Text>
          </Link>
        </HStack>
        <SimpleGrid
          mt={["5", "10"]}
          columns={{ base: 3, lg: 4 }}
          spacing={["3", "6"]}
        >
          <ExploreStudioCard
            img="/pixel2.png"
            path={`category/${category?.find((x) => x.name == "Music")?.id}`}
            text="Music Studios"
          />
          <ExploreStudioCard
            display={{ base: "none", lg: "flex" }}
            img="assets/homepage-hero.png"
            path={`category/${category?.find((x) => x.name == "Music")?.id}`}
            text="Podcast Studios"
          />
          <ExploreStudioCard
            img="/pixel5.png"
            path={`category/${category?.find((x) => x.name == "MAKEUP")?.id}`}
            text="Make Up Studios"
          />
          <ExploreStudioCard
            img="/pixel4.png"
            path={`category/${category?.find((x) => x.name == "PHOTO")?.id}`}
            text="Photo Studios"
          />
        </SimpleGrid>
      </Box>
      <Box w="90%" mx="auto" mt={["10", "20"]} mb="10">
        <HStack align="center" justify="space-between">
          <Heading fontSize={["1.3rem", "2.3rem"]}>Popular Services</Heading>
          <Link passHref href="/all-services">
            <Text
              color="brand.100"
              fontWeight="500"
              textDecor="underline"
              cursor="pointer"
            >
              View All Services
            </Text>
          </Link>
        </HStack>
        <SimpleGrid mt={["5", "10"]} columns={[2, 3]} spacing={["3", "6"]}>
          {popularStudios?.value?.map((service, index) => (
            <PopularStudioCard key={index} service={service} />
          ))}
        </SimpleGrid>
      </Box>
      <Box w="90%" mx="auto" mt={["10", "20"]} mb="10">
        <HStack align="center" justify="space-between">
          <Heading fontSize={["1.3rem", "2.3rem"]}>Studios Near You</Heading>
          <Link passHref href={`/all-services/${location?.city}`}>
            <Text
              color="brand.100"
              fontWeight="500"
              textDecor="underline"
              cursor="pointer"
            >
              You are currently in: {location?.city} {location?.country}
            </Text>
          </Link>
        </HStack>
        <SimpleGrid mt={["5", "10"]} columns={[2, 3]} spacing={["3", "6"]}>
          {studiosNearMe?.value?.map((service, index) => (
            <PopularStudioCard key={index} service={service} />
          ))}
        </SimpleGrid>
      </Box>
      <Box w="90%" mx="auto" id="how-it-works" py="10">
        <Heading
          textAlign="center"
          fontSize={["1.2rem", "2.2rem"]}
          color="brand.100"
        >
          How StudioMart Works
        </Heading>
        <SimpleGrid columns={[1, 3]} mt="16" spacing={["10", "16"]}>
          <Box>
            <Box>
              <Image src="assets/01.png" alt="one" />
            </Box>
            <Text mt="-6" zIndex="2" fontSize="1.2rem" fontWeight="600">
              Discover Studios
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
              Request Studiotime
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
              Book & Confirm
            </Text>
            <Text fontSize={[".9rem", "1rem"]} lineHeight={["taller", "unset"]}>
              Discover Studios near you Nemo enim ipsam voluptatem quia voluptas
              sit aspernatur aut odit aut fugit, sed quia consequuntur magni
              dolores.s
            </Text>
          </Box>
        </SimpleGrid>
        <Box textAlign={["start", "center"]} my="10">
          <Link passHref href="/all-services">
            <Button
              h="12"
              fontSize={[".9rem", "1rem"]}
              bg="brand.100"
              color="white"
              px="10"
            >
              Book Now
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
              src="assets/mobileapp.png"
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
    </Box>
  );
};

export default HomePage;
