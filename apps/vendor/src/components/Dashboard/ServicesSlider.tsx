import {
  Box, Button, Circle, HStack, Icon, Image, Text
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import { useDummyImage } from "react-simple-placeholder-image";
import Slider from "react-slick";
import { ServiceView } from "src/services";
import { sliderSettings } from "ui";

interface SliderProps {
  data: ServiceView[] | null | undefined;
}

export const ServiceSlider = ({ data }: SliderProps) => {
  const router = useRouter();
  const image = useDummyImage({});
  const [slider, setSlider] = useState<Slider | null>(null);
  return (
    <Box w={{ base: "94%", md: "full" }} mx="auto">
      <HStack justify="space-between" w="98%">
        <HStack
          align="center"
          fontFamily="BR Firma"
          pl={{ base: "1rem", md: ".5rem" }}
          fontWeight="600"
          my="2rem"
          fontSize={{ base: "14px", md: "20px" }}
        >
          <Text mb="0" fontFamily="inherit">
            Services
          </Text>
          <Text
            color="brand.100"
            mb="0"
            fontSize={{ base: "12px", md: "16px" }}
            cursor="pointer"
            fontFamily="inherit"
            onClick={() => router.push("/services")}
          >
            view all
          </Text>
        </HStack>
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

      <Slider {...sliderSettings} ref={(slider) => setSlider(slider)}>
        {data?.map((x: ServiceView, i: any) => (
          <Box
            minH={{ base: "8rem", md: "14rem" }}
            // w={{ base: 'full', md: '23rem' }}
            bg="white"
            borderRadius="10px"
            key={i}
            mx=".5rem"
            overflow="hidden"
            boxShadow="0px 20px 26px rgba(186, 182, 182, 0.16)"
          >
            <Image
              src={x.bannerImageURL || image}
              alt="Banner Image"
              h={{ base: "10rem", md: "14rem" }}
              w="100%"
              objectFit="cover"
              bgColor="white"
            />

            <Box h="fit-content" w="100%" textAlign="left" p="1rem 1rem 1.5rem">
              <Text
                fontWeight="600"
                fontSize={{ base: "14px", md: "20px" }}
                mb=".5rem"
                fontFamily="BR Firma"
                noOfLines={1}
              >
                {x.name}
              </Text>
              <Text
                fontSize={{ base: "10px", md: "15px" }}
                fontWeight="400"
                fontFamily="BR Firma"
                noOfLines={3}
              >
                {x.description}
              </Text>

              <Button
                w="100%"
                onClick={() => router.push(`/services/${x.id}`)}
                fontFamily="BR Firma"
                h="2.8rem"
                variant="outline"
                borderColor="brand.100"
                color="brand.100"
              >
                View Service
              </Button>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};
