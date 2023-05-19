import { Box, Text, Image, Button, Grid } from "@chakra-ui/react";
import React, { useContext } from "react";
import { useRouter } from "next/router";
import { UserContext } from "@components/Context/UserContext";
import TopPage from "../../utils/TopPage";
import {
  ServiceTypeViewListStandardResponse,
  ServiceView,
  ServiceViewPagedCollectionStandardResponse,
} from "src/services";
import { DummyImage } from "react-simple-placeholder-image";
import NoSSR from "react-no-ssr";

interface StudioProps {
  studios: ServiceViewPagedCollectionStandardResponse;
  serviceTypes: ServiceTypeViewListStandardResponse;
}

export const MainStudio = ({ studios, serviceTypes }: StudioProps) => {
  console.log({ studios });
  const router = useRouter();
  const { user } = useContext(UserContext);

  return (
    <>
      <Box>
        <Box>
          <TopPage
            page={`${user?.lastName}!`}
            details={"Welcome to your dashboard"}
            right={true}
            serviceTypes={serviceTypes}
          />
        </Box>
        <Grid
          px="2rem"
          my="2rem"
          templateColumns={["repeat(1,1fr)", "repeat(3,1fr)"]}
        >
          {studios?.data?.value?.map((x: ServiceView, i: any) => (
            <Box
              minH="14rem"
              w="23rem"
              bg="white"
              borderRadius="10px"
              key={i}
              overflow="hidden"
              // boxShadow="md"
            >
              <NoSSR>
                {x.bannerImageURL ? (
                  <Image
                    src={x.bannerImageURL as string}
                    alt="Banner Image"
                    h="14rem "
                    w="100%"
                    objectFit="cover"
                    bgColor="white"
                  />
                ) : (
                  <Box h="14rem">
                    <DummyImage />
                  </Box>
                )}
              </NoSSR>
              <Box
                h="fit-content"
                w="100%"
                textAlign="left"
                p="1rem 1rem 1.5rem"
              >
                <Text fontWeight="600" fontSize="20px" mb=".5rem">
                  {x.name}
                </Text>
                <Text fontSize="15px" fontWeight="400" noOfLines={3}>
                  {x.description}
                </Text>

                <Button
                  onClick={() => router.push(`/services/${x.id}`)}
                  w="100%"
                  variant="outline"
                  cursor="pointer"
                  border="1px solid"
                  borderColor="brand.100"
                  color="brand.100"
                  // onClick={() => deactivateService(x.id)}
                >
                  View Service
                </Button>
              </Box>
            </Box>
          ))}
        </Grid>
      </Box>
    </>
  );
};
