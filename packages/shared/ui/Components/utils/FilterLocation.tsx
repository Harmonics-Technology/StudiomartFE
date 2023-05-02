import { HStack, Text } from "@chakra-ui/react";
import React from "react";
import { FaRegDotCircle } from "react-icons/fa";

const FilterLocation = ({ name }: { name: any }) => {
    return (
        <HStack
            align="center"
            cursor="pointer"
            borderTop="1px solid"
            borderColor="#D9D9D9"
            _hover={{
                bgColor: "brand.100",
                color: "white",
            }}
            py="3"
            px="8"
            spacing={5}
        >
            <FaRegDotCircle color="#D9D9D9" />
            <Text mb="0" textTransform="capitalize">
                {name}
            </Text>
        </HStack>
    );
};

export default FilterLocation;
