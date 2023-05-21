import React from "react";
import {
  Text,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Icon,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";

export const MenuDropdown = ({ menus }: any) => {
  return (
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
        {menus.map((x: any) => (
          <MenuItem
            borderBottom="1px solid"
            borderColor="gray.300"
            as="div"
            display="flex"
            gap=".5rem"
            py=".6rem"
            color={x.color}
            onClick={x.onclick}
          >
            <Icon as={x.icon} />
            <Text mb="0">{x.label}</Text>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
