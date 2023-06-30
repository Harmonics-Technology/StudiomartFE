import { HStack, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { BsCheck2 } from "react-icons/bs";

export const ServiceInfos = ({ value, title }: any) => {
  return (
    <HStack spacing="1rem">
      <Icon
        as={BsCheck2}
        color="brand.100"
        fontSize="18px"
        // border="2px solid #1570fa"
      />
      <Text fontSize="18px" color="#3d3d3d" mb="0">
        <span style={{ fontWeight: "500" }}>{title}: </span>
        {value}
      </Text>
    </HStack>
  );
};
