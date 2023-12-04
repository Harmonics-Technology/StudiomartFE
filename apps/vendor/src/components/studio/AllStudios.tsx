import {
  SimpleGrid,
  HStack,
  Box,
  Input,
  Text,
  Button,
  Icon,
  VStack,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import StudioList from "pages/studio/StudioList";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { BsCheck2, BsGrid3X3Gap, BsListUl } from "react-icons/bs";
import { StudioService, StudioView } from "src/services";
import { GlobalSearch, Loader, NotFound, Pagination, SearchInput } from "ui";
import { useDebouncedCallback } from "use-debounce";

const StudioCard = dynamic(() => import("pages/studio/StudioCard"), {
  ssr: false,
});

const AllStudios = ({ studios }: { studios: any }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [pageView, setPageView] = useState(Cookies.get("view") || "grid");
  const pageLimit = router.query.limit;
  const [limit, setLimt] = useState(Number(pageLimit) || 9);
  const deleteStudio = async (id: string) => {
    setLoading(true);
    try {
      const res = await StudioService.deleteStudio({ id });
      if (res.status) {
        router.reload();
        toast.success(res.message as string);
        setLoading(false);
        return
      }
      toast.error(res.message as string);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast(error?.body?.message || error?.message);
    }
  };

  const searchFn = useDebouncedCallback(
    (value) => {
      router.push({ query: { search: value } });
    },
    // delay in ms
    500
  );
  const limitFn = () => {
    router.push({ query: { limit: limit } });
  };

  const changeView = (id: string) => {
    Cookies.set("view", id);
    setPageView(id);
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
        {/* <GlobalSearch url="/studio/service" urlb="/services" /> */}
        <SearchInput searchFn={searchFn} border="1px solid #e5e5e5" />
      </Box>
      <HStack justify="space-between" mt="2rem" w="95%" mx="auto">
        <HStack align="center" spacing={0}>
          <Text mb="0" fontWeight="500" pr=".5rem">
            Showing {`${limit} of ${studios?.size}`}:
          </Text>
          <Input
            onChange={(e) => setLimt(Number(e.target.value))}
            border="1px solid"
            borderColor="gray.300"
            borderRadius="0"
            w="100px"
            value={limit}
          />
          <Button
            bgColor="brand.100"
            color="white"
            borderRadius="0"
            onClick={limitFn}
          >
            {/* <Icon as={BsCheck2} /> */}
            Go
          </Button>
        </HStack>
        <HStack align="center" spacing={0}>
          {[
            { id: "grid", icon: BsGrid3X3Gap },
            { id: "list", icon: BsListUl },
          ].map((x) => (
            <Button
              key={x.id}
              bgColor={pageView == x.id ? "brand.100" : "gray.300"}
              color={pageView == x.id ? "white" : "gray.500"}
              borderRadius="0"
              onClick={() => changeView(x.id)}
            >
              <Icon as={x.icon} />
            </Button>
          ))}
        </HStack>
      </HStack>
      <Box w="95%" mx="auto">
        {studios?.value?.length == 0 ? (
          <NotFound />
        ) : (
          <>
            {pageView == "grid" ? (
              <SimpleGrid
                mt={["5", "10"]}
                columns={[2, 3]}
                spacing={["5", "6"]}
              >
                {studios?.value?.map((studio: StudioView) => (
                  <StudioCard
                    key={studio.id}
                    studio={studio}
                    deleteStudio={deleteStudio}
                  />
                ))}
              </SimpleGrid>
            ) : (
              <VStack mt={["5", "10"]} spacing={["5", "6"]}>
                {studios?.value?.map((studio: StudioView) => (
                  <StudioList
                    key={studio.id}
                    studio={studio}
                    deleteStudio={deleteStudio}
                  />
                ))}
              </VStack>
            )}
          </>
        )}
      </Box>
      <HStack justifyContent="center" mt="3rem">
        <Pagination data={studios} />
      </HStack>
    </Box>
  );
};

export default AllStudios;
