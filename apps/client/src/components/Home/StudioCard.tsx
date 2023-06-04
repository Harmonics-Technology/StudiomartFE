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
} from "@chakra-ui/react";
import Link from "next/link";
import { IPopularStudios, IStudios } from "src/models/schema";
import { getReviewSummary, Naira, Rating } from "ui";
import NoSSR from "react-no-ssr";
import { DummyImage, useDummyImage } from "react-simple-placeholder-image";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRouter } from "next/router";

const StudiCard = ({ service }: IStudios) => {
  const image = useDummyImage({});
  const router = useRouter();
  return (
    <Box
      minH="14rem"
      w="full"
      bg="white"
      borderRadius="10px"
      overflow="hidden"
      boxShadow="md"
    >
      <Image
        src={(service?.coverPhoto as string) || image}
        alt="Banner Image"
        h="14rem "
        w="100%"
        objectFit="cover"
        bgColor="white"
      />

      <Box h="fit-content" w="100%" textAlign="left" p="1rem 1rem 1.5rem">
        <Text fontWeight="600" fontSize="20px" mb=".5rem">
          {service?.name}
        </Text>
        <Text fontSize="15px" fontWeight="400" noOfLines={3} minH="5rem">
          {service?.description}
        </Text>

        <Button
          onClick={() => router.push(`/all-studios/${service?.id}`)}
          w="100%"
          variant="outline"
          cursor="pointer"
          border="1px solid"
          borderColor="brand.100"
          color="brand.100"
          // onClick={() => deactivateService(x.id)}
        >
          View Studio
        </Button>
      </Box>
    </Box>
  );
};

export default StudiCard;
