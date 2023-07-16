import { InputGroup, InputLeftElement, Icon, Input } from "@chakra-ui/react";
import React from "react";
import { BsSearch } from "react-icons/bs";

export const SearchInput = ({
  searchFn,
  border,
  placeholder = "Search studio by name, category",
}: {
  searchFn: any;
  border?: string;
  placeholder?: string;
}) => {
  return (
    <InputGroup
      // boxShadow="0px 4px 4px rgba(0, 0, 0, 0.2)"
      borderRadius="4px"
      h="4rem"
      alignItems="center"
      border={border}
    >
      <InputLeftElement pointerEvents="none" h="full">
        <Icon as={BsSearch} color="brand.100" />
      </InputLeftElement>
      <Input
        type="text"
        border="none"
        _focusVisible={{ outline: "none" }}
        _placeholder={{ fontSize: "1rem" }}
        placeholder={placeholder}
        overflow="hidden"
        h="full"
        onChange={(e: any) => searchFn(e.target.value)}
      />
      {/* <InputRightElement h="full" w="8rem">
      <Button
        h="full"
        w="full"
        bg="brand.100"
        color="white"
        size="sm"
        onClick={doGlobalSearch}
      >
        Search
      </Button>
    </InputRightElement> */}
    </InputGroup>
  );
};
