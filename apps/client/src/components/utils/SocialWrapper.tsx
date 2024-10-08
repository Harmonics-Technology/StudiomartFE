import { Circle, HStack, Icon, Text } from "@chakra-ui/react";
import Link from "next/link";
import bookings from "pages/customer/bookings";
import React from "react";

export const SocialWrapper = ({ icon, iconName, url, color }: any) => {
  return (
    <Link passHref href={`${url}`}>
      <Circle size="2rem" bg={color}>
        <HStack cursor="pointer">
          <Icon as={icon} fontSize="1rem" color={"white"} />
          {/* <Text mb="0" fontSize=".8rem">
          {iconName}
        </Text> */}
        </HStack>
      </Circle>
    </Link>
  );
};
