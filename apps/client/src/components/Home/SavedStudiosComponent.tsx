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
import React, { useState } from "react";
import { BackToPage, NotFound, Pagination } from "ui";
import PopularStudioCard from "@components/Home/PopularStudioCard";
import { ImSad2 } from "react-icons/im";
import { IStudios } from "src/models/schema";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { StudioService } from "src/services";

const SavedStudiosComponent = ({ savedStudios, studioForYou }: IStudios) => {
  const router = useRouter();
  const [loading, setLoading] = useState<any>({ status: false, id: "" });

  const removeSaved = async (id: string) => {
    setLoading({ status: true, id });
    try {
      const result = await StudioService.removeSavedService({
        id,
      });
      if (result.status) {
        setLoading({ status: false });
        toast.success("Item Deleted", { className: "loginToast" });
        router.reload();
        return;
      }
      setLoading({ status: false });
      toast.error(result.message as string, { className: "loginToast" });
    } catch (err: any) {
      setLoading({ status: false });
      toast.error(err?.body?.message || err?.message, {
        className: "loginToast",
      });
    }
  };
  return (
    <Box mx="auto" py="1rem" bgColor="gray.100">
      <Box w="90%" mx="auto">
        <BackToPage name="Back to the homepage" />
        <Heading mt="3rem">Saved Studio</Heading>
      </Box>
      {(savedStudios?.size as number) > 0 ? (
        <Box w="90%" mx="auto">
          <Grid
            templateColumns={["repeat(3,1fr)"]}
            w="full"
            my="3rem"
            gap="2rem"
          >
            {savedStudios?.value?.map((service, index) => (
              <Box key={index}>
                <PopularStudioCard
                  service={service.service}
                  isSaved
                  del={() => removeSaved(service.id as string)}
                  loading={loading}
                  id={service.id}
                />
                <Flex justify="center" my="3rem">
                  <Pagination data={savedStudios} />
                </Flex>
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
          <SimpleGrid mt={["5", "10"]} columns={[2, 3]} spacing={["3", "6"]}>
            {studioForYou?.value?.map((service, index) => (
              <PopularStudioCard key={index} service={service} />
            ))}
          </SimpleGrid>
          <Flex justify="center" my="3rem">
            <Pagination data={studioForYou} />
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default SavedStudiosComponent;
