import React from "react";
import {
  Box,
  Container,
  Avatar,
  Grid,
  Text,
  Flex,
  SimpleGrid,
  Image,
  HStack,
  Stack,
  Button,
  Circle,
  VStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Icon,
} from "@chakra-ui/react";
// import { NotificationTop } from "src/utils/NotificationTop";
import {
  BsCheckAll,
  BsFillTrashFill,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  NotificationService,
  NotificationView,
  NotificationViewPagedCollection,
} from "src/services";
import TopPage from "src/utils/TopPage";
import moment from "moment";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { Pagination } from "ui";
import Link from "next/link";

interface notificationProps {
  notifications: NotificationViewPagedCollection;
}
const Notification = ({ notifications }: notificationProps) => {
  const router = useRouter();
  const markAsReadFunction = async (data: string) => {
    try {
      const result = await NotificationService.markAsRead({ id: data });
      if (result.status) {
        toast.success("Successful!");
        router.reload();
        return;
      }
      toast.error(result.message as string);
    } catch (error: any) {
      toast.error(error?.body?.message || error?.message, {
        className: "loginToast",
      });
    }
  };
  const deleteFunction = async (data: string) => {
    try {
      const result = await NotificationService.deleteNotification({ id: data });
      if (result.status) {
        toast.success("Successful!");
        router.reload();
        return;
      }
      toast.error(result.message as string);
    } catch (error: any) {
      toast.error(error?.body?.message || error?.message, {
        className: "loginToast",
      });
    }
  };
  // console.log({ notifications });
  return (
    <Box fontFamily="DM Sans">
      <Box>
        <TopPage
          page={"Notification"}
          details={"Welcome to your dashboard"}
          right={false}
        />
      </Box>

      <Box
        w="95%"
        my="8"
        bgColor="white"
        mx="auto"
        px="2rem"
        py="2rem"
        borderRadius="20px"
      >
        {(notifications?.value as any)?.length > 0 ? (
          <SimpleGrid bg="white">
            {notifications?.value?.map((info: NotificationView) => (
              <Flex
                w="full"
                justify="space-between"
                borderBottom="0.8px solid #D4DDDF"
                key={info.id}
                py="1rem"
              >
                <Flex align="center" gap="1.5rem" w="70%">
                  <Circle
                    bgColor={info.isRead ? "gray.200" : "brand.100"}
                    size="10px"
                  />
                  <Avatar src="#" name={info?.user?.fullName || ""} />
                  <Text
                    pr="4rem"
                    fontWeight="400"
                    mb="0"
                    color={info.isRead ? "gray.300" : "black"}
                  >
                    {info.message}
                    <Link passHref href={(info.url as string) || ""}>
                      <Text
                        as="a"
                        color={info.isRead ? "gray.200" : "brand.100"}
                        mb="0"
                        pl=".3rem"
                        display="inline"
                        cursor="pointer"
                      >
                        View
                      </Text>
                    </Link>
                  </Text>
                </Flex>
                <VStack gap=".7rem" ml="auto">
                  <Menu>
                    <MenuButton
                      as={Button}
                      rightIcon={<BsThreeDotsVertical />}
                      bgColor="transparent"
                      color="gray.800"
                      _hover={{
                        bgColor: "transparent",
                      }}
                      _active={{
                        bgColor: "transparent",
                      }}
                    />
                    <MenuList borderRadius="8px" p="0">
                      <MenuItem
                        borderBottom="1px solid"
                        borderColor="gray.300"
                        as="div"
                        display="flex"
                        gap=".5rem"
                        py=".6rem"
                        onClick={() => markAsReadFunction(info.id as string)}
                      >
                        <Icon as={BsCheckAll} />
                        <Text mb="0"> Mark as read</Text>
                      </MenuItem>
                      <MenuItem
                        as="div"
                        display="flex"
                        gap=".5rem"
                        color="red"
                        py=".6rem"
                        onClick={() => deleteFunction(info.id as string)}
                      >
                        <Icon as={BsFillTrashFill} />
                        <Text mb="0"> Delete Notification</Text>
                      </MenuItem>
                    </MenuList>
                  </Menu>
                  <Text fontSize="10px">
                    {moment(info.dateCreated).fromNow()}
                  </Text>
                </VStack>
              </Flex>
            ))}

            {/* <HStack justifyContent="center" mt="3rem"> */}
            <Pagination data={notifications} />
            {/* </HStack> */}
          </SimpleGrid>
        ) : (
          <Flex
            w="30%"
            overflow="hidden"
            align="center"
            justify="center"
            mx="auto"
            h="28rem"
          >
            <Image src="/assets/empty.png" alt="image" w="full" />
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default Notification;
