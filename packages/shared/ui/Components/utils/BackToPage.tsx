import { Flex } from "@chakra-ui/react";
import React from "react";
import { BsChevronLeft, BsFillCaretLeftFill } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  name: string;
};

const BackToPage = ({ name }: Props) => {
  const router = useRouter();
  return (
    <Flex
      w="fit-content"
      align="center"
      gap="4"
      cursor="pointer"
      _hover={{ color: "brand.100" }}
      onClick={() => router.back()}
      fontFamily="DM Sans"
      textTransform="capitalize"
    >
      <BsChevronLeft fontSize="1.3rem" />
      {name}
    </Flex>
  );
};

export default BackToPage;
