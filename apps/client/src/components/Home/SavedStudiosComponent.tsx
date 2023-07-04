import {
  Box,
  VStack,
  Text,
  Button,
  Heading,
  SimpleGrid,
  Grid,
  Flex,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BackToPage, getCityAndState, NotFound, Pagination } from "ui";
import PopularStudioCard from "@components/Home/PopularStudioCard";
import { IStudios } from "src/models/schema";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { StudioService } from "src/services";

const SavedStudiosComponent = ({ savedStudios, studioForYou }: IStudios) => {
  // console.log({ savedStudios });
  const [locas, setLocas] = useState<any>(null);
  const [studiosNearMe, setStudiosstudiosNearMe] = useState<any>(null);
  // console.log({ locas });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    } else {
      toast.error("Geolocation is not supported by your browser");
    }
  }, []);

  const handleSuccess = (position: any) => {
    const { latitude, longitude } = position.coords;
    getCityAndState(latitude, longitude)
      .then(async (result) => {
        setLocas(result);
        const studiosNearMe = await StudioService.listServices({
          offset: 0,
          limit: 6,
          state: result?.city,
        });
        setStudiosstudiosNearMe(studiosNearMe.data);
      })
      .catch((error) => {
        console.error("Error getting city and state:", error);
      });
    setLocas({ latitude, longitude });
  };
  const handleError = (error: any) => {
    toast.error(error.message as string);
  };
  return (
    <Box mx="auto" py="1rem" bgColor="gray.100">
      <Box w="90%" mx="auto">
        <BackToPage name="Back to the homepage" />
        <Heading mt="3rem">Saved Studio</Heading>
      </Box>
      <Box w="90%" m="3rem auto">
        {(savedStudios?.size as number) > 0 ? (
          <Box>
            <SimpleGrid mt={["5", "10"]} columns={[2, 3]} spacing={["3", "6"]}>
              {savedStudios?.value?.map((service, index) => (
                <PopularStudioCard
                  service={service.service}
                  id={service.id}
                  isSaved
                  key={index}
                />
              ))}
            </SimpleGrid>
            <Flex justify="center" my="3rem">
              <Pagination data={savedStudios} />
            </Flex>
          </Box>
        ) : (
          <NotFound />
        )}
      </Box>
      <Box w="90%" mx="auto" mb="3rem">
        <Heading>Studios for you</Heading>
        <Box>
          {studiosNearMe?.value.length == 0 ? (
            <NotFound />
          ) : (
            <SimpleGrid mt={["5", "10"]} columns={[2, 3]} spacing={["3", "6"]}>
              {studiosNearMe?.value?.map((service: any, index: number) => (
                <PopularStudioCard
                  key={index}
                  service={service}
                  isSaved={service.isSaved}
                />
              ))}
            </SimpleGrid>
          )}
          <Flex justify="center" my="3rem">
            <Pagination data={studioForYou} />
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default SavedStudiosComponent;
