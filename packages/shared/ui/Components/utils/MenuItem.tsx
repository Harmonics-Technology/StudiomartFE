import { Box, HStack, Square, Text, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

interface MenuProps {
  menuTitle: string;
  icon: any;
}
function MenuItem({ menuTitle, icon }: MenuProps) {
  const router = useRouter();
  const url = `/${menuTitle}`;
  return (
    <Link href={url} passHref>
      <Flex
        overflow="hidden"
        cursor="pointer"
        bgColor={router.pathname.startsWith(url) ? "brand.100" : "transparent"}
        // p=".2rem 2rem"
        w="full"
        borderRadius="10px"
        h="3rem"
        color={router.pathname.startsWith(url) ? "white" : "brand.700"}
      >
        <HStack pl=".5rem">
          <Square bgColor="transparent" size="2rem" fontSize="1rem">
            {icon}
          </Square>
          <Text
            fontWeight="600"
            fontSize="1rem"
            pl=".5rem"
            textTransform="capitalize"
          >
            {menuTitle}
          </Text>
        </HStack>
      </Flex>
    </Link>
  );
}

export default MenuItem;
