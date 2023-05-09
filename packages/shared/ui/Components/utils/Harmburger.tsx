import { Box } from "@chakra-ui/react";
import React from "react";

type Props = {
    isOpened: boolean;
};
const Harmburger = ({ isOpened }: Props) => {
    return (
        <Box
            h={isOpened ? "23px" : "24px"}
            w={isOpened ? "28px" : "35px"}
            display="flex"
            flexDir="column"
            justifyContent="space-between"
        >
            <Box
                h="4px"
                display="block"
                bgColor="#0e2431"
                w="full"
                as="span"
                transformOrigin="0% 0%"
                transition="0.4s ease"
                transform={isOpened ? "rotate(45deg)" : "unset"}
            ></Box>
            <Box
                h="4px"
                display="block"
                bgColor="#0e2431"
                w="full"
                as="span"
                transition="0.2s ease"
                transform={isOpened ? "scaleY(0)" : "unset"}
            ></Box>
            <Box
                h="4px"
                display="block"
                bgColor="#0e2431"
                w="full"
                as="span"
                transformOrigin="0% 0%"
                transition="0.4s ease"
                ml={isOpened ? "-1" : "unset"}
                transform={isOpened ? "rotate(-45deg)" : "unset"}
            ></Box>
        </Box>
    );
};

export default Harmburger;
