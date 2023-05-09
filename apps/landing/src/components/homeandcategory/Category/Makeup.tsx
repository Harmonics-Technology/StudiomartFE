import { Box, Grid, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import Card from "../Component/Card";
import { BackToPage, Filter } from "ui";

const Makeup = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <Box position="relative" w="full">
      <Box
        w="full"
        display="flex"
        justifyContent="space-between"
        p={["1.5rem", "3rem"]}
      >
        <BackToPage name="Back to home page" path="/customer" />
        <Filter isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
      </Box>
      <Box px={["1.5rem", "3rem"]} w="full" h="100%" mt="1rem">
        <Text fontWeight="700" fontSize={["1.5rem", "2rem"]}>
          Make-up Studio
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
  );
};

export default Makeup;
