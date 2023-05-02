import { HStack, Box } from "@chakra-ui/react";
import React from "react";

interface StepperProps {
  steps: any[];
  currentStep: number;
}

export const CustomStepper = ({ steps, currentStep }: StepperProps) => {
  return (
    <HStack w="full">
      {steps.map((step, index) => (
        <Box
          key={index}
          w="full"
          h="4px"
          bgColor={step <= currentStep ? "brand.100" : "gray.300"}
        ></Box>
      ))}
    </HStack>
  );
};
