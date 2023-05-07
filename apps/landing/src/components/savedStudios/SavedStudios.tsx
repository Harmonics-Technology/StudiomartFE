import { Box, VStack, Text, Grid, Button } from "@chakra-ui/react";
import Card from "@components/homeandcategory/Component/Card";
import Link from "next/link";
import React from "react";
import { BsFillEmojiFrownFill } from "react-icons/bs";
import {BackToPage} from "ui";

const SavedStudios = () => {
    return (
        <Box bgColor="brand.200" minH="screen" py="14">
            <Box mx="auto" w="90%">
                <BackToPage name="Back to home page" path="/customer" />
                <VStack
                    textAlign="center"
                    mt="10"
                    py={["8", "10"]}
                    bgColor="white"
                    spacing={6}
                >
                    <Box color="brand.100" fontSize={["2.5rem", "3rem"]}>
                        <BsFillEmojiFrownFill />
                    </Box>
                    <Box>
                        <Text
                            color="brand.100"
                            mb="1"
                            fontWeight={500}
                            fontSize={["1.5rem", "2rem"]}
                        >
                            Opps! you do not have a saved studio.
                        </Text>
                        <Text fontSize={[".95rem", "1.2rem"]}>
                            Kindly browse our category to explore our studios.
                        </Text>
                    </Box>
                    <Link href="/customer/studio-category/music-category">
                        <Button
                            bgColor="brand.100"
                            color="white"
                            w={["150px", "200px"]}
                            p="7"
                            _hover={{
                                color: "brand.100",
                                bgColor: "transparent",
                                border: "2px solid #1570FA",
                            }}
                            _focus={{
                                outline: "none",
                            }}
                            variant="solid"
                            borderRadius="4px"
                        >
                            Browse studios
                        </Button>
                    </Link>
                </VStack>
                <Box w="full" h="100%" mt="2rem">
                    <Text fontWeight="700" fontSize={["1.5rem", "2rem"]}>
                        Studios for you
                    </Text>
                    <Grid
                        h="100%"
                        templateColumns={[
                            "repeat(2, 1fr)",
                            "repeat(2, 1fr)",
                            "repeat(2,1fr)",
                            "repeat(3, 1fr)",
                        ]}
                        mt={["0", "2rem"]}
                        gap={["4", "6"]}
                        place-items=" center !important"
                    >
                        <Card img="/pixel1.png" />
                        <Card img="/pixel2.png" />
                        <Card img="/pixel3.png" />
                        <Card img="/pixel4.png" />
                        <Card img="/pixel5.png" />
                        <Card img="/pixel1.png" />
                        <Card img="/pixel2.png" />
                        <Card img="/pixel3.png" />
                        <Card img="/pixel4.png" />
                    </Grid>
                </Box>
                <Box w="full" h="100%" mt="2rem">
                    <Text fontWeight="700" fontSize={["1.5rem", "2rem"]}>
                        Popular Studios around you
                    </Text>
                    <Grid
                        h="100%"
                        templateColumns={[
                            "repeat(2, 1fr)",
                            "repeat(2, 1fr)",
                            "repeat(2,1fr)",
                            "repeat(3, 1fr)",
                        ]}
                        mt={["0", "2rem"]}
                        gap={["4", "6"]}
                        place-items=" center !important"
                    >
                        <Card img="/pixel1.png" />
                        <Card img="/pixel2.png" />
                        <Card img="/pixel3.png" />
                        <Card img="/pixel4.png" />
                        <Card img="/pixel5.png" />
                        <Card img="/pixel1.png" />
                        <Card img="/pixel2.png" />
                        <Card img="/pixel3.png" />
                        <Card img="/pixel4.png" />
                    </Grid>
                </Box>
                <Box w="full" h="100%" mt="2rem">
                    <Text fontWeight="700" fontSize={["1.5rem", "2rem"]}>
                        Recently Viewed Studios
                    </Text>
                    <Grid
                        h="100%"
                        templateColumns={[
                            "repeat(2, 1fr)",
                            "repeat(2, 1fr)",
                            "repeat(2,1fr)",
                            "repeat(3, 1fr)",
                        ]}
                        mt={["0", "2rem"]}
                        gap={["4", "6"]}
                        place-items=" center !important"
                    >
                        <Card img="/pixel1.png" />
                        <Card img="/pixel2.png" />
                        <Card img="/pixel3.png" />
                        <Card img="/pixel4.png" />
                        <Card img="/pixel5.png" />
                        <Card img="/pixel1.png" />
                        <Card img="/pixel2.png" />
                        <Card img="/pixel3.png" />
                        <Card img="/pixel4.png" />
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
};

export default SavedStudios;
