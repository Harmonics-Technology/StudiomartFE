import {
  Heading,
  SimpleGrid,
  Box,
  Circle,
  HStack,
  Icon,
  Flex,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
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
  const [slider, setSlider] = useState<Slider | null>(null);
  return (
    <Box w="full" mx="auto" my="3rem">
      {(data?.length as any) > 0 && (
        <Box pos="relative">
          <HStack justify="space-between" mb="2rem" w='98%'>
            <Heading>Recently Viewed</Heading>
            <HStack>
              <Circle
                onClick={() => slider?.slickPrev()}
                size="24px"
                color="white"
                bgColor="gray.600"
                cursor="pointer"
              >
                <Icon as={BsArrowLeftShort} />
              </Circle>
              <Circle
                onClick={() => slider?.slickNext()}
                size="24px"
                color="white"
                bgColor="gray.600"
                cursor="pointer"
              >
                <Icon as={BsArrowRightShort} />
              </Circle>
            </HStack>
          </HStack>
          <Box>
            <Slider {...sliderSettings} ref={(slider) => setSlider(slider)}>
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
