import { Flex, Text } from "@chakra-ui/react";

import React from "react";
import { BsExclamationCircleFill } from "react-icons/bs";

interface responseProp {
  response: any;
}
export const Responses = ({ response }: responseProp) => {
  return (
    <>
      {/* {response == "pending" ? ( */}
      <Flex
        align="center"
        bgColor={
          response == "pending"
            ? "#FDF3CA"
            : response == "approved"
            ? "#D5E2F9"
            : response == "in-progress"
            ? "#FDF3CA"
            : response == "rejected" || response == "cancelled"
            ? "#FDC1C1"
            : "#FDF3CA"
        }
        justify="center"
        py=".8rem"
      >
        {response == "pending" ? (
          <BsExclamationCircleFill color="#FACC15" fontSize="2rem" />
        ) : response == "approved" ? (
          <BsExclamationCircleFill color="#1570FA" fontSize="2rem" />
        ) : response == "in-progress" ? (
          <BsExclamationCircleFill color="#3D3D3D" fontSize="2rem" />
        ) : response == "rejected" || response == "cancelled" ? (
          <BsExclamationCircleFill color="#DC2626" fontSize="2rem" />
        ) : (
          <BsExclamationCircleFill color="#FDC1C1" fontSize="2rem" />
        )}
        <Text
          ml="1rem"
          mb="0"
          color={
            response == "approved"
              ? "#1570FA"
              : response == "rejected" || response == "cancelled"
              ? "#DC2626"
              : "black"
          }
        >
          {response == "pending"
            ? "Booking Pending Confirmation"
            : response == "approved"
            ? "Booking has been accepted, awaiting payment"
            : response == "in-progress"
            ? "Payment has been made and sessions is in progress"
            : response == "rejected"
            ? "Booking has been rejected"
            : response == "cancelled"
            ? "Booking has been cancelled"
            : "Books"}
        </Text>
      </Flex>
      {/* ) : null} */}
    </>
  );
};
