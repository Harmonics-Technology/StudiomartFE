import { Box, Center, HStack, Image, Text, Button } from "@chakra-ui/react";
import React from "react";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
import { IPopularStudios } from "src/models/schema";
import { Naira } from "ui";
import { Rating, Star } from "@smastrom/react-rating";
import NoSSR from "react-no-ssr";
import { DummyImage } from "react-simple-placeholder-image";

const PopularStudioCard = ({ service }: IPopularStudios) => {
  const myStyles = {
    itemShapes: Star,
    activeFillColor: "#facc15",
    inactiveStrokeColor: "#facc15",
    itemStrokeWidth: 2,
    activeStrokeColor: "transparent",
  };
  // console.log({ service });
  return (
    <Box role="group">
      <Box
        h={["180px", "380px"]}
        w="full"
        rounded="2xl"
        overflow="hidden"
        pos="relative"
      >
        <NoSSR>
          {service?.bannerImageURL ? (
            <Image
              h="full"
              objectFit="cover"
              src={service.bannerImageURL as string}
              alt=""
            />
          ) : (
            <DummyImage />
          )}
        </NoSSR>

        <Box
          position="absolute"
          // rounded="2xl"
          top="0"
          w="full"
          h="full"
          overflow="hidden"
          transition="all .5s ease"
          _groupHover={{ bgColor: "blackAlpha.600" }}
        >
          <Center h="100%">
            <Link href={`/customer/details/${service?.id}`}>
              <Button
                display="none"
                bgColor="white"
                color="brand.100"
                fontSize={[".8rem", "1rem"]}
                px={["5", "8"]}
                h={["8", "12"]}
                _groupHover={{ display: "block" }}
              >
                Book Now
              </Button>
            </Link>
          </Center>
        </Box>
      </Box>
      <HStack align="baseline" justify="space-between" fontWeight="600">
        <Text fontSize={[".7rem", "1.3rem"]} noOfLines={1}>
          {service?.name}
        </Text>
        <Text fontSize={[".7rem", "1rem"]}>
          {`${Naira(service?.price as number)}.00`}
          {/* <Text
            color="#808080"
            fontWeight="normal"
            fontSize={["5px", "initial"]}
            as="span"
          >
            per hour
          </Text> */}
        </Text>
      </HStack>
      <HStack align="center" mt="-5" justify="space-between">
        <Text
          color="#808080"
          noOfLines={1}
          fontSize={[".7rem", "14px"]}
          mt={["2", "0"]}
          mb="0"
        >
          {service?.studio?.city} {service?.studio?.state}
        </Text>
        <HStack
          spacing={["1", "unset"]}
          align="center"
          fontSize={[".7rem", "13px"]}
          gap=".5rem"
        >
          <Rating
            style={{ maxWidth: 100 }}
            value={4 as number}
            readOnly
            itemStyles={myStyles}
          />

          <Text color="#808080" as="span" mb="0" fontSize={["8px", "13px"]}>
            4 star
          </Text>
        </HStack>
      </HStack>
    </Box>
  );
};

export default PopularStudioCard;
