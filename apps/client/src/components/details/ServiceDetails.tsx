import {
  Box,
  Button,
  Checkbox,
  Grid,
  HStack,
  Icon,
  Image,
  List,
  ListItem,
  SimpleGrid,
  Square,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react";
import { BsBookmarkHeart, BsCheck2, BsChevronLeft } from "react-icons/bs";
import { useDummyImage } from "react-simple-placeholder-image";
import Slider from "react-slick";
import { ReviewView, ServiceView, StudioService } from "src/services";
import { Cur, CustomCheckbox, Rating } from "ui";
import parse from "html-react-parser";
import { ServiceInfos } from "@components/Home/ServiceInfos";
import { RatingInfo } from "@components/Home/RatingInfo";
import { ReviewsBox } from "@components/Home/ReviewsBox";
import PopularStudioCard from "@components/Home/PopularStudioCard";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const ServiceDetails = ({
  service,
  reviews,
  studios,
}: {
  service: ServiceView;
  reviews: any;
  studios: any;
}) => {
  console.log({ service });
  const settings = {
    dots: true,
    className: "service-slick",
    infinite: true,
    speed: 500,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    dotsClass: "slick-dots",
  };
  const image = useDummyImage({
    width: 1280,
    height: 550,
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const saveServiceForLater = async () => {
    setLoading(true);
    try {
      const result = await StudioService.saveService({
        studioId: service?.id,
      });
      if (result.status) {
        setLoading(false);
        toast.success("Added to wishlist", { className: "loginToast" });
        return;
      }
      setLoading(false);
      toast.error(result.message as string, { className: "loginToast" });
    } catch (err: any) {
      setLoading(false);
      toast.error(err?.body?.message || err?.message, {
        className: "loginToast",
      });
    }
  };
  return (
    <Box w="90%" mx="auto">
      <HStack mt="3rem">
        <Icon as={BsChevronLeft} />
        <Text mb="0" textTransform="capitalize">
          {service?.serviceType?.name?.toLowerCase()}/{service?.name}
        </Text>
      </HStack>
      <Box my="3rem">
        <Text
          fontSize={["1rem", "24px"]}
          noOfLines={1}
          color="#171717"
          fontWeight="600"
          fontFamily="BR Firma"
          mb="0"
        >
          {service?.name}
        </Text>
        <HStack my=".8rem">
          <Text color="#1f1f1f" as="span" mb="0" fontSize="16px">
            Studio
          </Text>
          <Link passHref href={`/all-studios/${service?.studio?.id}`}>
            <Text mb="0" color="brand.100" cursor="pointer">
              {service?.studio?.name} | Similar services by{" "}
              {service?.studio?.name}
            </Text>
          </Link>
        </HStack>
        <HStack align="center" fontSize={[".7rem", "13px"]}>
          <Text color="#Afafaf" as="span" mb="0" fontSize="12px">
            {service?.averageRating || 0} Star
          </Text>
          <Rating value={service?.averageRating || 0} />
          <Text
            color="#808080"
            as="span"
            mb="0"
            fontSize="12px"
            fontWeight="500"
          >
            ({service?.totalReviewCount || 0})
          </Text>
        </HStack>
      </Box>

      <Box w="full" h="550px" overflow="hidden">
        {(service?.media as any)?.length > 0 ? (
          <Slider {...settings}>
            {service?.media?.map((x) => (
              <Box w="full" h="550px" overflow="hidden" key={x.id}>
                <Image
                  w="full"
                  h="full"
                  objectFit="cover"
                  alt={x.url as string}
                  src={x.url as string}
                />
              </Box>
            ))}
          </Slider>
        ) : (
          <Image src={image} alt="cover" h="full" w="full" />
        )}
      </Box>

      <Text
        fontSize={["1rem", "24px"]}
        noOfLines={1}
        color="#171717"
        fontWeight="600"
        fontFamily="BR Firma"
        m="7rem 0 3rem"
      >
        About this service
      </Text>
      <Text fontSize="18px" lineHeight="27px" color="#3d3d3d">
        {parse((service?.description as string) || "")}
      </Text>

      <Box my="6rem">
        <Text
          fontSize={["1rem", "24px"]}
          noOfLines={1}
          color="#171717"
          fontWeight="600"
          fontFamily="BR Firma"
          mb="0"
        >
          Service Details
        </Text>
        <Text fontSize="16px" lineHeight="27px" color="#3d3d3d">
          Here are the specifics of this service from Lensboy photography.
        </Text>
        <Box mt="3rem">
          <HStack spacing={0} gap={"3rem"}>
            <ServiceInfos
              title="Studio Capacity"
              value={service?.studio?.studioCapacity}
            />
            <ServiceInfos title="Location" value={"Studio or Outdoor"} />
            <ServiceInfos
              title="Pricing"
              value={`${Cur(service?.price as number)} NGN`}
            />
          </HStack>
        </Box>
      </Box>
      <HStack my="4rem">
        <Text
          fontSize={["1rem", "24px"]}
          noOfLines={1}
          color="#171717"
          fontWeight="600"
          fontFamily="BR Firma"
          mb="0"
        >
          Additional services:
        </Text>
        <Text
          fontSize="16px"
          lineHeight="27px"
          color="#3d3d3d"
          mb="0"
          fontFamily="BR Firma"
        >
          Indicate the additional services you need by clicking the checkbox
        </Text>
      </HStack>
      <Grid
        templateColumns={{ base: "repeat(1fr)", lg: "repeat(2, 1fr)" }}
        w="60%"
        gap="5rem"
        mb="4rem"
      >
        {service?.additionalServices?.map((x) => (
          <HStack key={x.id} align="center">
            <CustomCheckbox />
            <Text fontSize="18px" color="#3d3d3d" mb="0">
              {x.name}
              {" - "}
              <span style={{ fontWeight: "500" }}>
                {Cur(x.price as number)} NGN
              </span>
            </Text>
          </HStack>
        ))}
      </Grid>
      <HStack w="60%" spacing={0} gap="3rem">
        <Button
          bgColor="brand.100"
          color="white"
          fontSize="18px"
          h="58px"
          w="full"
          onClick={() =>
            router.push(`/customer/schedule-session/${service?.id}`)
          }
          _hover={{
            backgroundColor: "transparent",
            color: "brand.100",
            border: "2px solid #1570FA",
          }}
          _focus={{
            outline: "none",
          }}
        >
          Book Now
        </Button>
        <Button
          variant="outline"
          border="1px solid"
          borderColor="brand.100"
          color="brand.100"
          fontSize="18px"
          h="58px"
          w="full"
          isLoading={loading}
          _hover={{
            backgroundColor: "brand.100",
            color: "white",
          }}
          _focus={{
            outline: "none",
          }}
          onClick={
            service?.isSaved
              ? () => router.push("/customer/saved-studios")
              : saveServiceForLater
          }
        >
          <Icon as={BsBookmarkHeart} mr="1rem" />
          {service?.isSaved ? "View Saved Studios" : "Save for later"}
        </Button>
      </HStack>

      <Box my="8rem">
        <Text
          fontSize={["1rem", "24px"]}
          noOfLines={1}
          color="#171717"
          fontWeight="600"
          fontFamily="BR Firma"
          mb="2rem"
        >
          Reviews
        </Text>
        <HStack gap="2rem" spacing={0}>
          <Square
            bgColor="#f3f2f1"
            borderRadius="4px"
            size="158px"
            alignItems="center"
          >
            <VStack>
              <Text color="#facc15" fontWeight="500" fontSize="2rem" mb="0">
                {service?.averageRating}/5
              </Text>
              <Rating value={service?.averageRating} />
              <Text color="#3d3d3d" fontWeight="500" fontSize="1rem">
                {service?.totalReviewCount} ratings
              </Text>
            </VStack>
          </Square>
          <VStack align="flex-start" w="40%">
            <RatingInfo
              num="5"
              count={service?.reviewCounts?.fiveStar}
              total={service?.totalReviewCount}
            />
            <RatingInfo
              num="4"
              count={service?.reviewCounts?.fourStar}
              total={service?.totalReviewCount}
            />
            <RatingInfo
              num="3"
              count={service?.reviewCounts?.threeStar}
              total={service?.totalReviewCount}
            />
            <RatingInfo
              num="2"
              count={service?.reviewCounts?.twoStar}
              total={service?.totalReviewCount}
            />
            <RatingInfo
              num="1"
              count={service?.reviewCounts?.onsStar}
              total={service?.totalReviewCount}
            />
          </VStack>
        </HStack>
        <Box my="4rem" w="80%">
          <VStack w="full" align="flex-start">
            {reviews?.value?.length == 0 ? (
              <Text>No Reviews yet!!!</Text>
            ) : (
              <>
                {reviews?.value?.map((review: ReviewView, i: number) => (
                  <ReviewsBox key={i} review={review} />
                ))}
              </>
            )}
          </VStack>
        </Box>
      </Box>
      {studios?.value?.length > 0 && (
        <Box mb="8rem">
          <HStack
            align={{ base: "flex-start", lg: "center" }}
            justify="space-between"
            flexDir={{ base: "column", lg: "row" }}
            spacing="0"
          >
            <Text
              fontSize={["1rem", "24px"]}
              noOfLines={1}
              color="#171717"
              fontWeight="600"
              fontFamily="BR Firma"
              mb="3rem"
            >
              More Services by {service?.studio?.name}
            </Text>
            <Link passHref href={`/all-studios/${service?.studio?.id}`}>
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
          <SimpleGrid mt={["5", "10"]} columns={[2, 3]} spacing={["3", "6"]}>
            {studios?.value?.map((service: any, index: any) => (
              <PopularStudioCard key={index} service={service} />
            ))}
          </SimpleGrid>
        </Box>
      )}
    </Box>
  );
};

export default ServiceDetails;
