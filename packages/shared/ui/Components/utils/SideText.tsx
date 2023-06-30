import React from "react";
import { Link, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

export const SideText = ({ data }: any) => {
  const router = useRouter();
  const url = `/account/${data}`;
  const text = data.replaceAll("-", " ");
  return (
    <Link
      href={url}
      fontWeight="500"
      fontSize="16px"
      color={router.asPath == url ? "brand.100" : "#636363"}
      textTransform="capitalize"
      textOverflow="ellipsis"
      mb={{ base: "1rem", lg: "0" }}
    >
      <Text mb="0" whiteSpace="nowrap">
        {text}
      </Text>
    </Link>
  );
};
