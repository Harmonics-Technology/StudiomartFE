import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import React from "react";

const Circles = () => {
  return (
    <Flex>
      <Box w="8px" h="8px" border="2px solid #DFDFE6" borderRadius="50%"></Box>
      <Box w="8px" h="8px" border="2px solid #DFDFE6" borderRadius="50%"></Box>
      <Box w="8px" h="8px" border="2px solid #DFDFE6" borderRadius="50%"></Box>
    </Flex>
  );
};

const Cvcinputgroup = () => {
  return (
    <>
      <FormControl w="100%" my="5px">
        <FormLabel
          w="100%"
          textTransform="capitalize"
          mb="5px"
          fontSize="14px"
        ></FormLabel>
        <InputGroup w="100%" display="flex">
          <InputLeftElement
            h="50px"
            // eslint-disable-next-line react/no-children-prop
            children={<Circles />}
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRight="1px solid #DFDFE6"
          />

          <Input
            w="100%"
            h="50px"
            borderRadius="4px"
            focusBorderColor="none"
            borderColor="#DFDFE6"
          />
        </InputGroup>
      </FormControl>
    </>
  );
};

export default Cvcinputgroup;
