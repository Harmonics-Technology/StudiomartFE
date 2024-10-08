import {
  Box,
  Flex,
  Grid,
  HStack,
  Icon,
  Square,
  Text,
  Image,
  VStack,
  Button,
  Input,
} from "@chakra-ui/react";
import VoucherCoupon from "@components/utils/VoucherCoupon";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineCalendar } from "react-icons/ai";
import { BsCheck2 } from "react-icons/bs";
import { FaPersonBooth } from "react-icons/fa";
import { GiBeastEye, GiEdgedShield, GiEyeShield } from "react-icons/gi";
import { useDummyImage } from "react-simple-placeholder-image";
import Slider from "react-slick";
import { BeatLoader } from "react-spinners";
import { ICustomerHome } from "src/models/schema";
import {
  AdditionalServiceView,
  BookingModel,
  BookingService,
} from "src/services";
import { CustomCheckbox, Cur, Rating, Naira, CalculatePercent } from "ui";

const NewBookingSummary = ({ singleService, id, addons }: ICustomerHome) => {
  const router = useRouter();
  const { date } = router.query;
  const { time } = router.query;
  const [selectedAddon, setSelectedAddon] =
    useState<AdditionalServiceView[]>(addons);
  const [loading, setLoading] = useState(false);

  const addToArray = (data: AdditionalServiceView) => {
    const exist = selectedAddon.find((x: any) => x.id == data.id);
    if (exist) {
      setSelectedAddon(selectedAddon.filter((x: any) => x.id !== data.id));
      return;
    }
    setSelectedAddon([...selectedAddon, data]);
  };

  const newTime = (time as string)?.split(" ");

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    className: "service-slick",
  };
  const image = useDummyImage({});

  const amount =
    selectedAddon?.reduce((a, b) => a + (b.price as number), 0) +
    (singleService?.price as number);
  const tax = (amount / 100) * 7.5;
  const grandTotal = amount + tax;
  const [couponInput, setCouponInput] = useState<any>();
  const [couponError, setCouponError] = useState<any>();
  const [isLoading, setIsLoading] = useState<any>();
  const [couponApplied, setCouponApplied] = useState<any>();
  const [viewers, setViewers] = useState<any>();

  const applyVoucher = () => {
    VoucherCoupon({
      setCouponError,
      setCouponApplied,
      setIsLoading,
      couponInput,
    });
  };

  const voucherAdded =
    couponApplied?.type == "percent"
      ? (grandTotal / 100) * couponApplied?.discount
      : grandTotal - couponApplied?.discount;
  const couponGrandTotal =
    voucherAdded > couponApplied?.maxDiscount
      ? grandTotal - couponApplied?.maxDiscount
      : grandTotal - voucherAdded;

  const CreateBooking = async () => {
    const data: BookingModel = {
      date: date as string,
      inputTime: {
        hour: Number(newTime[0]),
        minute: Number(newTime[1]),
      },
      serviceId: id,
      additionalServices: selectedAddon.map((x) => x.id as string),
      voucherId: couponApplied.id,
    };
    setLoading(true);
    try {
      const result = await BookingService.createBooking({ requestBody: data });
      console.log({ result });
      if (result.status) {
        setLoading(false);
        toast.success(result.message as string);
        Cookies.remove("addons");
        router.push(`/customer/history`);
        return;
      }
      setLoading(false);
      toast.error(result.message as string);
      return;
    } catch (error: any) {
      setLoading(false);
      toast.error(error?.body?.message || error?.message, {
        className: "loginToast",
      });
    }
  };

  useEffect(() => {
    setViewers(Math.floor(Math.random() * 20) + 1);
  }, []);

  return (
    <Box w={{ base: "80%", lg: "80%" }} m="3rem auto 5rem">
      <HStack flexDir={{ base: "column", lg: "row" }} gap="4rem">
        <Box w={{ base: "full", lg: "70%" }}>
          <Text
            fontSize={["1.5rem", "2rem"]}
            fontFamily="BR Firma"
            fontWeight="700"
          >
            Review your booking
          </Text>

          <Flex
            border="1px solid"
            borderColor="#e5e5e5"
            borderRadius="4px"
            p={["1rem", "1.5rem 1rem"]}
            gap="1.5rem"
            my="2rem"
            align="center"
          >
            <Icon as={GiBeastEye} color="brand.100" />
            <Text mb="0">
              <span style={{ fontWeight: "600" }}>
                People are eyeing this service.
              </span>{" "}
              {viewers} others are looking at this time and date to book it.
            </Text>
          </Flex>

          <Text fontSize="1rem" fontFamily="BR Firma" fontWeight="700">
            1 Day in {singleService?.studio?.name}&apos;s studio
          </Text>
          <HStack my="2rem" gap="1rem">
            <Square bgColor="#D5E2F9" size="5rem" borderRadius="4px">
              <VStack>
                <Text fontWeight="700" fontSize=".9rem" color="#171717" mb="0">
                  {dayjs(date as string).format("MMM")}
                </Text>
                <Text fontWeight="700" fontSize=".9rem" color="#171717" mb="0">
                  {dayjs(date as string).format("DD")}
                </Text>
              </VStack>
            </Square>
            <VStack align="flex-start">
              <Text fontWeight="400" fontSize=".9rem" color="#171717" mb="0">
                {dayjs(date as string).format("dddd")} check-in
              </Text>
              <Text fontWeight="700" fontSize=".9rem" color="#171717" mb="0">
                {time}
              </Text>
            </VStack>
          </HStack>

          {(singleService?.additionalServices as any)?.length > 0 && (
            <Box
              borderTop="1px solid"
              borderColor="#e5e5e5"
              py="2rem"
              mb="0rem"
            >
              <Text fontSize="1rem" fontFamily="BR Firma" fontWeight="700">
                Additional Service
              </Text>
              <Grid
                templateColumns={{ base: "repeat(1fr)", lg: "repeat(2, 1fr)" }}
                w={{ base: "full", lg: "100%" }}
                gap={{ base: "2rem", lg: "2rem" }}
                mb={{ base: "0rem", lg: "0rem" }}
              >
                {singleService?.additionalServices?.map((x) => (
                  <HStack key={x.id} align="center">
                    <CustomCheckbox
                      onChange={() => addToArray(x)}
                      checked={selectedAddon.find((e) => e.id == x.id)}
                    />
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
            </Box>
          )}
          <HStack
            borderY="1px solid"
            borderColor="#e5e5e5"
            py="1rem"
            my="1rem"
            spacing="3rem"
          >
            <VStack align="flex-start">
              <Text
                fontSize="1rem"
                fontFamily="BR Firma"
                fontWeight="700"
                mb="0"
              >
                Cancellation policy
              </Text>
              <Text mb="0">
                Only bookings cancelled before the vendor accepts your booking
                gurantees a full refund.{" "}
                <Link href="/terms" passHref>
                  <span style={{ color: "#1570fa", cursor: "pointer" }}>
                    More details
                  </span>
                </Link>
              </Text>
            </VStack>
            <Icon as={GiEdgedShield} fontSize="3rem" color="brand.100" />
          </HStack>
        </Box>
        <Box
          border="1px solid"
          borderColor="#e5e5e5"
          p={{ base: "1rem", lg: "2rem" }}
          w={{ base: "full", lg: "40%" }}
        >
          <HStack justify="space-between">
            <VStack my="3rem" align="flex-start">
              <Text
                fontSize={["1rem", "20px"]}
                noOfLines={1}
                color="#171717"
                fontWeight="600"
                fontFamily="BR Firma"
                mb="0"
              >
                {singleService?.name}
              </Text>
              <Box>
                <Text mb="0" color="gray.600" cursor="pointer" fontSize=".9rem">
                  One day service in {singleService?.studio?.name}
                </Text>
                <HStack align="center" fontSize={[".7rem", "13px"]}>
                  <Rating value={singleService?.averageRating || 0} />
                  <Text
                    color="#333333"
                    as="span"
                    mb="0"
                    fontSize="12px"
                    fontWeight="500"
                  >
                    ({singleService?.totalReviewCount || 0}) reviews
                  </Text>
                </HStack>
              </Box>
            </VStack>
            <Square size={{ base: "4rem", lg: "6rem" }} overflow="hidden">
              {(singleService?.media as any)?.length > 0 ? (
                <Slider {...settings}>
                  {singleService?.media?.map((x) => (
                    <Box
                      w="full"
                      h={{ base: "4rem", lg: "6rem" }}
                      overflow="hidden"
                      key={x.id}
                    >
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
            </Square>
          </HStack>
          <VStack
            align="flex-start"
            borderY="1px solid"
            borderColor="#e5e5e5"
            py="1rem"
            my="1rem"
            spacing="1.5rem"
          >
            <HStack color="#171717">
              <Icon as={FaPersonBooth} />
              <Text mb="0">1 guest</Text>
            </HStack>
            <HStack color="#171717">
              <Icon as={AiOutlineCalendar} />
              <Text mb="0">
                {dayjs(date as string).format("MMM DD, YYYY")} - {time}
              </Text>
            </HStack>
          </VStack>
          <Box>
            <Text></Text>
            <HStack>
              <Input
                placeholder="Enter discount code"
                h="2.6rem"
                borderRadius="0"
                w="full"
                onChange={(e) => setCouponInput(e.target.value)}
                textTransform="uppercase"
                fontSize=".9rem"
              />
              <Button
                bgColor="black"
                color="white"
                borderRadius="0"
                h="2.6rem"
                px="2rem"
                onClick={() => applyVoucher()}
                isLoading={isLoading}
                spinner={<BeatLoader color="white" size={10} />}
              >
                {couponApplied?.valid ? <Icon as={BsCheck2} /> : "Apply Coupon"}
              </Button>
            </HStack>
            <Text fontSize=".8rem" color="red" w="100%" p=".2rem .5rem">
              {couponError}
            </Text>
          </Box>
          <VStack
            align="flex-start"
            borderBottom="1px solid"
            borderColor="#e5e5e5"
            py="1rem"
            my="1rem"
            spacing="1.5rem"
          >
            <HStack
              color="#1717171"
              justify="space-between"
              w="full"
              align="flex-start"
            >
              <Text mb="0">Service cost</Text>
              <Box>
                <Text mb="0">{Naira(singleService?.price as number)}</Text>
              </Box>
            </HStack>
            {selectedAddon?.map((x: AdditionalServiceView) => (
              <HStack
                color="#1717171"
                justify="space-between"
                key={x.id}
                w="full"
              >
                <Text mb="0">{x.name}</Text>
                <Text mb="0"> {Naira(x?.price as number)} </Text>
              </HStack>
            ))}
            <HStack color="#1717171" justify="space-between" w="full">
              <Text mb="0">Tax</Text>
              <Text mb="0">{Naira(tax)}</Text>
            </HStack>
          </VStack>
          <VStack
            borderBottom="1px solid"
            borderColor="#e5e5e5"
            py="1rem"
            my="1rem"
          >
            <HStack justify="space-between" w="full" align="flex-start">
              <Text
                fontSize="1.2rem"
                fontFamily="BR Firma"
                fontWeight="700"
                mb="0"
              >
                Total (NGN)
              </Text>
              <Box textAlign="right">
                <HStack justify="flex-end">
                  <Text
                    fontSize={couponApplied?.valid ? "1rem" : "1.2rem"}
                    fontFamily="BR Firma"
                    fontWeight={couponApplied?.valid ? "500" : "700"}
                    mb="0"
                    color={couponApplied?.valid ? "gray.300" : "black"}
                    textDecor={couponApplied?.valid ? "line-through" : "none"}
                  >
                    {Naira(grandTotal)}
                  </Text>
                  {couponApplied?.valid && (
                    <Text
                      fontSize="1.2rem"
                      fontFamily="BR Firma"
                      fontWeight="700"
                      mb="0"
                    >
                      {Naira(couponGrandTotal)}
                    </Text>
                  )}
                </HStack>
                {couponApplied?.valid && (
                  <Text fontSize=".8rem" fontWeight="700" color="green">
                    Coupon {couponInput} applied
                  </Text>
                )}
              </Box>
            </HStack>
          </VStack>

          <Flex mx="auto" w="full" mt="2rem">
            <Button
              bgColor="brand.100"
              color="white"
              w="full"
              h="3.5rem"
              px="2rem"
              _hover={{
                color: "brand.100",
                bgColor: "transparent",
                border: "2px solid #1570FA",
              }}
              variant="solid"
              borderRadius="0px"
              onClick={CreateBooking}
              isLoading={loading}
            >
              Proceed with booking
            </Button>
          </Flex>
        </Box>
      </HStack>
    </Box>
  );
};
export default NewBookingSummary;
