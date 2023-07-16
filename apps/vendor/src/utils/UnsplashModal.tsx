import {
  Box,
  Button,
  Circle,
  Flex,
  Grid,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import BeatLoader from "react-spinners/BeatLoader";
import { ModalWrapper, NotFound, SearchInput, useNonInitialEffect } from "ui";
import { useDebouncedCallback } from "use-debounce";

export const UnsplashModal = ({
  open,
  close,
  fun,
  onClose,
}: {
  open: boolean;
  close: any;
  fun: any;
  onClose: any;
}) => {
  const [search, setSearch] = useState("");
  const [searchedData, setSearchedData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();
  const [selectedImage, setSelectedImage] = useState<any>();
  const limitAmount = 30;
  const [limit, setLimt] = useState(1);
  const doGlobalSearch = async (value: string) => {
    if (value == "") {
      return;
    }
    setLoading(true);
    try {
      const result = await axios.get(
        `https://api.unsplash.com/search/photos?query=${value}&per_page=${limitAmount}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_KEY}&page=${limit}`
      );
      if (result.status) {
        setLoading(false);
        setSearchedData(result.data);
        return;
      }
      setLoading(false);
      setError(result.data?.message);
    } catch (error: any) {
      setLoading(false);
      setError(error?.body?.message || error?.message);
    }
  };

  const searchFn = useDebouncedCallback(
    (value) => {
      setSearch(value);
      doGlobalSearch(value);
    },
    // delay in ms
    500
  );

  const paginate = (type: "previous" | "next") => {
    if (type == "previous") {
      setLimt((prev) => (prev > 1 ? prev - 1 : prev));
    }
    if (type == "next") {
      setLimt((prev) => (prev == searchedData.total_pages ? prev : prev + 1));
    }
  };

  //   const addToArray = (url: any) => {
  //     const exist = fun.imageState?.find((x: any) => x == url);
  //     if (exist) {
  //       fun.imageSetter(fun.imageState.filter((x: any) => x !== url));
  //       return;
  //     }
  //     fun.imageSetter([...fun.imageState, url]);
  //   };

  function selectImageAndCloseModals() {
    fun.imageSetter(selectedImage);
    close();
    onClose();
  }

  useNonInitialEffect(() => {
    doGlobalSearch(search as string);
  }, [limit]);

  return (
    <ModalWrapper
      isOpen={open}
      onClose={close}
      title="Choose from a wide variety of images"
      w="80%"
    >
      <Box w="full" p="1rem">
        <VStack mb="2rem">
          {/* <Text fontSize="1.3rem" fontWeight="600" mb="0">
            Search Images here
          </Text> */}
          <SearchInput
            searchFn={searchFn}
            border="2px solid #a1a1a1"
            placeholder="Search images using relative keywords..."
          />
        </VStack>
        {loading ? (
          <VStack h="full" w="full">
            <BeatLoader color="blue" size={30} />
          </VStack>
        ) : error ? (
          <Text textAlign="center">{error}</Text>
        ) : (
          <>
            {searchedData?.results?.length == 0 ? (
              <NotFound />
            ) : searchedData?.results?.length > 0 ? (
              <>
                <Flex justify="space-between" mb="2rem">
                  <Button
                    bgColor="brand.100"
                    color="white"
                    minW="unset"
                    borderRadius="3px"
                    onClick={() => selectImageAndCloseModals()}
                  >
                    Select image
                  </Button>
                  <HStack>
                    <Button
                      bgColor="brand.100"
                      color="white"
                      minW="unset"
                      borderRadius="3px"
                      onClick={() => paginate("previous")}
                    >
                      <BsChevronLeft />
                    </Button>
                    <Text mb="0">
                      {limitAmount * limit} of {searchedData?.total}
                    </Text>
                    <Button
                      bgColor="brand.100"
                      color="white"
                      minW="unset"
                      borderRadius="3px"
                      onClick={() => paginate("next")}
                    >
                      <BsChevronRight />
                    </Button>
                  </HStack>
                </Flex>
                <Grid templateColumns={["repeat(5,1fr)"]} gap="1rem">
                  {searchedData?.results?.map((x: any) => (
                    <Box
                      w="full"
                      key={x.id}
                      onClick={() => {
                        setSelectedImage(x?.urls?.regular);
                      }}
                      h="8rem"
                      overflow="hidden"
                      pos="relative"
                      role="group"
                      border={
                        selectedImage == x.urls.regular ? "4px solid" : "none"
                      }
                      borderColor="rgba(21,112,250,.5)"
                      bgColor="black"
                      //   transition="all .3s ease"
                    >
                      <Image
                        src={x?.urls?.thumb}
                        alt={x?.description}
                        w="full"
                        h="full"
                        objectFit="cover"
                        _groupHover={{
                          opacity: 0.4,
                        }}
                      />
                      <HStack
                        pos="absolute"
                        bottom="0"
                        mb=".3rem"
                        ml=".5rem"
                        opacity={0}
                        transition="all .3s ease"
                        _groupHover={{
                          opacity: 1,
                        }}
                      >
                        <Circle size="1.8rem" overflow="hidden">
                          <Image
                            src={x?.user?.profile_image?.small}
                            alt={x?.user?.name}
                            w="full"
                            h="full"
                            objectFit="cover"
                          />
                        </Circle>
                        <Text fontSize=".7rem" mb="0" color="white">
                          {x.user?.name}
                        </Text>
                      </HStack>
                    </Box>
                  ))}
                </Grid>
              </>
            ) : null}
          </>
        )}
      </Box>
    </ModalWrapper>
  );
};
