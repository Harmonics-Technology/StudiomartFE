import {
  Box,
  Flex,
  HStack,
  ListIcon,
  ListItem,
  Square,
  Text,
  Link,
  UnorderedList,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiFillMinusCircle } from "react-icons/ai";
import { FaAngleDown } from "react-icons/fa";

interface MenuProps {
  menuTitle: string;
  linkName: string;
  icon: any;
  option: boolean;
  dropDown: any[];
  onClose: any;
}
function Menus({
  menuTitle,
  linkName,
  icon,
  option = false,
  dropDown,
  onClose,
}: MenuProps) {
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);
  const url = `/${linkName}`;
  // console.log({ url });

  return (
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
                mb="0"
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
              p={openMenu ? "1rem 0rem 0rem 1rem" : "0rem 1rem 1rem 0"}
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
                onClick={() => onClose()}
                fontSize="1rem"
                fontWeight="500"
                p=" .8rem 0.5rem .8rem 1.5rem"
                textTransform="capitalize"
                borderBottom="1px solid"
                borderColor="gray.300"
              >
                <ListIcon as={AiFillMinusCircle} color="black" />
                {x.id == "javascript:;" ? (
                  <Link
                    href={x.id}
                    _hover={{
                      textDecor: "none",
                    }}
                    onClick={() => {
                      // @ts-ignore
                      tidioChatApi.display(true);
                      //@ts-ignore
                      tidioChatApi.open();
                    }}
                  >
                    {x.name}
                  </Link>
                ) : (
                  <NextLink href={`${url}/${x.id}`}>{x.name}</NextLink>
                )}
              </ListItem>
            ))}
          </UnorderedList>
        </Box>
      ) : (
        <NextLink href={url} passHref>
          <Box overflow="hidden" cursor="pointer" onClick={() => onClose()}>
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
                  mb="0"
                >
                  {menuTitle}
                </Text>
                <Text display="none">{linkName}</Text>
              </HStack>
            </Flex>
          </Box>
        </NextLink>
      )}
    </>
  );
}

export default Menus;
