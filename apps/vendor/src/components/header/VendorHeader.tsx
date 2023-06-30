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
  Avatar,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { FaAngleDown } from "react-icons/fa";
import { GoSettings } from "react-icons/go";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";
import { RiNotification3Fill, RiSearch2Fill } from "react-icons/ri";
import { UserContext } from "@components/Context/UserContext";
import { StudioView } from "src/services";
import { useRouter } from "next/router";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Cookies from "js-cookie";

type Side = {
  setShowSide: any;
  showSide: boolean;
};

function VendorHeader({ setShowSide, showSide }: Side) {
  const { userStudios, user, setCurrentStudioId, currentStudioId, notifys } =
    useContext(UserContext);
  const router = useRouter();
  const messageCount = notifys?.size;
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
  // console.log({ notifys });
  // console.log(userStudios?.filter((x: any) => x.id == currentStudioId)[0].name);
  return (
    <Box w="full" bgColor="white">
      <Box w="100%" ml="auto">
        <Box w="90%" mx="auto" pt="1rem" display={{ base: "", lg: "none" }}>
          <GiHamburgerMenu
            size="25px"
            onClick={() => setShowSide((prev: any) => !prev)}
          />
        </Box>
        <Flex
          h="5.5rem"
          align="center"
          justify="space-between"
          mx="auto"
          w="95%"
          // ml="auto"
        >
          <Avatar
            src={user?.profilePicture}
            name={user?.fullName}
            size="md"
            border="1px solid gray"
          />
          <Box w="fit-content">
            <Select
              borderRadius="25px"
              // border="2px"
              height="2.8rem"
              color="brand.100"
              fontWeight="600"
              fontFamily="BR Firma"
              border="0"
              // value={
              //   userStudios?.filter((x: any) => x.id == currentStudioId)[0]
              //     ?.name
              // }
              onChange={(e) => changeStudio(e.target.value)}
              _focusVisible={{
                border: 0,
              }}
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
            <Box mr="0rem" pos="relative" cursor="pointer">
              <Box onClick={() => router.push("/notification")}>
                <RiNotification3Fill />
              </Box>
              <Circle
                bgColor={"brand.100"}
                size=".8rem"
                display={messageCount <= 0 ? "none" : "flex"}
                fontSize=".5rem"
                color="white"
                fontWeight="bold"
                pos="absolute"
                justifyContent="center"
                top="-30%"
                right="-30%"
                border="1px solid white"
              >
                {messageCount}
                {/* <sup>+</sup> */}
              </Circle>
            </Box>

            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<FaAngleDown />}
                bgColor="transparent"
                // color="gray.700"
                _hover={{
                  bgColor: "transparent",
                }}
                _active={{
                  bgColor: "transparent",
                }}
              >
                Action
              </MenuButton>

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
