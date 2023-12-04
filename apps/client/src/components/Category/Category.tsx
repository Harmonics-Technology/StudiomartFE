import { Box, Flex, HStack, SimpleGrid } from "@chakra-ui/react";
import { FilterBox } from "@components/Home/FilterBox";
import PopularStudioCard from "@components/Home/PopularStudioCard";
import { RecentlyViewed } from "@components/Home/RecentlyViewed";
import { FiFilter } from "react-icons/fi";
import { ISingleCategory } from "src/models/schema";
import { BackToPage, NotFound, Pagination, useComponentVisible } from "ui";

const Category = ({
  singlecategory,
  categoryId,
  recentlyViewed,
  category,
}: ISingleCategory) => {
  //
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  return (
    <Box w="90%" mx="auto" mb="5rem">
      <Flex justify="space-between" px={{ base: "0", lg: "1rem" }} my="1rem">
        <Box w="100%" mx="auto" py="1rem" pb="7">
          <BackToPage name="Back" />
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
        px="20px"
        fontSize="22px"
        fontWeight="700"
        textTransform="capitalize"
      >
        {category?.find((x) => x.id == categoryId)?.name?.toLowerCase()} studio
      </Box>

      <Box>
        {singlecategory?.value?.length == 0 ? (
          <NotFound />
        ) : (
          <SimpleGrid mt={["5", "10"]} columns={[2, 3]} spacing={["3", "6"]}>
            {singlecategory?.value?.map((service, index) => (
              <PopularStudioCard key={index} service={service} isSaved={service?.isSaved} />
            ))}
          </SimpleGrid>
        )}
      </Box>
      <HStack justifyContent="center" mt="3rem">
        <Pagination data={singlecategory} />
      </HStack>

      <RecentlyViewed data={recentlyViewed} />
    </Box>
  );
};

export default Category;
