import { Flex, Text } from "@chakra-ui/react";
import { Button } from "@components/button";

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
            : response == "accept"
            ? "#D5E2F9"
            : response == "progress"
            ? "#FDF3CA"
            : response == "cancel"
            ? "#FDC1C1"
            : "white"
        }
        justify="center"
        py=".8rem"
      >
        {response == "pending" ? (
          <BsExclamationCircleFill color="#FACC15" fontSize="2rem" />
        ) : response == "accept" ? (
          <BsExclamationCircleFill color="#1570FA" fontSize="2rem" />
        ) : response == "progress" ? (
          <BsExclamationCircleFill color="#3D3D3D" fontSize="2rem" />
        ) : response == "cancel" ? (
          <BsExclamationCircleFill color="#FDC1C1" fontSize="2rem" />
        ) : (
          "white"
        )}
        <Text ml="1rem" mb="0">
          {response == "pending"
            ? "Booking Pending Confirmation"
            : response == "accept"
            ? "Booking has been accepted, awaiting payment"
            : response == "progress"
            ? "Payment has been made and sessions is in progress"
            : response == "cancel"
            ? "Booking has been cancelled"
            : "Books"}
        </Text>

      </Flex>
      {/* ) : null} */}
    </>
  );
};
