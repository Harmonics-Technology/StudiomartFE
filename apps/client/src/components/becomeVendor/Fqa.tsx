import { Box, Collapse, HStack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

type Props = {
    title: string;
};
const Fqa = ({ title }: Props) => {
    const [toggler, setToggler] = useState(false);

    const handleToggle = () => {
        if (toggler) {
            setToggler(false);
        } else {
            setToggler(true);
        }
    };
    return (
        <Box borderBottom="1px solid #E5E5E5" w="full" pb={["4", "8"]} pt="4">
            <HStack justify="space-between" align="center">
                <Text mb="0" fontWeight="medium" fontSize={["1rem", "1.3rem"]}>
                    {title}
                </Text>
                <Box
                    onClick={handleToggle}
                    transition=".4s ease"
                    transform={toggler ? "rotate(45deg)" : "unset"}
                    fontSize={["1.3rem", "1.7rem"]}
                    cursor="pointer"
                    color="gray"
                >
                    <AiOutlinePlus />
                </Box>
            </HStack>
            <Box>
                <Collapse in={toggler} animateOpacity>
                    <Text mb="0" pt="4">
                        Nemo enim ipsam voluptatem quia voluptas sit aspernatur
                        aut odit enim ipsam voluptatem quia voluptas sit
                        aspernatur aut odit aut odit aut odit.
                    </Text>
                </Collapse>
            </Box>
        </Box>
    );
};

export default Fqa;
