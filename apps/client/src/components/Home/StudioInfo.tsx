import { Flex, Circle, Grid, VStack, Box, Image } from "@chakra-ui/react";
import { InfoBox } from "@components/utils/InfoBox";
import React from "react";
import { DummyImage, useDummyImage } from "react-simple-placeholder-image";
import { ISingleStudioProps } from "src/models/schema";

const StudioInfo = ({ singleStudio }: ISingleStudioProps) => {
  const image = useDummyImage({});
  return (
    <Box
      mx="auto"
      w="100%"
      py="1rem"
      px="1.5rem"
      borderRadius="30px"
      // bgColor="white"
      boxShadow="sm"
    >
      <Box mb="1.5rem">
        <Flex
          justify="center"
          align="center"
          h="8rem"
          w="full"
          borderRadius="10px"
          // overflow="hidden"
          bgColor="gray.300"
          // border="1px solid"
          borderColor="gray.400"
          pos="relative"
        >
          <Image
            src={(singleStudio?.coverPhoto as string) || image}
            alt="Banner Image"
            w="full"
            h="full"
            objectFit="cover"
          />

          <Circle
            size="5rem"
            overflow="hidden"
            border="3px solid gray"
            mx="auto"
            pos="absolute"
            top="60%"
            left="50%"
            bgColor="brand.100"
            transform="translateX(-50%)"
          >
            <Image
              src={(singleStudio?.logo as string) || image}
              alt="Banner Image"
              w="full"
              h="full"
              objectFit="cover"
            />
          </Circle>
        </Flex>
      </Box>

      <Grid
        gap="1.5rem"
        templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)"]}
        w="full"
        m="4rem 0 1rem"
        // color="white"
      >
        <Box>
          <VStack gap="0rem" align="flex-start">
            <InfoBox title={"Studio Name"} desc={singleStudio?.name} />
            <InfoBox
              title={"Studio Description"}
              desc={singleStudio?.description}
              des
            />
          </VStack>
        </Box>
        <Box>
          <VStack gap="1rem" align="flex-start">
            <Grid
              gap="1.5rem"
              templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]}
              w="full"
            >
              <InfoBox title={"Country"} desc={singleStudio?.country} />
              <InfoBox title={"Studio Address"} desc={"***********"} />
            </Grid>

            <Grid
              gap="1.5rem"
              templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]}
              w="full"
            >
              <InfoBox title={"State"} desc={singleStudio?.state} />
              <InfoBox title={"City"} desc={singleStudio?.city} />
            </Grid>
            {/* <InfoBox title={"Email Address"} desc={singleStudio?.email} /> */}
            {/* <Grid
              gap="1.5rem"
              templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]}
              w="full"
            >
              <InfoBox title={"Phone no"} desc={singleStudio?.phone} />
              <InfoBox title={"Postal code"} desc={singleStudio?.zipCode} />
            </Grid> */}
            <Grid
              gap="1.5rem"
              templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]}
              w="full"
              minW="0"
            >
              <InfoBox title={"Facebook"} desc={singleStudio?.facebook} />
              <InfoBox title={"Twitter"} desc={singleStudio?.twitter} />
            </Grid>

            <Grid
              gap="1.5rem"
              templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]}
              w="full"
            >
              <InfoBox title={"LinkedIn"} desc={singleStudio?.linkedIn} />
              <InfoBox title={"Youtube"} desc={singleStudio?.youTube} />
            </Grid>
          </VStack>
        </Box>
      </Grid>
    </Box>
  );
};

export default StudioInfo;
