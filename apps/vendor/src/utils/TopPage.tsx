import { Box, Flex, Text, Button } from "@chakra-ui/react";
import React from "react";

interface TopPageProps {
    page: string;
    details: string;
    right: boolean;
    clickFunction: any;
}

function TopPage({ page, details, right, clickFunction }: TopPageProps) {
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
                {right && (
                    <Button
                        bgColor="brand.100"
                        color="white"
                        px="2rem"
                        onClick={clickFunction}
                    >
                        Add Services
                    </Button>
                )}
            </Flex>
        </Box>
    );
}

export default TopPage;
