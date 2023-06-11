import {
  Box,
  VStack,
  Text,
  Button,
  Heading,
  SimpleGrid,
  Grid,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BackToPage, NotFound } from "ui";
import PopularStudioCard from "@components/Home/PopularStudioCard";
import { IStudios } from "src/models/schema";
import { useRouter } from "next/router";

const SavedStudiosComponent = ({ savedStudios, studioForYou }: IStudios) => {
  // console.log({ savedStudios });
  return (
    <Box mx="auto" py="1rem" bgColor="gray.100">
      <Box w="90%" mx="auto">
        <BackToPage name="Back to the homepage" />
      </Box>
      {(savedStudios?.size as number) > 0 ? (
        <Box w="90%" mx="auto">
          <Grid
            templateColumns={["repeat(1,1fr)", "repeat(3,1fr)"]}
            w="full"
            my="3rem"
            gap="2rem"
          >
            {savedStudios?.value?.map((service, index) => (
              <Box key={index}>
                <PopularStudioCard
                  service={service.service}
                  isSaved
                  id={service.id}
                />
              </Box>
            ))}
          </Grid>
        </Box>
      ) : (
        <NotFound />
      )}
      <Box w="90%" mx="auto" mb="3rem">
        <Heading>Studios for you</Heading>
        <Box>
          <SimpleGrid mt={["5", "10"]} columns={[1, 3]} spacing={["3", "6"]}>
            {studioForYou?.value?.map((service, index) => (
              <PopularStudioCard key={index} service={service} />
            ))}
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
};

export default SavedStudiosComponent;
