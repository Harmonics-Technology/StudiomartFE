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
import { BiMessageRoundedError } from "react-icons/bi";
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
import PopularStudioCard from "./PopularStudioCard";
import { RecentlyViewed } from "./RecentlyViewed";
import { GiMissileLauncher } from "react-icons/gi";
import { FaRegSadCry, FaSadCry } from "react-icons/fa";
import { useRouter } from "next/router";

const AllServices = ({ allService, recentlyViewed }: ICustomerHome) => {
  const [openFilter, setOpenFilter] = useState(false);
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  const router = useRouter();
  const { state } = router.query;
  return (
    <Box w="90%" mx="auto" mb="5rem">
      <Flex justify="space-between" px="1rem" my="1rem">
        <Box w="100%" mx="auto" py="1rem" pb="7">
          <BackToPage name="Back to the homepage" />
        </Box>
        <Box pos="relative">
          <Flex
            gap="10px"
            bg="brand.100"
            color="white"
            borderRadius="4px"
            h="2.5rem "
            px="3rem"
            align="center"
            cursor="pointer"
            onClick={() => setIsComponentVisible(true)}
          >
            <FiFilter /> Filters
          </Flex>
          {isComponentVisible && (
            <Box ref={ref}>
              <FilterBox setOpenFilter={setOpenFilter} />
            </Box>
          )}
        </Box>
      </Flex>
      <Box
        px="20px"
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
              <PopularStudioCard key={service.id} service={service} />
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