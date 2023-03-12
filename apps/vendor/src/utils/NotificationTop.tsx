import { Box, Flex, Text, Button } from "@chakra-ui/react";
import React from "react";

interface NotificationTopProps {
    page: string;
    details: string;
    right: boolean;
}

function NotificationTop({ page, details, right }: NotificationTopProps) {
    return (
        <Box bgColor="white">
            <Flex
                justify="space-between"
                align="center"
                w="90%"
                mx="auto"
                py=".7rem"
            >
                <Box>
                    <Text fontSize="1.5rem" fontWeight="500" mb=".2rem">
                        {page}
                    </Text>
                    <Text>{details}</Text>
                </Box>

            </Flex>
        </Box>
    );
}

export default NotificationTop;
