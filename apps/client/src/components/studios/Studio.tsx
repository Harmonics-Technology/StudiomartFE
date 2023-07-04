import React from "react";
import {
  Box,
  Input,
  InputLeftElement,
  InputGroup,
  Text,
  Grid,
  Button,
  Image,
  HStack,
  SimpleGrid,
} from "@chakra-ui/react";
import { GlobalSearch } from "@components/Home/GlobalSearch";
import StudiCard from "@components/Home/StudioCard";
import { ServiceView } from "src/services";
import { NotFound, Pagination } from "ui";

const Studio = ({ allService }: any) => {
  return (
    <Box
      pb="12"
      w="90%"
      mx="auto"
      alignItems="center"
      justifyContent="center"
      h="100%"
      display="flex"
      flexDirection="column"
    >
      <Text
        fontWeight="700"
        mt="2rem"
        p="2rem"
        fontSize={["1.5rem", "2rem", "2.5rem", "2.75em"]}
        whiteSpace="nowrap"
        mb="0"
      >
        Explore Studios For You
      </Text>
      <Box w={["80%", "60%"]} mx="auto">
        <GlobalSearch />
      </Box>

      <Box>
        {allService?.value?.length == 0 ? (
          <NotFound />
        ) : (
          <SimpleGrid mt={["5", "10"]} columns={[2, 3]} spacing={["5", "6"]}>
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

export default Studio;
