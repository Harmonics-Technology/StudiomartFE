import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { ICustomerHome } from "src/models/schema";
import {
  AdditionalServiceView,
  BookingModel,
  BookingService,
  TimeOnly,
} from "src/services";
import { BackToPage, Naira, Rating } from "ui";

const BookingSummary = ({ singleService, ratings, id }: ICustomerHome) => {
  // const [checked, setChecked] = useState(true);
  const router = useRouter();
  const { date } = router.query;
  const { time } = router.query;

  console.log({ time });
  const [selectedAddon, setSelectedAddon] = useState<AdditionalServiceView[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const utc = require("dayjs/plugin/utc");
  dayjs.extend(utc);

  const addToArray = (data: AdditionalServiceView) => {
    const exist = selectedAddon.find((x: any) => x.id == data.id);
    if (exist) {
      setSelectedAddon(selectedAddon.filter((x: any) => x.id !== data.id));
      return;
    }
    setSelectedAddon([...selectedAddon, data]);
  };

  const grandTotal =
    selectedAddon.reduce((a, b) => a + (b.price as number), 0) +
    (singleService?.price as number);

  const newTime = (time as string)?.split(" ");
  const CreateBooking = async () => {
    const data: BookingModel = {
      date: date as string,
      inputTime: {
        hour: Number(newTime[0]),
        minute: Number(newTime[1]),
      },
      serviceId: id,
      additionalServices: selectedAddon.map((x) => x.id as string),
    };
    setLoading(true);
    try {
      const result = await BookingService.createBooking({ requestBody: data });
      console.log({ result });
      if (result.status) {
        setLoading(false);
        toast.success(result.message as string);
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

  return (
    <Box minH="screen" pb="20" pt={["5", "20"]} mx="auto" w="90%">
      <BackToPage name="Back to studio details" />
      <Stack mt={["10", "14"]} direction={["column", "row"]} spacing="5">
        <Box w={["full", "60%"]}>
          <Box>
            <Heading fontSize={["1.2rem", "1.7rem"]} p="4" bgColor="brand.300">
              Studio detail
            </Heading>
            <VStack py={["6", "8"]} align="flex-start" spacing="2">
              <Text mb="0" fontWeight={700} fontSize={["1.1rem", "1.3rem"]}>
                {singleService?.name} - {Naira(singleService?.price as number)}{" "}
                NGN {""}
                <Text
                  fontSize={[".9rem", "1rem"]}
                  fontWeight={400}
                  color="#808080"
                  as="span"
                >
                  Per hour
                </Text>
              </Text>
              <Text color="#808080" fontSize={[".9rem", "1rem"]}>
                {singleService?.studio?.city}, {singleService?.studio?.state}
              </Text>
              <Rating />
            </VStack>
          </Box>
          <Box>
            <Heading fontSize={["1.2rem", "1.7rem"]} p="4" bgColor="brand.300">
              Date and time
            </Heading>
            <HStack align="center" py={["6", "8"]}>
              <Text fontWeight={600} fontSize={["1rem", "1.3rem"]} mb="0">
                {dayjs(date as string).format("ddd DD, MMMM, YYYY")}
              </Text>
              <Text fontWeight={400} mb="0">
                ({time})
              </Text>
            </HStack>
          </Box>
          <Box>
            <Heading fontSize={["1.2rem", "1.7rem"]} p="4" bgColor="brand.300">
              Additional services
            </Heading>
            <VStack align="flex-start" gap=".5rem">
              {singleService?.additionalServices?.map((x) => (
                <Checkbox
                  textTransform="capitalize"
                  key={x.id}
                  onChange={() => addToArray(x)}
                  checked={
                    selectedAddon.find(
                      (e) => e.id == x.id
                    ) as unknown as boolean
                  }
                >
                  {x.name} -{" "}
                  <span style={{ fontWeight: 600 }}>
                    {Naira(x.price as number)} NGN
                  </span>
                </Checkbox>
              ))}
            </VStack>
          </Box>
        </Box>
        <Box w={["full", "40%"]}>
          <Heading
            fontSize={["1.2rem", "1.7rem"]}
            py="6"
            color="brand.100"
            px="4"
            bgColor="brand.300"
          >
            Booking summary
          </Heading>
          <VStack
            align="flex-start"
            mt="1"
            bgColor="brand.300"
            px="4"
            py={["8"]}
            spacing="5"
            h="80%"
          >
            <HStack align="center" w="full" justify="space-between">
              <Text mb="0">Studio amount per hour:</Text>
              <Text fontSize={["1.1rem", "1.2rem"]} fontWeight={600}>
                {Naira(singleService?.price as number)} NGN
              </Text>
            </HStack>
            {selectedAddon?.map((x: AdditionalServiceView) => (
              <HStack
                align="center"
                w="full"
                justify="space-between"
                key={x.id}
              >
                <Text mb="0">Studio engineer:</Text>
                <Text fontSize={["1.1rem", "1.2rem"]} fontWeight={600}>
                  {Naira(x?.price as number)} NGN
                </Text>
              </HStack>
            ))}
            <HStack align="center" w="full" justify="space-between">
              <Text mb="0" fontSize={["1.1rem", "1.2rem"]} fontWeight={700}>
                Total
              </Text>
              <Text fontSize={["1.1rem", "1.2rem"]} fontWeight={700}>
                {Naira(grandTotal)} NGN
              </Text>
            </HStack>
            <HStack
              align="center"
              w="full"
              justify="center"
              pt={["10", "20"]}
              pb={["10", "initial"]}
            >
              <Button
                bgColor="brand.100"
                color="white"
                h="3.5rem"
                px="2rem"
                _hover={{
                  color: "brand.100",
                  bgColor: "transparent",
                  border: "2px solid #1570FA",
                }}
                variant="solid"
                borderRadius="4px"
                onClick={CreateBooking}
                isLoading={loading}
              >
                Create booking
              </Button>
            </HStack>
          </VStack>
        </Box>
      </Stack>
    </Box>
  );
};

export default BookingSummary;
