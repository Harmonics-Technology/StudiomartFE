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
  Flex,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ExploreStudioCard from "./ExploreStudioCard";
import TextTransition, { presets } from "react-text-transition";
import { getCityAndState, NotFound, ProcedureCard } from "ui";
import { ICustomerHome } from "src/models/schema";
import dynamic from "next/dynamic";
import { StudioCategory } from "@components/utils/StudioCategory";
import Cookies from "js-cookie";
import { StudioService } from "src/services";
import { toast } from "react-hot-toast";

const PopularStudioCard = dynamic(
  () => import("@components/Home/PopularStudioCard"),
  {
    ssr: false,
  }
);

const studios = [
  "music studio",
  "makeup studio",
  "photo studio",
  "art studio",
  "podcast studio",
];

const HomePage = ({ popularStudios, category }: ICustomerHome) => {
  const [index, setIndex] = useState(0);

  // console.log({ popularStudios });

  const [locas, setLocas] = useState<any>(null);
  const [studiosNearMe, setStudiosstudiosNearMe] = useState<any>(null);
  // console.log({ locas });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    } else {
      toast.error("Geolocation is not supported by your browser");
    }
  }, []);

  const handleSuccess = (position: any) => {
    const { latitude, longitude } = position.coords;
    getCityAndState(latitude, longitude)
      .then(async (result) => {
        setLocas(result);
        const studiosNearMe = await StudioService.listServices({
          offset: 0,
          limit: 6,
          state: result?.city,
        });
        setStudiosstudiosNearMe(studiosNearMe.data);
      })
      .catch((error) => {
        console.error("Error getting city and state:", error);
      });
    setLocas({ latitude, longitude });
  };
  const handleError = (error: any) => {
    toast.error(error.message as string);
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
        align="flex-start"
      >
        <Box>
          <Image src="assets/aboutus.png" w="full" alt="about us" />
        </Box>
        <Box w={{ base: "full", lg: "60%" }}>
          <Text
            fontWeight="600"
            color="brand.100"
            fontSize={["1rem", "1.2rem"]}
            textAlign={["center", "unset"]}
          >
            About Us
          </Text>
          <Heading
            fontWeight="700"
            fontSize={["1.3rem", "1.8rem"]}
            fontFamily="BR Firma"
            textAlign={["center", "unset"]}
          >
            We provide the best studio rental for you
          </Heading>
          <Box
            fontSize={[".85rem", "1.15rem"]}
            lineHeight="32px"
            w={{ base: "100%", lg: "90%" }}
            textAlign="justify"
          >
            <Text mt="5">
              At StudioMart, we understand the challenges faced by individuals
              in reaching out to their target creative studios and getting
              desired service. That&apos;s why we&apos;ve created a convenient
              and user-friendly platform that allows customers to browse through
              listings, compare features, and make informed decisions based on
              their specific needs. With our intuitive search and filtering
              options, customers can easily discover studios that align with
              their requirements.
            </Text>
            <Text mt="10">
              At StudioMart, we value transparency, trust, and the spirit of
              collaboration; We strive to create a seamless experience for both
              studio owners and customers alike. Our platform promotes open
              communication between studio owners and customers, ensuring a
              smooth booking process and a positive experience for all parties
              involved. StudioMart is here to bridge the gap and create a
              thriving community of studio enthusiasts.
            </Text>
          </Box>
        </Box>
      </Stack>
      <Box w="90%" m="4rem auto 8rem">
        <Box textAlign="center">
          <Text
            fontWeight="600"
            color="brand.100"
            fontSize={["1rem", "1.2rem"]}
          >
            Categories
          </Text>
          <Heading
            fontWeight="700"
            mb="2"
            fontSize={["1.3rem", "1.8rem"]}
            fontFamily="BR Firma"
          >
            Find the best studio rental for your occassion
          </Heading>
        </Box>
        <VStack
          w={{ base: "full", lg: "80%" }}
          mx="auto"
          gap={{ base: "2rem", lg: "5rem" }}
        >
          <StudioCategory
            cat="music"
            category={category}
            content="Booking your dream studio is a breeze on our user-friendly
            platform. Embrace the convenience of online booking, where you
            can effortlessly browse through a curated selection of music
            studios, compare availability and prices, and secure your
            desired slot with just a few clicks."
            img="assets/homepage-musicstudio.png"
            title="Music Studios"
          />
          <StudioCategory
            cat="photo"
            category={category}
            content=" Capture your moments in style with our exclusive photo studio
            booking platform! From intimate portrait sessions to elaborate
            fashion shoots, we have the ideal studio to suit your needs.
            Discover the perfect space to unleash your creativity and bring
            your vision to life."
            img="assets/homepage-photostudio.png"
            title="Photo Studios"
            reverse
          />
          <StudioCategory
            cat="makeup"
            category={category}
            content="Say goodbye to endless phone calls and inquiries! Our
            user-friendly website allows you to browse through a variety of
            makeup studios, compare prices, and book your preferred
            appointment with just a few clicks. It's never been easier
            to secure your spot at the best makeup studio around your
            preferred location."
            img="assets/homepage-makeupstudio.png"
            title="Make Up Studios"
          />
        </VStack>
      </Box>
      <Box w="90%" mx="auto" my={["3", "10"]}>
        <HStack
          align={{ base: "flex-start", lg: "center" }}
          justify="space-between"
          flexDir={{ base: "column", lg: "row" }}
          spacing="0"
          mb={{ base: "1rem", lg: "4rem" }}
        >
          <Heading
            fontSize={{ base: "1.3rem", md: "2.3rem" }}
            fontFamily="BR Firma"
          >
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
          columns={{ base: 2, md: 4 }}
          spacing={["3", "6"]}
        >
          <ExploreStudioCard
            img="/pixel2.png"
            path={`category/${category?.find((x) => x.name == "Music")?.id}`}
            text="Music Studios"
          />
          <ExploreStudioCard
            img="assets/homepage-hero.png"
            path={`category/${category?.find((x) => x.name == "VIDEO")?.id}`}
            text="Video Studios"
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
      <Box w="90%" mx="auto" my={{ base: "2rem", lg: "10rem" }}>
        <HStack
          align={{ base: "flex-start", lg: "center" }}
          justify="space-between"
          flexDir={{ base: "column", lg: "row" }}
          spacing="0"
          mb={{ base: "1rem", lg: "4rem" }}
        >
          <Heading
            fontSize={{ base: "1.3rem", md: "2.3rem" }}
            fontFamily="BR Firma"
          >
            Popular Services
          </Heading>
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
        {(popularStudios?.value as any)?.length == 0 ? (
          <NotFound />
        ) : (
          <SimpleGrid mt={["5", "10"]} columns={[2, 3]} spacing={["3", "6"]}>
            {popularStudios?.value?.map((service, index) => (
              <PopularStudioCard
                key={index}
                service={service}
                isSaved={service.isSaved}
              />
            ))}
          </SimpleGrid>
        )}
      </Box>
      <Box w="90%" mx="auto" mt={["10", "20"]}>
        <HStack
          align={{ base: "flex-start", lg: "center" }}
          justify="space-between"
          flexDir={{ base: "column", lg: "row" }}
          spacing="0"
          mb={{ base: "1rem", lg: "4rem" }}
        >
          <Heading
            fontSize={{ base: "1.3rem", md: "2.3rem" }}
            fontFamily="BR Firma"
          >
            Studios Near You
          </Heading>
          <Link passHref href={`/all-services/${locas?.city}`}>
            <Text
              color="brand.100"
              fontWeight="500"
              textDecor="underline"
              cursor="pointer"
            >
              You are currently in: {locas?.city}, {locas?.country}
            </Text>
          </Link>
        </HStack>
        {studiosNearMe?.value.length == 0 ? (
          <NotFound />
        ) : (
          <SimpleGrid mt={["5", "10"]} columns={[2, 3]} spacing={["3", "6"]}>
            {studiosNearMe?.value?.map((service: any, index: number) => (
              <PopularStudioCard
                key={index}
                service={service}
                isSaved={service.isSaved}
              />
            ))}
          </SimpleGrid>
        )}
      </Box>
      <Box
        w="90%"
        mx="auto"
        id="how-it-works"
        py="10"
        my={{ base: "3rem", lg: "8rem" }}
      >
        <Heading
          textAlign="center"
          fontSize={["1.2rem", "2.2rem"]}
          color="brand.100"
          fontFamily="BR Firma"
        >
          How StudioMart Works
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
            title="View Studios"
            note="Search and view correct details of the studios you need."
          />
          <Image src="/line.png" alt="line" w="80px" />
          <ProcedureCard
            num="03"
            title="Contact Vendor"
            note="Contact vendors and book their services conveniently."
          />
        </Flex>

        <Box
          textAlign={["start", "center"]}
          my="10"
          mx="auto"
          w={{ base: "50%", lg: "30%" }}
        >
          <Link passHref href="/all-services">
            <Button
              h="4rem"
              fontSize={[".9rem", "1rem"]}
              bg="brand.100"
              color="white"
              px="10"
              w="full"
            >
              Book Now
            </Button>
          </Link>
        </Box>
      </Box>
      <Box bgColor="rgba(21, 112, 250, 0.08)" py="20">
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
              w={["200px", "auto"]}
              src="assets/mobileapp.png"
              alt="mobile app"
            />
          </Box>
          <VStack w="full" align={{ base: "center", lg: "flex-start" }}>
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
    </Box>
  );
};

export default HomePage;
