import {
  Flex,
  SimpleGrid,
  Box,
  Text,
  HStack,
  Circle,
  Icon,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FiFilter } from "react-icons/fi";
import { ICustomerHome } from "src/models/schema";
import { ServiceView } from "src/services";
import {
  BackToPage,
  NotFound,
  Pagination,
  Rating,
  useComponentVisible,
} from "ui";
import { FilterBox } from "./FilterBox";
import { RecentlyViewed } from "./RecentlyViewed";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const PopularStudioCard = dynamic(() => import("./PopularStudioCard"), {
  ssr: false,
});

const AllServices = ({ allService, recentlyViewed }: ICustomerHome) => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  const router = useRouter();
  const { state } = router.query;
  return (
    <Box w="90%" mx="auto" mb="5rem">
      <Flex
        justify="space-between"
        px={{ base: "0", lg: "1rem" }}
        my="1.5rem"
        align="center"
      >
        <Box w="100%" mx="auto">
          <BackToPage name="Back" />
        </Box>
        <Box pos="relative">
          <Flex
            gap="10px"
            bg="brand.100"
            color="white"
            borderRadius="4px"
            h="2.5rem "
            px={{ base: "1.5rem", lg: "3rem" }}
            align="center"
            cursor="pointer"
            onClick={() => setIsComponentVisible(!isComponentVisible)}
          >
            <FiFilter /> Filters
          </Flex>
          {isComponentVisible && (
            <Box ref={ref}>
              <FilterBox />
            </Box>
          )}
        </Box>
      </Flex>
      <Box
        px={{ base: "0", lg: "20px" }}
        fontSize="22px"
        fontWeight="700"
        textTransform="capitalize"
      >
        Viewing All Services {state && `That are in ${state}`}
      </Box>

      <Box>
        {allService?.value?.length == 0 ? (
          <NotFound />
        ) : (
          <SimpleGrid mt={["5", "10"]} columns={[2, 3]} spacing={["3", "6"]}>
            {allService?.value?.map((service: ServiceView) => (
              <PopularStudioCard
                key={service.id}
                service={service}
                isSaved={service.isSaved}
              />
            ))}
          </SimpleGrid>
        )}
      </Box>
      <HStack justifyContent="center" mt="3rem">
        <Pagination data={allService} />
      </HStack>

      <RecentlyViewed data={recentlyViewed} />
    </Box>
  );
};

export default AllServices;
