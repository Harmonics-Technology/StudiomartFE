import { Box, Button } from "@chakra-ui/react";
import React from "react";

type Props = {
  textContent: string;
  isLoading: any;
};

const SubmitButton = ({ textContent, isLoading }: Props) => {
  return (
    <>
      <Box w="100%" my={["20px", "30px"]} h="50px">
        <Button
          type="submit"
          w="100%"
          h="100%"
          fontWeight={500}
          fontSize="14px"
          bg="#1570FA"
          textTransform="capitalize"
          color="white"
          transition="0.5s linear"
          borderRadius="4px"
          cursor="pointer"
          isLoading={isLoading}
          _hover={{
            backgroundColor: "transparent",
            color: "brand.100",
            border: "2px solid #1570FA",
          }}
          _focus={{
            outline: "none",
          }}
        >
          {textContent}
        </Button>
      </Box>
    </>
  );
};

export default SubmitButton;
