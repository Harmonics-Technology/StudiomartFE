import {
  VStack,
  HStack,
  Icon,
  RadioGroup,
  Radio,
  Box,
  Text,
  Flex,
  Button,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BiCaretDown } from "react-icons/bi";
import { GPlacesAutoComplete, Naira, Rating } from "ui";
import Slider from "rc-slider";
//@ts-ignore
import NaijaStates from "naija-state-local-government";

export const FilterBox = ({ setOpenFilter }: any) => {
  const router = useRouter();
  const [value, setValue] = useState<any>();
  const [showRating, setShowRating] = useState(true);
  const [showPrice, setShowPrice] = useState(false);
  const [showCity, setShowCity] = useState(false);
  const [slider, setSlider] = useState<any>([100000, 400000]);
  const pushRating = (value: any) => {
    setValue(value);
    router.push({
      query: {
        ...router.query,
        rating: value,
      },
    });
  };
  const applyPriceRange = () => {
    router.push({
      query: {
        ...router.query,
        minPrice: slider[0],
        maxPrice: slider[1],
      },
    });
  };

  // const [address, setAddress] = useState<string>("");

  // const handleChange = (address: any) => {
  //   setAddress(address);
  //   console.log({ address });
  // };

  const [states, setStates] = useState<any>();
  const [cityName, setCityName] = useState<any>();
  const allStates = NaijaStates.states();
  const selectedLga = NaijaStates.lgas(states || "lagos");
  const getCityAndState = () => {
    router.push({
      query: {
        ...router.query,
        city: cityName,
        state: states,
      },
    });
  };

  return (
    <Box
      bgColor="white"
      boxShadow="md"
      pos="absolute"
      w="15rem"
      minH="5rem"
      p="1rem 1rem 2rem"
      mt="1rem"
      zIndex="999"
      borderRadius="10px"
      right="0"
    >
      <VStack w="full" gap="1rem" align="flex-start">
        <Box w="full">
          <HStack
            justify="space-between"
            w="full"
            cursor="pointer"
            onClick={() => setShowRating((prev) => !prev)}
          >
            <Text mb="0" fontWeight="600">
              Ratings
            </Text>
            <Icon as={BiCaretDown} />
          </HStack>
          {showRating && (
            <RadioGroup
              onChange={(value) => pushRating(value)}
              value={value}
              mt="1rem"
            >
              <VStack align="flex-start" gap=".5rem">
                <Radio value="5">
                  <Rating value={5} />
                </Radio>
                <Radio value="4">
                  <Rating value={4} />
                </Radio>
                <Radio value="3">
                  <Rating value={3} />
                </Radio>
                <Radio value="2">
                  <Rating value={2} />
                </Radio>
                <Radio value="1">
                  <Rating value={1} />
                </Radio>
              </VStack>
            </RadioGroup>
          )}
        </Box>
        <Box w="full">
          <HStack
            justify="space-between"
            w="full"
            cursor="pointer"
            onClick={() => setShowPrice((prev) => !prev)}
          >
            <Text mb="0" fontWeight="600">
              Price
            </Text>
            <Icon as={BiCaretDown} />
          </HStack>
          {showPrice && (
            <Box w="full" mt="1rem">
              <Flex justify="space-between" w="full">
                <Text fontSize=".8rem" fontWeight="600">
                  {Naira(slider[0])}
                </Text>
                <Text fontSize=".8rem" fontWeight="600">
                  {Naira(slider[1])}
                </Text>
              </Flex>
              <Slider
                range
                min={2000}
                max={1000000}
                value={slider}
                onChange={(val) => setSlider(val)}
              />
              <HStack justify="center">
                <Button
                  bgColor="brand.100"
                  color="white"
                  mt="1rem"
                  w="full"
                  onClick={applyPriceRange}
                >
                  Apply
                </Button>
              </HStack>
            </Box>
          )}
        </Box>
        <Box w="full">
          <HStack
            justify="space-between"
            w="full"
            cursor="pointer"
            onClick={() => setShowCity((prev) => !prev)}
          >
            <Text mb="0" fontWeight="600">
              Location
            </Text>
            <Icon as={BiCaretDown} />
          </HStack>
          {showCity && (
            <Box w="full" mt="1rem">
              {/* <GPlacesAutoComplete
                onSelect={getCityAndState}
                onChange={handleChange}
                address={address}
              /> */}
              <FormLabel textTransform="capitalize" mb="5px" fontSize=".8rem">
                State
              </FormLabel>
              <Select
                w="full"
                border="2px solid"
                borderColor="gray.300"
                borderRadius="0"
                placeholder=""
                fontSize=".9rem"
                onChange={(e) => setStates(e.target.value)}
              >
                {allStates.map((x: any, i: number) => (
                  <option value={x} key={i}>
                    {x}
                  </option>
                ))}
              </Select>
              {states && (
                <Box mt=".5rem">
                  <FormLabel
                    textTransform="capitalize"
                    mb="5px"
                    fontSize=".8rem"
                  >
                    City
                  </FormLabel>
                  <Select
                    w="full"
                    border="2px solid"
                    borderColor="gray.300"
                    borderRadius="0"
                    placeholder=""
                    fontSize=".9rem"
                    onChange={(e) => setCityName(e.target.value)}
                  >
                    {selectedLga.lgas.map((x: any, i: number) => (
                      <option value={x} key={i}>
                        {x}
                      </option>
                    ))}
                  </Select>
                  <HStack justify="center">
                    <Button
                      bgColor="brand.100"
                      color="white"
                      mt="1rem"
                      w="full"
                      onClick={getCityAndState}
                    >
                      Apply
                    </Button>
                  </HStack>
                </Box>
              )}
            </Box>
          )}
        </Box>
        {/* <HStack justify="space-between" w="full">
          <Text mb="0" fontWeight="600">
            Frequently used
          </Text>
          <Icon as={BiCaretDown} />
        </HStack> */}
      </VStack>
    </Box>
  );
};
