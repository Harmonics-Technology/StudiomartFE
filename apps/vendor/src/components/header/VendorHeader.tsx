import {
  Avatar,
  Box,
  Button,
  Circle,
  Divider,
  Flex,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { UserContext } from "@components/Context/UserContext";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext } from "react";
import { BsChevronExpand } from "react-icons/bs";
import { FaAngleDown } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdNotifications } from "react-icons/md";
import { PiUserSwitchFill } from "react-icons/pi";
import { StudioView } from "src/services";
import { useComponentVisible } from "ui";

type Side = {
  setShowSide: any;
  showSide: boolean;
};

function VendorHeader({ setShowSide, showSide }: Side) {
  const { userStudios, user, setCurrentStudioId, currentStudioId, notifys } =
    useContext(UserContext);
  const router = useRouter();
  const messageCount = notifys?.size;

  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  const changeStudio = (value: any) => {
    setIsComponentVisible(false);
    router.push({
      query: {
        ...router.query,
        studio: value,
      },
    });
    setCurrentStudioId(value);
    Cookies.set("currentStudioId", value);
  };
  //
  //

  return (
    <Box w="full" bgColor="white" pos="sticky" top="0" zIndex={900}>
      <Box w="100%" ml="auto">
        <Box w="90%" mx="auto" py="1rem" display={{ base: "", lg: "none" }}>
          <GiHamburgerMenu
            size="25px"
            onClick={() => setShowSide((prev: any) => !prev)}
          />
        </Box>
        <Flex
          h={["fit-content", "5.5rem"]}
          align="center"
          justify="space-between"
          mx="auto"
          w="95%"
          // ml="auto"
          flexWrap="wrap"
          gap="1rem"
        >
          <Avatar
            src={user?.profilePicture}
            name={user?.fullName}
            size="md"
            border="1px solid gray"
          />
          <Box w={{ base: "100%", lg: "35%" }} order={[2, 1]}>
            <Box pos="relative" w="full" ref={ref}>
              <HStack
                border="1px solid"
                borderColor="gray.400"
                h="3rem"
                borderRadius="4px"
                gap="2rem"
                onClick={() => setIsComponentVisible((prev: boolean) => !prev)}
              >
                <HStack
                  bgColor="brand.100"
                  color="white"
                  px=".8rem"
                  h="full"
                  cursor="pointer"
                >
                  <Icon as={PiUserSwitchFill} />
                  <Text mb="0" fontWeight="600" fontSize=".9rem" noOfLines={1}>
                    Switch Studio
                  </Text>
                </HStack>
                <Text
                  mb="0"
                  fontSize="1rem"
                  fontWeight="600"
                  pointerEvents="none"
                  noOfLines={1}
                >
                  {
                    userStudios?.filter((x: any) => x.id == currentStudioId)[0]
                      ?.name
                  }
                </Text>
                <Icon as={BsChevronExpand} m="0 1rem 0 auto" cursor="pointer" />
              </HStack>
              {isComponentVisible && (
                <Box
                  w="full"
                  bgColor="white"
                  borderRadius="4px"
                  pos="absolute"
                  zIndex="888"
                  top="100%"
                  mt=".5rem"
                  border="1px solid"
                  borderColor="gray.400"
                >
                  <Box pos="relative">
                    <Box>
                      {userStudios?.filter(
                        (x: StudioView) => x.id !== currentStudioId
                      ).length > 0 ? (
                        <>
                          {userStudios
                            .filter((x: StudioView) => x.id !== currentStudioId)
                            .slice(0, 8)
                            .map((x: StudioView) => (
                              <Flex
                                key={x.id}
                                px="1rem"
                                cursor="pointer"
                                h="3rem"
                                align="center"
                                w="full"
                                borderBottom="1px solid"
                                borderColor="gray.100"
                                onClick={() => changeStudio(x.id)}
                                _hover={{
                                  bgColor: "brand.100",
                                  color: "white",
                                }}
                              >
                                <Text mb="0" noOfLines={1}>
                                  {x.name}
                                </Text>
                              </Flex>
                            ))}
                        </>
                      ) : (
                        <Text mb="0" noOfLines={1} p="1rem" fontSize=".9rem">
                          No More Studios to show
                        </Text>
                      )}
                    </Box>
                    <Button
                      bgColor="brand.100"
                      color="white"
                      h="3rem"
                      w="90%"
                      my="1rem"
                      borderRadius="8px"
                      left="5%"
                      onClick={() => {
                        router.push("/studio/all-studios");
                        setIsComponentVisible(false);
                      }}
                    >
                      View All
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
          <HStack order={[1, 2]}>
            <Box
              mr="0rem"
              pos="relative"
              cursor="pointer"
              onClick={() => router.push("/notification")}
            >
              <Box>
                <MdNotifications />
              </Box>
              <Circle
                bgColor={"brand.100"}
                size="1rem"
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
                  onClick={() => router.push("/studio/all-studios")}
                  justifyContent="center"
                  cursor="pointer"
                >
                  My Studios
                </MenuItem>
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
