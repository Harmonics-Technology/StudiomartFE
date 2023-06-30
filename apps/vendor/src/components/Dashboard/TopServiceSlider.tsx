import {
  Box,
  Image,
  VStack,
  Text,
  HStack,
  Circle,
  Icon,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import NoSSR from "react-no-ssr";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { DummyImage, useDummyImage } from "react-simple-placeholder-image";
import Slider from "react-slick";
import { TopServiceView } from "src/services";
import { sliderSettings } from "ui";

interface SliderProps {
  data?: TopServiceView[] | undefined | null;
}

export const TopServiceSlider = ({ data }: SliderProps) => {
  function NextArrow(props: any) {
    const { onClick } = props;
    return (
      <Circle
        onClick={onClick}
        size="24px"
        color="white"
        bgColor="gray.600"
        cursor="pointer"
        pos="absolute"
        top="-15%"
        right="0%"
      >
        <Icon as={BsArrowRightShort} />
      </Circle>
    );
  }
  function PrevArrow(props: any) {
    const { onClick } = props;
    return (
      <Circle
        onClick={onClick}
        size="24px"
        color="white"
        bgColor="gray.600"
        cursor="pointer"
        pos="absolute"
        top="-15%"
        right={{ base: "10%", lg: "3%" }}
      >
        <Icon as={BsArrowLeftShort} />
      </Circle>
    );
  }
  const image = useDummyImage({});
  return (
    <Box w={{ base: "90%", md: "unset" }} mx="auto">
      <HStack justify="space-between">
        <Text
          fontFamily="BR Firma"
          fontSize={{ base: "14px", md: "20px" }}
          fontWeight="600"
        >
          Top Services
        </Text>
      </HStack>

      <Slider
        {...sliderSettings}
        prevArrow={<PrevArrow />}
        nextArrow={<NextArrow />}
      >
        {data?.map((x: TopServiceView, i: any) => (
          <Box
            w="9.6rem"
            h="9.6rem"
            bg="white"
            borderRadius="8px"
            key={i}
            // mx={{ base: ".6rem", md: ".4rem", lg: "unset" }}
          >
            <Image
              h={["6rem", "5rem"]}
              w="full"
              objectFit="cover"
              src={x?.service?.bannerImageURL || image}
              alt="image"
              overflow="hidden"
              borderRadius="8px 8px 0 0"
            />

            <VStack
              align="flex-start"
              justify="center"
              h="4.6rem"
              pl=".5rem"
              fontWeight="500"
              fontSize="16px"
              spacing={".2rem"}
            >
              <Text mb="0" fontWeight="600" fontFamily="BR Firma">
                {x.service?.name}
              </Text>
              <Text fontSize="14px" fontFamily="BR Firma">
                {x.orders} order(s)
              </Text>
            </VStack>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};
