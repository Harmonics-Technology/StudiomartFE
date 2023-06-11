import {
  Heading,
  SimpleGrid,
  Box,
  Circle,
  HStack,
  Icon,
  Flex,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import Slider from "react-slick";
import { RecentlyViewedView } from "src/services";
import { sliderSettings } from "ui";
import PopularStudioCard from "./PopularStudioCard";

export const RecentlyViewed = ({
  data,
}: {
  data: RecentlyViewedView[] | undefined;
}) => {
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

  return (
    <Box w="full" mx="auto" my="3rem">
      {(data?.length as any) > 0 && (
        <Box pos="relative">
          <HStack justify="space-between" mb="2rem">
            <Heading>Recently Viewed</Heading>
          </HStack>
          <Box>
            <Slider
              {...sliderSettings}
              prevArrow={<PrevArrow />}
              nextArrow={<NextArrow />}
            >
              {data?.map((x, index) => (
                <Box key={index} w="100%">
                  <PopularStudioCard key={index} service={x.service} />
                </Box>
              ))}
            </Slider>
          </Box>
        </Box>
      )}
    </Box>
  );
};
