import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  VStack,
  Icon,
  HStack,
  Text,
  Image,
  Square,
  Box,
  Flex,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { AiOutlineLink } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { useDummyImage } from "react-simple-placeholder-image";
import { GlobalSearchResultView, StudioService } from "src/services";
import Skeleton from "react-loading-skeleton";
import { useDebouncedCallback } from "use-debounce";

import { NotFound, useNonInitialEffect } from "ui";

export const SearchBox = ({ isOpen, onClose }: any) => {
  const router = useRouter();
  const [limit, setLimt] = useState(7);
  const [search, setSearch] = useState("");
  const [searchedData, setSearchedData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();
  const searchAction = (x: GlobalSearchResultView) => {
    if (x.isStudio) {
      router.push(`/all-studios/${x?.id}`);
      setSearchedData([]);
      return;
    }
    router.push(`/customer/details/${x?.id}`);
    setSearchedData([]);
    onClose();
  };
  const image = useDummyImage({});

  const doGlobalSearch = async (value: string) => {
    if (value == "") {
      return;
    }
    setLoading(true);
    try {
      const result = await StudioService.search({
        offset: 0,
        limit: limit,
        search: value,
      });
      if (result.status) {
        setLoading(false);
        setSearchedData(result.data);
        return;
      }
      setLoading(false);
      setError(result.message);
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
  useNonInitialEffect(() => {
    doGlobalSearch(search as string);
  }, [limit]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      //   isCentered
      //   trapFocus={false}
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) " />

      <ModalContent
        borderRadius="10px"
        w={["88%", "45%"]}
        // overflow="hidden"
        maxH="100vh"
        pos="fixed"
        mt="1rem"
        mb="1rem"
        maxW="100%"
        p="1rem"
      >
        <ModalBody p="0">
          <InputGroup
            // boxShadow="0px 4px 4px rgba(0, 0, 0, 0.2)"
            borderRadius="4px"
            h="4rem"
            alignItems="center"
          >
            <InputLeftElement pointerEvents="none" h="full">
              <Icon as={BsSearch} color="brand.100" />
            </InputLeftElement>
            <Input
              type="text"
              border="none"
              _focusVisible={{ outline: "none" }}
              _placeholder={{ fontSize: "1rem" }}
              placeholder="Search studio by name, category"
              overflow="hidden"
              h="full"
              onChange={(e: any) => searchFn(e.target.value)}
            />
            {/* <InputRightElement h="full" w="8rem">
              <Button
                h="full"
                w="full"
                bg="brand.100"
                color="white"
                size="sm"
                onClick={doGlobalSearch}
              >
                Search
              </Button>
            </InputRightElement> */}
          </InputGroup>
          <VStack
            gap="1rem"
            bgColor="white"
            w="full"
            align="flex-start"
            my="1rem"
            overflow="auto"
            maxH="70vh"
          >
            {loading ? (
              <Box h="full" w="full">
                <Skeleton count={6} style={{ height: "5rem" }} />
              </Box>
            ) : error ? (
              <Text textAlign="center">{error}</Text>
            ) : (
              <>
                {searchedData?.value?.length == 0 ? (
                  <NotFound />
                ) : (
                  searchedData?.value?.map((x: GlobalSearchResultView) => (
                    <HStack
                      key={x.id}
                      color="black"
                      h="5rem"
                      cursor="pointer"
                      justify="space-between"
                      borderRadius="8px"
                      bgColor="gray.100"
                      p="1rem"
                      w="full"
                      onClick={() => searchAction(x)}
                      _hover={{
                        bgColor: "brand.100",
                        color: "white",
                      }}
                    >
                      <HStack>
                        <Square
                          size="4rem"
                          borderRadius="5px"
                          overflow="hidden"
                        >
                          <Image
                            src={x.image || image}
                            alt={x.name as string}
                            w="full"
                            h="full"
                            objectFit="cover"
                          />
                        </Square>

                        <VStack
                          align="flex-start"
                          spacing="0"
                          fontFamily="DM Sans !important"
                        >
                          <Text
                            color="inherit"
                            fontWeight="600"
                            mb="0"
                            fontSize=".6rem"
                          >
                            {x.isStudio ? "Studio" : "Service"}
                          </Text>
                          <Text
                            color="inherit"
                            fontWeight="600"
                            mb="0"
                            fontSize="1.1rem"
                          >
                            {x.name}
                          </Text>
                          <Text
                            color="inherit"
                            fontWeight="400"
                            mb="0"
                            fontSize=".8rem"
                            noOfLines={1}
                          >
                            {x.description}
                          </Text>
                        </VStack>
                      </HStack>
                      <Icon as={AiOutlineLink} />
                    </HStack>
                  ))
                )}
              </>
            )}
          </VStack>
          <Flex justify="center" w="full">
            {searchedData?.value?.length > 0 && (
              <Button
                bgColor="brand.100"
                color="white"
                px="2rem"
                onClick={() => setLimt((prev) => prev + 5)}
                isDisabled={!searchedData?.next}
              >
                Load More
              </Button>
            )}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
