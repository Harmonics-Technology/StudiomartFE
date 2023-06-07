import { Button } from "@chakra-ui/react";
import React from "react";

export const WaitBtn = ({
  text = " Join waitlist",
  onOpen,
}: {
  text?: string;
  onOpen: any;
}) => {
  return (
    <Button
      bgColor="brand.100"
      fontSize={{ base: ".9rem", lg: ".9rem" }}
      color="white"
      w="full"
      h="50px"
      borderRadius="4px"
      onClick={onOpen}
    >
      {text}
    </Button>
  );
};
