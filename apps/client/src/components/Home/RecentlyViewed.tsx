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
import { Carousel } from "react-responsive-carousel";
import { RecentlyViewedView } from "src/services";

const PopularStudioCard = dynamic(() => import("./PopularStudioCard"), {
  ssr: false,
});

export const RecentlyViewed = ({
  data,
}: {
  data: RecentlyViewedView[] | undefined;
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const next = () => {
    setCurrentSlide(currentSlide + 1);
  };
  const prev = () => {
    setCurrentSlide(currentSlide - 1);
  };
  const updateCurrentSlide = (index: number) => {
    if (currentSlide !== index) {
      setCurrentSlide(index);
    }
  };
  return (
    <Box w="full" mx="auto" my="3rem">
      {(data?.length as any) > 0 && (
        <>
          <HStack justify="space-between" mb="2rem">
            <Heading>Recently Viewed</Heading>
            <HStack cursor="pointer">
              <Circle
                onClick={prev}
                size="24px"
                color="white"
                bgColor="gray.600"
              >
                <Icon as={BsArrowLeftShort} />
              </Circle>
              <Circle
                onClick={next}
                size="24px"
                color="white"
                bgColor="gray.600"
              >
                <Icon as={BsArrowRightShort} />
              </Circle>
            </HStack>
          </HStack>
          <Box>
            <Carousel
              showStatus={false}
              autoPlay={false}
              showArrows={false}
              showIndicators={false}
              showThumbs={false}
              swipeable
              selectedItem={currentSlide}
              onChange={updateCurrentSlide}
              centerMode
              centerSlidePercentage={35}
              // {...data}
            >
              {data?.map((x, index) => (
                <Box key={index} w="90%">
                  <PopularStudioCard key={index} service={x.service} />
                </Box>
              ))}
            </Carousel>
          </Box>
        </>
      )}
    </Box>
  );
};
