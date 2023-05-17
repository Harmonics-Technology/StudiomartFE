import {
  Box,
  Image,
  VStack,
  Text,
  HStack,
  Circle,
  Icon,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ServiceView } from "src/services";
import { useDummyImage } from "react-simple-placeholder-image";

interface SliderProps {
  data: ServiceView[] | null | undefined;
}

export const ServiceSlider = ({ data }: SliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const router = useRouter();
  // const image = useDummyImage({
  //   /* Config */
  // });
  const image = "";

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

  const deactivateService = (id: any) => {
    //
  };

  return (
    <Box>
      <HStack justify="space-between">
        <HStack
          align="center"
          fontFamily="BR Firma"
          fontSize="18px"
          pl=".5rem"
          fontWeight="600"
          my="2rem"
        >
          <Text mb="0" fontFamily="inherit">
            Services
          </Text>
          <Text
            color="brand.100"
            mb="0"
            fontSize="16px"
            cursor="pointer"
            fontFamily="inherit"
            onClick={() => router.push("/services")}
          >
            view all
          </Text>
        </HStack>
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
        centerSlidePercentage={35}
        // {...data}
      >
        {data?.map((x: ServiceView, i: any) => (
          <Box
            minH="14rem"
            w="23rem"
            bg="white"
            borderRadius="10px"
            key={i}
            overflow="hidden"
            boxShadow="0px 20px 26px rgba(186, 182, 182, 0.16)"
          >
            <Image
              h="14rem "
              w="100%"
              objectFit="cover"
              src={x.bannerImageURL || image}
              alt="image"
              bgColor="white"
            />
            <Box h="fit-content" w="100%" textAlign="left" p="1rem 1rem 1.5rem">
              <Text
                fontWeight="600"
                fontSize="20px"
                mb=".5rem"
                fontFamily="BR Firma"
              >
                {x.name}
              </Text>
              <Text fontSize="15px" fontWeight="400" fontFamily="BR Firma">
                {x.description}
              </Text>

              <Button
                w="100%"
                // bgColor="brand.100"
                // color="white"
                onClick={() => router.push(`/services/${x.id}`)}
                fontFamily="BR Firma"
                h="2.8rem"
                variant="outline"
                borderColor="brand.100"
                color="brand.100"
                // borderWidth='2px'
              >
                View Service
              </Button>
            </Box>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};
