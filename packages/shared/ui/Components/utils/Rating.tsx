import { HStack, Text } from "@chakra-ui/react";
import React from "react";
import { FaStar } from "react-icons/fa";

const Rating = () => {
    return (
        <HStack
            spacing={["1", "unset"]}
            align="baseline"
            fontSize={[".7rem", "13px"]}
        >
            <FaStar color="#FACC15" />
            <FaStar color="#FACC15" />
            <FaStar color="#FACC15" />
            <FaStar color="#FACC15" />
            <FaStar color="#FACC15" />

            <Text color="#808080" as="span" fontSize={["8px", "13px"]} pl="1">
                .5 star
            </Text>
        </HStack>
    );
};

export default Rating;
