import { SimpleGrid, HStack, Box } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { StudioService, StudioView } from "src/services";
import { GlobalSearch, Loader, NotFound, Pagination } from "ui";

const StudioCard = dynamic(() => import("pages/studio/StudioCard"), {
  ssr: false,
});

const AllStudios = ({ studios }: { studios: any }) => {
  const [allStudio, setAllStudio] = useState(studios);
  const [loading, setLoading] = useState(false);
  const deleteStudio = async (id: string) => {
    setLoading(true);
    try {
      const res = await StudioService.deleteStudio({ id });
      if (res.status) {
        setAllStudio(allStudio.filter((x: any) => x.id !== id));
        toast.success(res.message as string);
        setLoading(false);
      }
      toast.error(res.message as string);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast(error?.body?.message || error?.message);
    }
  };
  return (
    <Box
      pos="relative"
      bgColor="white"
      py="3rem"
      h={loading ? "90vh" : "auto"}
      overflow="hidden"
    >
      {loading && <Loader src="/stdd.gif" />}
      <Box w={["80%", "60%"]} mx="auto">
        <GlobalSearch url="/studio/service" />
      </Box>
      <Box w="95%" mx="auto">
        {allStudio?.value?.length == 0 ? (
          <NotFound />
        ) : (
          <SimpleGrid mt={["5", "10"]} columns={[2, 3]} spacing={["5", "6"]}>
            {allStudio?.value?.map((studio: StudioView) => (
              <StudioCard
                key={studio.id}
                studio={studio}
                deleteStudio={deleteStudio}
              />
            ))}
          </SimpleGrid>
        )}
      </Box>
      <HStack justifyContent="center" mt="3rem">
        <Pagination data={studios} />
      </HStack>
    </Box>
  );
};

export default AllStudios;
