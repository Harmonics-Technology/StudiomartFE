import { Box, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { FaStar } from "react-icons/fa";

const Comments = () => {
    return (
        <Box
            borderBottom="2px solid"
            borderColor="brand.300"
            w="full"
            py={["5", "10"]}
        >
            <Box w="90%" mx="auto">
                <HStack fontSize=".9rem" color="#FACC15">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                </HStack>
                <Text
                    fontWeight={700}
                    mb="0"
                    py="2"
                    fontSize={["1rem", "1.2rem"]}
                >
                    Very nice studio
                </Text>
                <Text fontSize={["1rem", "1.1rem"]} mb="0" fontWeight={500}>
                    Very nice and organized
                </Text>
                <Text color="gray.400" fontSize=".9rem">
                    19-03-2222 by Annie
                </Text>
            </Box>
        </Box>
    );
};

export default Comments;
