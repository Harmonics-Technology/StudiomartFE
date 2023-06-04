import { Flex, SimpleGrid, Box, Text, HStack } from "@chakra-ui/react";
import React from "react";
import { BiMessageRoundedError } from "react-icons/bi";
import { FiFilter } from "react-icons/fi";
import { ServiceView } from "src/services";
import { BackToPage, NotFound, Pagination } from "ui";
import StudiCard from "./StudioCard";

const AllStudios = ({ allService }: any) => {
  return (
    <Box w="90%" mx="auto" mb="5rem">
      <Flex justify="space-between" px="1rem" my="1rem">
        <Box w="100%" mx="auto" py="1rem" pb="7">
          <BackToPage name="Back to the homepage" />
        </Box>
      </Flex>
      <Box
        px="20px"
        fontSize="22px"
        fontWeight="700"
        textTransform="capitalize"
      >
        Viewing All Studios
      </Box>

      <Box>
        {allService?.value?.length == 0 ? (
          <NotFound />
        ) : (
          <SimpleGrid mt={["5", "10"]} columns={[2, 3]} spacing={["3", "6"]}>
            {allService?.value?.map((service: ServiceView) => (
              <StudiCard key={service.id} service={service} />
            ))}
          </SimpleGrid>
        )}
      </Box>
      <HStack justifyContent="center" mt="3rem">
        <Pagination data={allService} />
      </HStack>
    </Box>
  );
};

export default AllStudios;
