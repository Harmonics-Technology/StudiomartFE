import {
  Flex,
  Circle,
  Grid,
  VStack,
  Box,
  Image,
  Text,
  HStack,
} from "@chakra-ui/react";
import { InfoBox } from "@components/utils/InfoBox";
import React from "react";
import { DummyImage, useDummyImage } from "react-simple-placeholder-image";
import { ISingleStudioProps } from "src/models/schema";
import { Rating } from "ui";

const StudioInfo = ({ singleStudio }: ISingleStudioProps) => {
  const image = useDummyImage({});
  return (
    <Box w="90%" mx="auto" my="4rem">
      <Box>
        <Text
          fontSize={["1rem", "24px"]}
          noOfLines={1}
          color="#171717"
          fontWeight="600"
          fontFamily="BR Firma"
          mb="0"
        >
          {singleStudio?.name}
        </Text>
        <Text color="#Afafaf" as="span" mb="0" fontSize="16px">
          {singleStudio?.city}, {singleStudio?.state}
        </Text>
        {/* <HStack align="center" fontSize={[".7rem", "13px"]}>
          <Text color="#Afafaf" as="span" mb="0" fontSize="12px">
            {singleStudio?.averageRating || 0} Star
          </Text>
          <Rating value={singleStudio?.averageRating || 0} />
          <Text
            color="#808080"
            as="span"
            mb="0"
            fontSize="12px"
            fontWeight="500"
          >
            ({singleStudio?.totalReviewCount || 0})
          </Text>
        </HStack> */}
      </Box>
      <Flex
        mx="auto"
        py={["1rem", "1rem"]}
        direction={["column-reverse", "row"]}
        gap="4rem"
        align="center"
        justify="center"
        w={{ base: "full", lg: "full" }}
      >
        <Box w="full">
          <Text fontSize="18px" lineHeight="27px">
            {singleStudio?.description}
          </Text>
        </Box>
        <Box w="full">
          <Image
            src={singleStudio?.coverPhoto || image}
            alt="bannerImg"
            w="full"
            h="auto"
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default StudioInfo;
