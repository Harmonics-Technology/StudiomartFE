import {
  Box,
  Image,
  VStack,
  Text,
  HStack,
  Circle,
  Icon,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
import NoSSR from 'react-no-ssr';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { DummyImage } from 'react-simple-placeholder-image';
import { TopServiceView } from 'src/services';

interface SliderProps {
  data?: TopServiceView[] | undefined | null;
}

export const TopServiceSlider = ({ data }: SliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  console.log({ data });
  const next = () => {
    setCurrentSlide(currentSlide + 1);
  };
  const prev = () => {
    setCurrentSlide(currentSlide - 1);
  };

  const updateCurrentSlide = (index: number) => {
    // const { currentSlide } = this.state;

    if (currentSlide !== index) {
      setCurrentSlide(index);
    }
  };

  return (
    <Box w={{ base: '90%', md: 'unset' }} mx="auto">
      <HStack justify="space-between">
        <Text
          fontFamily="BR Firma"
          fontSize={{ base: '10px', md: '20px' }}
          fontWeight="600"
        >
          Top Services
        </Text>
        <HStack cursor="pointer">
          <Circle onClick={prev} size="24px" color="white" bgColor="gray.600">
            <Icon as={BsArrowLeftShort} />
          </Circle>
          <Circle onClick={next} size="24px" color="white" bgColor="gray.600">
            <Icon as={BsArrowRightShort} />
          </Circle>
        </HStack>
      </HStack>

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
        centerSlidePercentage={40}
        // {...data}
      >
        {data?.map((x: TopServiceView, i: any) => (
          <Box
            w="9.6rem"
            h="9.6rem"
            bg="white"
            borderRadius="8px"
            key={i}
            mx={{ base: '.6rem', md: '.4rem', lg: 'unset' }}
          >
            <NoSSR>
              {x?.service?.bannerImageURL ? (
                <Image
                  h="5rem"
                  w="full"
                  objectFit="cover"
                  src={x?.service?.bannerImageURL as string}
                  alt="image"
                  overflow="hidden"
                  borderRadius="8px 8px 0 0"
                />
              ) : (
                <Box h="5rem" borderRadius="8px 8px 0 0" overflow="hidden">
                  <DummyImage />
                </Box>
              )}
            </NoSSR>

            <VStack
              align="flex-start"
              justify="center"
              h="4.6rem"
              pl=".5rem"
              fontWeight="500"
              fontSize="16px"
              spacing={'.2rem'}
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
      </Carousel>
    </Box>
  );
};
