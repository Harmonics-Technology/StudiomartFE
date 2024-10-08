import { Button, Icon } from "@chakra-ui/react";
import React from "react";
import BeatLoader from "react-spinners/BeatLoader";

export const BookingsBtn = ({
  onClick,
  isDisabled,
  text,
  icon,
  bg,
  isLoading = false,
}: {
  onClick?: any;
  isDisabled: boolean;
  text: string;
  icon: any;
  bg: string;
  isLoading?: boolean;
}) => {
  return (
    <Button
      bgColor={bg}
      color="white"
      borderRadius="0"
      h="3.5rem"
      w="full"
      isDisabled={isDisabled}
      onClick={onClick}
      spinner={<BeatLoader color="white" size={10} />}
      isLoading={isLoading}
    >
      <Icon as={icon} mr=".5rem" />
      {text}
    </Button>
  );
};
