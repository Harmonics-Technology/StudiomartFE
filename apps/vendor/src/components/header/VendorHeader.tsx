import {
  Flex,
  Box,
  Input,
  InputGroup,
  Image,
  InputLeftElement,
  Circle,
  HStack,
  Divider,
} from "@chakra-ui/react";
import React from "react";
import { FaAngleDown } from "react-icons/fa";
import { GoSettings } from "react-icons/go";
import Link from "next/link";
import { RiNotification3Fill, RiSearch2Fill } from "react-icons/ri";

function VendorHeader() {
  return (
    <Box w="full" bgColor="white">
      <Box w="80%" ml="auto">
        <Flex
          h="5.5rem"
          align="center"
          justify="space-between"
          mx="auto"
          w="90%"
        >
          <Flex h="3rem" w="55%">
            <InputGroup>
              <InputLeftElement top=".4rem" color="#636363">
                <RiSearch2Fill />
              </InputLeftElement>
              <Input
                type="search"
                placeholder="search studio"
                h="full"
                borderRadius="5px 0 0 5px"
                w="100%"
                bgColor="#E8E8E8"
                _placeholder={{
                  color: "#636363",
                }}
              />
            </InputGroup>
            <Box
              bgColor="brand.100"
              color="white"
              px="1.5rem"
              borderRadius="0 5px 5px 0"
            >
              <Flex
                transform="rotate(90deg)"
                fontSize="1.5rem"
                fontWeight="bold"
                align="center"
                h="100%"
                cursor="pointer"
              >
                <GoSettings />
              </Flex>
            </Box>
          </Flex>
          <HStack>
            <Box mr="1rem">
            <Link href="/vendor/notification" passHref>
                        <a>
                  <RiNotification3Fill />
                  </a></Link>
            </Box>
            <Circle bgColor="gray.300" size="3rem" overflow="hidden">
              <Image src="" objectFit="cover" w="full" h="full" alt="" />
            </Circle>
            <Box color="gray.400">
              <FaAngleDown />
            </Box>
          </HStack>
        </Flex>
      </Box>
      <Divider />
    </Box>
  );
}

export default VendorHeader;
