import { Box } from "@chakra-ui/react";
import React from "react";

interface IProgressProps {
  size: any;
  color?: string;
}

const ProgressBar = ({ size, color = "brand.100" }: IProgressProps) => {
  console.log({ size });
  return (
    <Box w="full" bgColor="gray.300" rounded="md">
      <Box bgColor={color} py="5px" w={`${size}%`} rounded="md" />
    </Box>
  );
};

export default ProgressBar;
