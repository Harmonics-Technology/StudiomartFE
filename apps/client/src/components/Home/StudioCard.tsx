import {
  Box,
  Center,
  HStack,
  Image,
  Text,
  Button,
  Flex,
  Icon,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { IPopularStudios, IStudios } from "src/models/schema";
import { getReviewSummary, MenuDropdown, Naira, Rating } from "ui";
import NoSSR from "react-no-ssr";
import { DummyImage, useDummyImage } from "react-simple-placeholder-image";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRouter } from "next/router";

const StudiCard = ({ service }: IStudios) => {
  const image = useDummyImage({});
  const router = useRouter();
  return (
    <Box
      h="full"
      w="full"
      borderRadius="4px"
      border="1px solid #E8E8E8"
      overflow="hidden"
    >
      <Box
        overflow="hidden"
        h={{ base: "10rem", lg: "20rem" }}
        w="full"
        pos="relative"
      >
        <Image
          h="full"
          w="full"
          objectFit="cover"
          src={(service?.coverPhoto as string) || image}
          alt=""
          borderRadius={{ base: "8px", lg: "0" }}
        />
      </Box>

      <HStack
        align="center"
        justify="space-between"
        fontWeight="600"
        p={{ base: "1rem .5rem", lg: "1rem" }}
      >
        <VStack align="flex-start">
          <HStack align="flex-end">
            <Text
              fontSize={["1rem", "20px"]}
              noOfLines={1}
              color="#171717"
              fontWeight="500"
              fontFamily="BR Firma"
              mb="0"
              textTransform="capitalize"
            >
              {service?.name}
            </Text>
          </HStack>
          <Text
            color="#636363"
            noOfLines={1}
            fontSize={[".7rem", "16px"]}
            fontWeight="500"
            fontFamily="BR Firma"
            mb="0"
          >
            {service?.city}, {service?.state}
          </Text>
          <Text
            fontSize={{ base: ".8rem", lg: "1rem" }}
            fontWeight="700"
            color="#171717"
            mb="0"
          >
            Capacity: {service?.studioCapacity}
          </Text>
        </VStack>
        <MenuDropdown
          menus={[
            {
              label: "View Studio",
              id: 1,
              onclick: () => router.push(`/all-studios/${service?.id}`),
            },
            // {
            //   label: "Book Service",
            //   id: 2,
            //   onclick: () =>
            //     router.push(`/customer/schedule-session/${service?.id}`),
            // },
          ]}
        />
      </HStack>
    </Box>
  );
};

export default StudiCard;
