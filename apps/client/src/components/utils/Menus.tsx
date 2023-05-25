import {
  Box,
  Flex,
  HStack,
  ListIcon,
  ListItem,
  Square,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiFillMinusCircle } from "react-icons/ai";
import { FaAngleDown } from "react-icons/fa";

interface MenuProps {
  menuTitle: string;
  linkName: string;
  icon: any;
  option: boolean;
  dropDown: string[];
  role?: string;
  change?: boolean;
  setOpenSidenav?: any;
}
function Menus({
  menuTitle,
  linkName,
  icon,
  option = false,
  dropDown,
  role,
  change,
  setOpenSidenav,
}: MenuProps) {
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);
  const url = `/${linkName}`;
  change = true;
  // console.log({ url });
  return (
    <>
      {change ? (
        <>
          {option ? (
            <Box
              onClick={() => setOpenMenu(!openMenu)}
              overflow="hidden"
              transition="all .35s ease-in-out"
              maxH={openMenu ? "20rem" : "4rem"}
            >
              <Flex
                justify="space-between"
                align="center"
                cursor="pointer"
                // p=".5rem .5rem"
                // borderRadius="10px"
                boxShadow="sm"
                borderBottom="1px solid"
                borderColor="gray.300"
                pl="1rem"
              >
                <HStack
                  bgColor={"white"}
                  p="0rem .5rem 1rem"
                  borderRadius="10px"
                  boxShadow="sm"
                >
                  <Square
                    bgColor="brand.100"
                    color={"white"}
                    borderRadius="8px"
                    size="2.8rem"
                    fontSize="1rem"
                  >
                    {icon}
                  </Square>
                  <Text
                    color={"black"}
                    fontWeight={"700"}
                    fontSize="1rem"
                    pl=".5rem"
                    noOfLines={1}
                  >
                    {menuTitle}
                  </Text>
                  <Text display="none">{linkName}</Text>
                </HStack>

                <Box
                  transform={openMenu ? "rotate(-180deg)" : "rotate(0deg)"}
                  transition="all .35s ease-in-out"
                  color={"black"}
                  fontSize="1.2rem"
                  pr="1rem"
                >
                  <FaAngleDown />
                </Box>
              </Flex>
              <UnorderedList
                pl="0"
                ml="0"
                mt=".4rem !important"
                listStyleType="none"
              >
                {dropDown.map((x, i) => (
                  <ListItem
                    key={i}
                    color="black"
                    onClick={() => setOpenSidenav(false)}
                    fontSize="1rem"
                    fontWeight="500"
                    p=" .8rem 0.5rem .8rem 1.5rem"
                    textTransform="capitalize"
                    borderBottom="1px solid"
                    borderColor="gray.300"
                  >
                    <ListIcon as={AiFillMinusCircle} color="black" />
                    <Link href={`${url}/${x.replace(" ", "-")}`}>{x}</Link>
                  </ListItem>
                ))}
              </UnorderedList>
            </Box>
          ) : (
            <Link href={url} passHref>
              <Box
                overflow="hidden"
                cursor="pointer"
                // onClick={() => setOpenSidenav(false)}
              >
                <Flex
                  pl="1rem"
                  w="full"
                  boxShadow="sm"
                  borderBottom="1px solid"
                  borderColor="gray.300"
                >
                  <HStack
                    bgColor={"white"}
                    p="0rem .5rem 1rem"
                    //   borderRadius="10px"
                    w="full"
                  >
                    <Square
                      bgColor="brand.100"
                      color={"white"}
                      borderRadius="8px"
                      size="2.8rem"
                      fontSize="1rem"
                    >
                      {icon}
                    </Square>
                    <Text
                      color={"black"}
                      fontWeight={"700"}
                      fontSize="1rem"
                      pl=".5rem"
                      noOfLines={1}
                    >
                      {menuTitle}
                    </Text>
                    <Text display="none">{linkName}</Text>
                  </HStack>
                </Flex>
              </Box>
            </Link>
          )}
        </>
      ) : (
        <>
          {option ? (
            <Box
              onClick={() => setOpenMenu(!openMenu)}
              overflow="hidden"
              transition="all .35s ease-in-out"
              maxH={openMenu ? "20rem" : "2rem"}
            >
              <Flex justify="space-between" align="center" cursor="pointer">
                <HStack>
                  <Square
                    bgColor={"brand.100"}
                    color={
                      router.pathname.startsWith(url) ? "white" : "brand.400"
                    }
                    borderRadius="8px"
                    size="2rem"
                    fontSize=".65rem"
                  >
                    {icon}
                  </Square>
                  <Text
                    color={
                      router.pathname.startsWith(url)
                        ? "brand.200"
                        : "brand.300"
                    }
                    fontWeight={router.pathname.startsWith(url) ? "600" : "500"}
                    fontSize=".9rem"
                    pl=".5rem"
                    noOfLines={1}
                  >
                    {menuTitle}
                  </Text>
                  <Text display="none">{linkName}</Text>
                </HStack>

                <Box
                  transform={openMenu ? "rotate(-180deg)" : "rotate(0deg)"}
                  transition="all .35s ease-in-out"
                >
                  <FaAngleDown color="gray" />
                </Box>
              </Flex>
              <UnorderedList pl="1rem" mt=".4rem !important">
                {dropDown.map((x, i) => (
                  <ListItem
                    key={i}
                    color="brand.300"
                    onClick={() => setOpenSidenav(false)}
                    fontSize={
                      router.pathname.startsWith(
                        `${url}/${x.replace(" ", "-")}`
                      )
                        ? "1rem"
                        : ".875rem"
                    }
                    p=" .5rem 0 .5rem 1.2rem"
                    fontWeight={
                      router.pathname.startsWith(
                        `${url}/${x.replace(" ", "-")}`
                      )
                        ? "bold"
                        : "400"
                    }
                    textTransform="capitalize"
                  >
                    <Link href={`${url}/${x.replace(" ", "-")}`}>{x}</Link>
                  </ListItem>
                ))}
              </UnorderedList>
            </Box>
          ) : (
            <Link href={url} passHref>
              <Box
                overflow="hidden"
                cursor="pointer"
                onClick={() => setOpenSidenav(false)}
              >
                <HStack>
                  <Square
                    bgColor={
                      router.pathname.startsWith(url)
                        ? "brand.400"
                        : "brand.500"
                    }
                    color={
                      router.pathname.startsWith(url) ? "white" : "brand.400"
                    }
                    borderRadius="8px"
                    size="2rem"
                    fontSize=".65rem"
                  >
                    {icon}
                  </Square>
                  <Text
                    color={
                      router.pathname.startsWith(url)
                        ? "brand.200"
                        : "brand.300"
                    }
                    fontWeight={router.pathname.startsWith(url) ? "600" : "500"}
                    fontSize=".9rem"
                    pl=".5rem"
                    noOfLines={1}
                  >
                    {menuTitle}
                  </Text>
                  <Text display="none">{linkName}</Text>
                </HStack>
              </Box>
            </Link>
          )}
        </>
      )}
    </>
  );
}

export default Menus;
