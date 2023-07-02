import { Box, Flex } from "@chakra-ui/react";
import React from "react";

export const ResponseBox = ({ response }: any) => {
  return (
    <Box
      padding=".5rem .5rem"
      width="fit-content"
      h="fit-content"
      borderRadius="5px"
      cursor="pointer"
      fontWeight="600"
      ml={{ base: "auto", lg: "auto" }}
      bgColor={
        response == "pending"
          ? "#FDF3CA"
          : response == "paid"
          ? "#D2F5DF"
          : response == "approved"
          ? "#D5E2F9"
          : response == "in-progress"
          ? "#FDF3CA"
          : response == "completed"
          ? "#bcf8dc"
          : response == "cancelled" || response == "rejected"
          ? "#FDC1C1"
          : "white"
      }
      fontSize="9px"
    >
      {response == "pending"
        ? "Pending Confirmation"
        : response == "paid"
        ? "Payment Confirmed"
        : response == "approved"
        ? "Awaiting payment"
        : response == "in-progress"
        ? "In progress"
        : response == "completed"
        ? "Completed"
        : response == "rejected"
        ? "Rejected"
        : "Cancelled"}
    </Box>
  );
};

export const ResponseBoxLarge = ({ response, reference }: any) => {
  return (
    <Flex
      width="full"
      h="3.5rem"
      cursor="pointer"
      fontWeight="600"
      textAlign="center"
      align="center"
      justify="center"
      bgColor={
        response == "pending"
          ? "#FDF3CA"
          : response == "paid"
          ? "#D2F5DF"
          : response == "approved"
          ? "#D5E2F9"
          : response == "in-progress"
          ? "#FDF3CA"
          : response == "completed"
          ? "#bcf8dc"
          : response == "cancelled" || response == "rejected"
          ? "#FDC1C1"
          : "#7cbcf2"
      }
      fontSize=".9rem"
    >
      Your booking with reference {reference}{" "}
      {response == "pending"
        ? "is pending confirmation"
        : response == "paid"
        ? "now has it's payment confirmed"
        : response == "approved"
        ? "has been accepted by vendor and is awaiting payment"
        : response == "in-progress"
        ? "is currently in progress"
        : response == "completed"
        ? "has been completed. Thank you for using studiomart"
        : response == "rejected"
        ? "has been rejected by the vendor"
        : response == "cancelled"
        ? "Cancelled by you"
        : "is undefined"}
    </Flex>
  );
};
