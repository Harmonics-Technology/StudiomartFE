import {
  Box,
  Button,
  Circle,
  Flex,
  Icon,
  Text,
  useDisclosure,
  Image,
  Grid,
  VStack,
  HStack,
  Avatar,
} from "@chakra-ui/react";
import { UserContext } from "@components/Context/UserContext";
import { DeleteStudioModal } from "@components/Modals/DeleteStudioModal";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { IoChevronBackCircle } from "react-icons/io5";
import { StudioView } from "src/services";
import { InfoBox } from "ui";
import NoSSR from "react-no-ssr";
import dynamic from "next/dynamic";
import { DummyImage, useDummyImage } from "react-simple-placeholder-image";

interface StudioProps {
  singleStudio: StudioView;
}

export const SingleStudioPage = ({ singleStudio }: StudioProps) => {
  const { userStudios, user, setCurrentStudioId, currentStudioId } =
    useContext(UserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: open, onOpen: opens, onClose: closed } = useDisclosure();
  const router = useRouter();

  return (
    <Box mb="3rem">
      <Box bgColor="white">
        <Flex
          justify="space-between"
          align="center"
          w="100%"
          mx="auto"
          py="1.5rem"
          px="2rem"
        >
          <Box fontFamily="BR Firma">
            <Text
              fontSize={{ base: "1rem", md: "1.5rem" }}
              fontWeight="600"
              mb=".2rem"
            >
              {
                userStudios?.filter((x: any) => x.id == currentStudioId)[0]
                  ?.name
              }
            </Text>
          </Box>
          <HStack gap=".5rem">
            <Button
              variant="outline"
              color="red"
              borderColor="red"
              minW={{ base: "4rem", md: "8rem" }}
              onClick={onOpen}
            >
              Delete
            </Button>
            <Button
              bgColor="brand.100"
              color="white"
              minW={{ base: "4rem", md: "8rem" }}
              onClick={() => router.push("/studio/edit")}
            >
              Edit
            </Button>
          </HStack>
        </Flex>
      </Box>
      <Box>
        <Button
          bgColor="transparent"
          onClick={() => router.back()}
          m="1rem 1rem"
        >
          <Icon as={IoChevronBackCircle} mr=".3rem" />
          <Text mb="0">Back</Text>
        </Button>
        <Box
          mx="auto"
          w="95%"
          my=".5rem"
          p="3rem"
          borderRadius="30px"
          bgColor="white"
          boxShadow="sm"
        >
          <Box mb="1.5rem">
            <Flex
              justify="center"
              align="center"
              h="15rem"
              w="full"
              borderRadius="10px"
              // overflow="hidden"
              bgColor="gray.300"
              // border="1px solid"
              borderColor="gray.400"
              pos="relative"
            >
              <NoSSR>
                {singleStudio?.coverPhoto ? (
                  <Image
                    src={singleStudio?.coverPhoto as string}
                    alt="Banner Image"
                    w="full"
                    h="full"
                    objectFit="cover"
                  />
                ) : (
                  <DummyImage />
                )}
              </NoSSR>

              <Circle
                size="8rem"
                overflow="hidden"
                border="3px solid gray"
                mx="auto"
                pos="absolute"
                top="60%"
                left="50%"
                bgColor="brand.100"
                transform="translateX(-50%)"
              >
                <Avatar
                  src={singleStudio?.logo as string}
                  name={singleStudio?.name as string}
                  size="2xl"
                  objectFit="cover"
                />
              </Circle>
            </Flex>
          </Box>

          <Grid
            gap="1.5rem"
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
            w="full"
            m="4rem 0 1rem"
          >
            <Box>
              <VStack gap="1rem" align="flex-start">
                <InfoBox title={"Studio Name"} desc={singleStudio?.name} />
                <InfoBox
                  title={"Studio Description"}
                  desc={singleStudio?.description}
                  des
                />
                <InfoBox
                  title={"Studio Address"}
                  desc={singleStudio?.address}
                />
                <InfoBox title={"Website"} desc={singleStudio?.website} />
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
            <Box>
              <VStack gap="1rem" align="flex-start">
                <InfoBox title={"Country"} desc={singleStudio?.country} />
                <Grid
                  gap="1.5rem"
                  templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]}
                  w="full"
                >
                  <InfoBox title={"State"} desc={singleStudio?.state} />
                  <InfoBox title={"City"} desc={singleStudio?.city} />
                </Grid>
                <InfoBox title={"Email Address"} desc={singleStudio?.email} />
                <Grid
                  gap="1.5rem"
                  templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]}
                  w="full"
                >
                  <InfoBox title={"Phone no"} desc={singleStudio?.phone} />
                  <InfoBox title={"Postal code"} desc={singleStudio?.zipCode} />
                </Grid>
                <Grid
                  gap="1.5rem"
                  templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]}
                  w="full"
                >
                  <InfoBox title={"Facebook"} desc={singleStudio?.facebook} />
                  <InfoBox title={"Twitter"} desc={singleStudio?.twitter} />
                </Grid>
              </VStack>
            </Box>
          </Grid>
        </Box>
      </Box>
      <DeleteStudioModal
        isOpen={isOpen}
        onClose={onClose}
        id={currentStudioId}
      />
    </Box>
  );
};
