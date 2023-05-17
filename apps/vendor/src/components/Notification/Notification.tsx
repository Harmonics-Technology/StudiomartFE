import React from "react";
import {
  Box,
  Container,
  Avatar,
  Grid,
  Text,
  Flex,
  SimpleGrid,
  Spacer,
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
      }
      toast.error(result.message as string);
    } catch (error: any) {
      toast.error(error?.body?.message || error?.message, {
        className: "loginToast",
      });
    }
  };
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
        <SimpleGrid bg="white">
          {notifications?.value?.map((info: NotificationView) => (
            <>
              <Flex
                w="full"
                justify="space-between"
                borderBottom="0.8px solid #D4DDDF"
                key={info.id}
                py="1rem"
              >
                <Flex align="center" gap="1.5rem" w="70%">
                  <Circle bgColor="brand.100" size="10px" />
                  <Avatar src="#" />
                  <Text
                    pr="4rem"
                    fontWeight="400"
                    mb="0"
                    color={info.isRead ? "gray.200" : "black"}
                  >
                    {info.message}
                    <Text
                      as="a"
                      href={info.url as string}
                      color={info.isRead ? "gray.200" : "brand.100"}
                      mb="0"
                    >
                      View
                    </Text>
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
            </>
          ))}

          <HStack justifyContent="center" mt="3rem">
            <Pagination data={notifications} />
          </HStack>
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Notification;
