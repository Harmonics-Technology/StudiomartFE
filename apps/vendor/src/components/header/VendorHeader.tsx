import {
  Flex,
  Box,
  Input,
  InputGroup,
  Image,
  InputLeftElement,
  Circle,
  HStack,
  Divider,
  Select,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Heading,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { FaAngleDown } from "react-icons/fa";
import { GoSettings } from "react-icons/go";
import Link from "next/link";
import { RiNotification3Fill, RiSearch2Fill } from "react-icons/ri";
import { UserContext } from "@components/Context/UserContext";
import { StudioView } from "src/services";
import { useRouter } from "next/router";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Cookies from "js-cookie";

function VendorHeader() {
  const { userStudios, user, setCurrentStudioId, currentStudioId } =
    useContext(UserContext);
  const router = useRouter();
  const changeStudio = (value: any) => {
    router.push({
      query: {
        ...router.query,
        studio: value,
      },
    });
    setCurrentStudioId(value);
    Cookies.set("currentStudioId", value);
  };
  console.log({ userStudios });
  // console.log(userStudios?.filter((x: any) => x.id == currentStudioId)[0].name);
  return (
    <Box w="full" bgColor="white">
      <Box w="100%" ml="auto">
        <Flex
          h="5.5rem"
          align="center"
          justify="space-between"
          mx="auto"
          w="95%"
        >
          {/* <Flex h="3rem" w="55%">
            <InputGroup>
              <InputLeftElement top=".4rem" color="#636363">
                <RiSearch2Fill />
              </InputLeftElement>
              <Input
                type="search"
                placeholder="search studio"
                h="full"
                borderRadius="5px 0 0 5px"
                w="100%"
                bgColor="#E8E8E8"
                _placeholder={{
                  color: "#636363",
                }}
              />
            </InputGroup>
            <Box
              bgColor="brand.100"
              color="white"
              px="1.5rem"
              borderRadius="0 5px 5px 0"
            >
              <Flex
                transform="rotate(90deg)"
                fontSize="1.5rem"
                fontWeight="bold"
                align="center"
                h="100%"
                cursor="pointer"
              >
                <GoSettings />
              </Flex>
            </Box>
          </Flex> */}
          <Box w="fit-content">
            <Select
              borderRadius="25px"
              border="2px"
              height="2.8rem"
              color="brand.100"
              fontWeight="600"
              fontFamily="BR Firma"
              onChange={(e) => changeStudio(e.target.value)}
            >
              <option selected hidden disabled>
                {
                  userStudios?.filter((x: any) => x.id == currentStudioId)[0]
                    ?.name
                }
              </option>
              {userStudios?.map((x: StudioView) => (
                <option value={x.id} key={x.id}>
                  {x.name}
                </option>
              ))}
            </Select>
          </Box>
          <HStack>
            <Box mr="1rem">
              <Link href="/notification" passHref>
                <a>
                  <RiNotification3Fill />
                </a>
              </Link>
            </Box>
            <Circle bgColor="brand.100" size="3rem" overflow="hidden">
              {user?.profilePicture ? (
                <Image
                  src={user.profilePicture}
                  objectFit="cover"
                  w="full"
                  h="full"
                  alt=""
                />
              ) : (
                <Heading fontSize="1.3rem" color="white">{`${user?.firstName.at(
                  0
                )}${user?.lastName.at(0)}`}</Heading>
              )}
            </Circle>
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<FaAngleDown />}
                bgColor="transparent"
                color="gray.400"
                _hover={{
                  bgColor: "transparent",
                }}
                _active={{
                  bgColor: "transparent",
                }}
              />
              <MenuList p="1rem">
                <MenuItem
                  mb=".5rem"
                  as="div"
                  onClick={() => router.push("/account")}
                  justifyContent="center"
                  cursor="pointer"
                >
                  My account
                </MenuItem>
                <MenuItem
                  as="a"
                  href="/studio"
                  bgColor="brand.100"
                  color="white"
                  justifyContent="center"
                  p="0"
                  h="2.6rem"
                  borderRadius="8px"
                >
                  Add new Studio
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </Flex>
      </Box>
      <Divider />
    </Box>
  );
}

export default VendorHeader;
