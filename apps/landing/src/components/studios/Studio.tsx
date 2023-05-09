import React from "react";
import Card from "./Card";
import {
  Box,
  Input,
  InputLeftElement,
  InputGroup,
  Text,
  Grid,
  Button,
  Image,
} from "@chakra-ui/react";

const Studio = () => {
  return (
    <Box
      pb="12"
      w="90%"
      mx="auto"
      alignItems="center"
      justifyContent="center"
      h="100%"
      display="flex"
      flexDirection="column"
    >
      <Text
        fontWeight="700"
        mt="2rem"
        p="2rem"
        fontSize={["1.5rem", "2rem", "2.5rem", "2.75em"]}
        whiteSpace="nowrap"
      >
        Explore Studios For You
      </Text>
      <InputGroup
        background=" #FFFFFF"
        boxShadow="4px 4px 20px rgba(12, 12, 12, 0.1)"
        display="flex"
        border-radius=" 4px"
        p={["1rem", "3rem"]}
        w={["100%", "75%"]}
        h={["3rem", "3.5rem"]}
        alignItems="center"
        justifyContent="center"
      >
        <InputLeftElement
          marginY={[".35rem", "1.75em"]}
          marginX={["1rem", "2rem"]}
          pointerEvents="none"
          // eslint-disable-next-line react/no-children-prop
          children={
            <Image
              src="/search.png"
              alt="search"
              color="#808080"
              boxSize={["1rem", "2em"]}
              fontWeight="400"
            />
          }
        />
        <Input
          type="text"
          _focus={{ border: "none", outline: "none" }}
          border="none"
          color="rgba(23, 23, 23, 0.52)"
          fontSize={[".75em", "2em"]}
          placeholder="Search studios"
        />
      </InputGroup>
      <Box
        w="full"
        h="6rem"
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap="6"
      >
        <Button
          border="1px solid #d6d6d6"
          fontWeight="400"
          fontSize={[".65rem", "1.25em"]}
          py={[".45rem", "1rem"]}
          px={["1rem", "1rem"]}
          color="#808080"
          borderRadius="none"
          bg="#fff"
          cursor="pointer"
        >
          Studio type
        </Button>
        <Button
          border="1px solid #d6d6d6"
          fontWeight="400"
          fontSize={[".65rem", "1.25em"]}
          py={[".45rem", "1rem"]}
          px={["1rem", "1rem"]}
          color="#808080"
          borderRadius="none"
          bg="#fff"
          cursor="pointer"
        >
          Pricing
        </Button>
        <Button
          border="1px solid #d6d6d6"
          fontWeight="400"
          fontSize={[".65rem", "1.25em"]}
          py={[".45rem", "1rem"]}
          px={["1rem", "1rem"]}
          color="#808080"
          borderRadius="none"
          bg="#fff"
          cursor="pointer"
        >
          Best rating
        </Button>
      </Box>
      <Grid
        templateColumns={[
          "repeat(2, 1fr)",
          "repeat(2, 1fr)",
          "repeat(2,1fr)",
          "repeat(2, 1fr)",
        ]}
        mt={["0", "2rem"]}
        gap={["4", "12"]}
        place-items=" center !important"
      >
        <Card img="/pixel1.png" />
        <Card img="/pixel2.png" />
        <Card img="/pixel3.png" />
        <Card img="/pixel4.png" />
        <Card img="/pixel5.png" />
      </Grid>
    </Box>
  );
};

export default Studio;
