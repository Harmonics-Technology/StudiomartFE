import { Flex, Text, Circle, HStack, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

interface pageOptions {
  data: any;
}

function Pagination({ data }: pageOptions) {
  const totalPages = Math.floor(
    (data?.size as number) / (data?.limit as unknown as number)
  );
  const current = data?.offset + 1;
  let pages = [];
  for (let i = 0; i < totalPages; i++) {
    pages.push(i);
  }

  const router = useRouter();
  const next = data?.next?.href;
  const previous = data?.previous?.href;

  const paginate = (direction: "next" | "previous" | "last") => {
    let link = "";
    if (direction == "previous" && previous != null) {
      link = previous?.split("?")[1] ?? false;
      router.push({
        query: {
          ...router.query,
          limit: data.limit,
          offset: data.previousOffset,
        },
      });
    }
    if (direction == "next" && next != null) {
      link = next?.split("?")[1] ?? false;
      router.push({
        query: {
          ...router.query,
          limit: data.limit,
          offset: data.nextOffset,
        },
      });
    }
  };
  return (
    <Flex
      justify={"center"}
      align="center"
      p="1.5rem 0 .5rem"
      gap="1rem"
      flexDirection={["column", "row"]}
    >
      {totalPages > 1 && (
        <HStack cursor="pointer">
          <Button
            bgColor="brand.100"
            color="white"
            minW="unset"
            px="2rem"
            isDisabled={!previous}
            onClick={() => paginate("previous")}
          >
            <FaAngleLeft /> Prev
          </Button>
          {pages
            .filter((x) => x <= 3)
            .map((x) => (
              <Button
                bgColor={current == x + 1 ? "brand.100" : "inherit"}
                color={current == x + 1 ? "white" : "inherit"}
                key={x}
              >
                {x + 1}
              </Button>
            ))}
          {pages.length > 3 && (
            <>
              <span>... </span>
              <Button bgColor="inherit">{totalPages}</Button>
            </>
          )}
          <Button
            bgColor="brand.100"
            color="white"
            minW="unset"
            px="2rem"
            isDisabled={!next}
            onClick={() => paginate("next")}
          >
            Next <FaAngleRight fontSize="1rem" />
          </Button>
        </HStack>
      )}
    </Flex>
  );
}

export default Pagination;
