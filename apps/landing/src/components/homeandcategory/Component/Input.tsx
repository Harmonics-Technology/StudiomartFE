import React from "react";
import { InputGroup, InputRightElement, Input, Button } from "@chakra-ui/react";

const PrimaryInput = () => {
  return (
    <div>
      <InputGroup
        background=" #FFFFFF"
        boxShadow="4px 4px 20px rgba(12, 12, 12, 0.1)"
        display="flex"
        border-radius=" 4px"
        p={["1rem", "1.5rem"]}
        w={["100%", "45rem"]}
        h={["2rem", "3.5rem"]}
        alignItems="center"
        justifyContent="center"
      >
        <Input
          type="text"
          _focus={{ border: "none", outline: "none" }}
          border="none"
          color="rgba(23, 23, 23, 0.52)"
          fontSize={[".75em", "1.32em"]}
          placeholder="Search studio by name, category"
        />
        <InputRightElement
          marginY={[".44rem", "em"]}
          marginX={[".5rem", ".8rem"]}
          pointerEvents="none"
          // eslint-disable-next-line react/no-children-prop
          children={
            <Button
              bgColor="brand.100"
              color="#fff"
              fontSize={[".5rem", "1rem"]}
              cursor="pointer"
              px={["2", "3rem"]}
              h={["6", "3.5rem"]}
              w={["8vw", "20vw"]}
            >
              Search
            </Button>
          }
        />
      </InputGroup>
    </div>
  );
};

export default PrimaryInput;
