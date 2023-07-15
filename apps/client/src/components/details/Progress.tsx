import { Box } from "@chakra-ui/react";

interface IProgressProps {
  size: any;
  color?: string;
}

const ProgressBar = ({ size, color = "brand.100" }: IProgressProps) => {
  //
  return (
    <Box w="full" bgColor="gray.300" rounded="md" h="8px">
      <Box bgColor={color} h="full" w={`${size || 0}%`} rounded="md" />
    </Box>
  );
};

export default ProgressBar;
