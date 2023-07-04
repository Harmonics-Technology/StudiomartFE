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
import { DummyImage, useDummyImage } from "react-simple-placeholder-image";
import Slider from "react-slick";
import { TopServiceView } from "src/services";
import { sliderSettings } from "ui";

interface SliderProps {
  data?: TopServiceView[] | undefined | null;
}

export const TopServiceSlider = ({ data }: SliderProps) => {
  const image = useDummyImage({});

  const [slider, setSlider] = useState<Slider | null>(null);
  return (
    <Box w={{ base: "90%", md: "unset" }} mx="auto">
      <HStack justify="space-between" w="98%">
        <Text
          fontFamily="BR Firma"
          fontSize={{ base: "14px", md: "20px" }}
          fontWeight="600"
        >
          Top Services
        </Text>
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

      <Box w="full">
        <Slider {...sliderSettings} ref={(slider) => setSlider(slider)}>
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
                <Text
                  mb="0"
                  fontWeight="600"
                  fontFamily="BR Firma"
                  noOfLines={1}
                >
                  {x.service?.name}
                </Text>
                <Text fontSize="14px" fontFamily="BR Firma" noOfLines={1}>
                  {x.orders} order(s)
                </Text>
              </VStack>
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};
