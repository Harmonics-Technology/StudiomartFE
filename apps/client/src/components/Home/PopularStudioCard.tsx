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
import { IPopularStudios } from "src/models/schema";
import { getReviewSummary, Naira, Rating } from "ui";
import NoSSR from "react-no-ssr";
import { DummyImage } from "react-simple-placeholder-image";
import { RiDeleteBin6Line } from "react-icons/ri";

const PopularStudioCard = ({
  service,
  isSaved,
  loading,
  del,
  id,
}: IPopularStudios) => {
  return (
    <Box role="group">
      <Box
        h={["180px", "380px"]}
        w="full"
        rounded="2xl"
        overflow="hidden"
        pos="relative"
      >
        <NoSSR>
          {service?.bannerImageURL ? (
            <Image
              h="full"
              objectFit="cover"
              src={service.bannerImageURL as string}
              alt=""
            />
          ) : (
            <DummyImage />
          )}
        </NoSSR>

        <Box
          position="absolute"
          // rounded="2xl"
          top="0"
          w="full"
          h="full"
          overflow="hidden"
          transition="all .5s ease"
          _groupHover={{ bgColor: "blackAlpha.600" }}
        >
          <Center h="100%">
            <Link href={`/customer/details/${service?.id}`}>
              <Button
                display="none"
                bgColor="white"
                color="brand.100"
                fontSize={[".8rem", "1rem"]}
                px={["5", "8"]}
                h={["8", "12"]}
                _groupHover={{ display: "block" }}
              >
                Book Now
              </Button>
            </Link>
          </Center>
        </Box>
        {isSaved && (
          <Flex
            pos="absolute"
            bottom="0"
            right="0"
            height="30%"
            w="30%"
            bgColor="brand.100"
            borderTopLeftRadius="90px"
            justify="center"
            align="center"
            color="white"
          >
            {loading.status && loading.id == id ? (
              <Spinner />
            ) : (
              <Icon
                as={RiDeleteBin6Line}
                fontSize="3rem"
                cursor="pointer"
                ml="1rem"
                pos="absolute"
                bottom="-50%"
                transition=".3s ease"
                onClick={del}
                _groupHover={{
                  bottom: "50%",
                  transform: "translateY(50%)",
                }}
              />
            )}
          </Flex>
        )}
      </Box>
      <HStack align="baseline" justify="space-between" fontWeight="600">
        <Text fontSize={[".7rem", "1.3rem"]} noOfLines={1}>
          {service?.name}
        </Text>
        <Text fontSize={[".7rem", "1rem"]}>
          {`${Naira(service?.price as number)}.00`}
          {/* <Text
            color="#808080"
            fontWeight="normal"
            fontSize={["5px", "initial"]}
            as="span"
          >
            per hour
          </Text> */}
        </Text>
      </HStack>
      <HStack align="center" mt="-5" justify="space-between">
        <Text
          color="#808080"
          noOfLines={1}
          fontSize={[".7rem", "14px"]}
          mt={["2", "0"]}
          mb="0"
        >
          {service?.studio?.city} {service?.studio?.state}
        </Text>
        <HStack
          spacing={["1", "unset"]}
          align="center"
          fontSize={[".7rem", "13px"]}
          gap=".5rem"
        >
          <Rating value={service?.averageRating || 0} />

          <Text color="#808080" as="span" mb="0" fontSize={["8px", "13px"]}>
            {service?.totalReviewCount || 0} Review
          </Text>
        </HStack>
      </HStack>
    </Box>
  );
};

export default PopularStudioCard;
