import {
  Flex,
  VStack,
  Heading,
  Button,
  Text,
  Circle,
  Icon,
  HStack,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React from "react";
import { BsCheckCircle } from "react-icons/bs";
import { MdDesignServices } from "react-icons/md";
import { HiOutlineReceiptPercent } from "react-icons/hi2";
import { BiCartAdd } from "react-icons/bi";
import { AdditionalServiceView } from "src/services";
import { Naira } from "ui";

export const Validate = ({ data }: any) => {
  console.log({ data });
  const router = useRouter();
  return (
    <Flex
      w="full"
      align="center"
      justify="center"
      // bgColor="brand.800"
      my="5rem"
    >
      <VStack w="40%" mx="auto">
        <Circle size="3rem">
          <Icon as={BsCheckCircle} fontSize="3rem" color="brand.100" />
        </Circle>
        <Heading fontSize="1.5rem">Thank you for your payment</Heading>

        <VStack
          w="full"
          boxShadow="md"
          p="2rem"
          align="flex-start"
          spacing="1rem"
        >
          <VStack w="full" align="flex-start">
            <Text mb="0" fontWeight="700">
              {data.user?.fullName}
            </Text>
            <Text mb="0" fontWeight="600">
              Invoice: {data.bookingReference}
            </Text>
            <Text mb="0" fontWeight="600">
              Date: {dayjs(data?.dateCreated).format("ddd DD MMM, YYYY")}
            </Text>
          </VStack>
          <VStack w="full">
            <HStack
              p="1rem"
              justify="space-between"
              borderTop="2px solid #e5e5e5"
              w="full"
            >
              <HStack>
                <Icon as={MdDesignServices} />
                <Text mb="0">{data.service?.name}</Text>
              </HStack>
              <Text mb="0">{Naira((data.service?.price as number) || 0)}</Text>
            </HStack>
            <>
              {data.additionalServices?.map((x: AdditionalServiceView) => (
                <HStack
                  p="1rem"
                  justify="space-between"
                  borderTop="2px solid #e5e5e5"
                  w="full"
                  key={x.id}
                >
                  <HStack>
                    <Icon as={BiCartAdd} />
                    <Text mb="0">{x?.name}</Text>
                  </HStack>
                  <Text mb="0">{Naira(x?.price as number)}</Text>
                </HStack>
              ))}
            </>
            <HStack
              p="1rem"
              justify="space-between"
              borderTop="2px solid #e5e5e5"
              w="full"
            >
              <HStack>
                <Icon as={HiOutlineReceiptPercent} />
                <Text mb="0">Tax</Text>
              </HStack>
              <Text mb="0">{Naira((data.tax as number) || 0)}</Text>
            </HStack>
            <HStack
              p="1rem"
              justify="flex-end"
              borderY="3px solid #e5e5e5"
              w="full"
            >
              <Text mb="0" fontWeight="700" fontSize="1.3rem">
                {Naira((data?.totalAmount as number) || 0)}
              </Text>
            </HStack>
          </VStack>
        </VStack>

        {/* <Button
          onClick={() => router.push("/customer/history")}
          bgColor="brand.100"
          color="white"
          px="3rem"
          h="3rem"
          mt="2rem !important"
        >
          Go back
        </Button> */}
      </VStack>
    </Flex>
  );
};
