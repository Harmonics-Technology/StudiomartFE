import { Box } from "@chakra-ui/react";
import React from "react";

export const ResponseBox = ({ response }: any) => {
  return (
    <Box
      padding=".5rem 1rem"
      width="fit-content"
      h="fit-content"
      borderRadius="3px"
      cursor="pointer"
      fontWeight="600"
      ml="auto"
      bgColor={
        response == "pending"
          ? "#FDF3CA"
          : response == "paid"
          ? "#D2F5DF"
          : response == "approved"
          ? "#D5E2F9"
          : response == "in-progress"
          ? "#FDF3CA"
          : response == "cancelled" || response == "rejected"
          ? "#FDC1C1"
          : "white"
      }
      fontSize="10px"
    >
      {response == "pending"
        ? "Pending Confirmation"
        : response == "paid"
        ? "Payment Confirmed"
        : response == "approved"
        ? "Awaiting payment"
        : response == "in-progress"
        ? "In progress"
        : response == "rejected"
        ? "Rejected"
        : "Cancelled"}
    </Box>
  );
};
