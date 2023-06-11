import { Flex, Text, Box } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { FaChevronRight } from "react-icons/fa";

const BookNowLink = ({ path }: { path: string }) => {
  return (
    <Box role="group">
      <Link href={path} passHref>
        <Flex
          fontWeight="500"
          cursor="pointer"
          justifyContent={["center", "flex-end"]}
          color="brand.100"
          alignItems="baseline"
          fontSize={["1rem", "1rem"]}
          gap="2"
        >
          <Text transition=".3s ease" mr="0" _groupHover={{ mr: "3" }}>
            Book Now
          </Text>
          <FaChevronRight size={9} />
        </Flex>
      </Link>
    </Box>
  );
};

export default BookNowLink;
