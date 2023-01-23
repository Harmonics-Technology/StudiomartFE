import { HStack } from "@chakra-ui/react";
import React from "react";
import { FaRegDotCircle, FaStar } from "react-icons/fa";

const FilterStar = ({ filled }: any) => {
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
            py="4"
            px="8"
            spacing={5}
        >
            <FaRegDotCircle color="#D9D9D9" />
            <HStack spacing={["1"]} fontSize={[".9rem", ".9rem"]}>
                {Array(filled)
                    .fill(null)
                    .map((x, index) => (
                        <FaStar key={index} color="#FACC15" />
                    ))}
                {Array(5 - filled)
                    .fill(null)
                    .map((x, index) => (
                        <FaStar key={index} color="#D9D9D9" />
                    ))}
            </HStack>
        </HStack>
    );
};

export default FilterStar;
