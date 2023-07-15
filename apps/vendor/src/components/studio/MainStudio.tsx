import { Box, Button, Grid, Image, Text } from "@chakra-ui/react";
import { UserContext } from "@components/Context/UserContext";
import { useRouter } from "next/router";
import { useContext } from "react";
import NoSSR from "react-no-ssr";
import { DummyImage } from "react-simple-placeholder-image";
import {
  ServiceTypeViewListStandardResponse,
  ServiceView,
  ServiceViewPagedCollectionStandardResponse
} from "src/services";
import TopPage from "../../utils/TopPage";

interface StudioProps {
  studios: ServiceViewPagedCollectionStandardResponse;
  serviceTypes: ServiceTypeViewListStandardResponse;
}

export const MainStudio = ({ studios, serviceTypes }: StudioProps) => {
  const router = useRouter();
  const { user } = useContext(UserContext);

  return (
    <>
      <Box minH="82vh" mb="2.8rem">
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
          gap="2rem"
        >
          {studios?.data?.value?.map((x: ServiceView, i: any) => (
            <Box
              minH="14rem"
              w="full"
              bg="white"
              mb="1rem"
              mx={{ base: "0", md: "1rem" }}
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
                  fontSize={{ base: "12px", md: "15px" }}
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
