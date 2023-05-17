import React from "react";
import { Link } from "@chakra-ui/react";
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
    >
      {text}
    </Link>
  );
};
