import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React from "react";

interface FormProps {
  label: string;
  type?: string;
  defaultValue?: string | number;
  fontWeight?: number;
  placeholder?: string;
  focusBorderColor?: string;
  borderColor?: string;
}

const PrimaryDate = ({
  label,
  placeholder,
  fontWeight,
  defaultValue,
  focusBorderColor,
  borderColor,
  type,
}: FormProps) => {
  return (
    <>
      <FormControl w="100%" mb="15px">
        <FormLabel
          w="100%"
          textTransform="capitalize"
          fontWeight={fontWeight ? fontWeight : 400}
          mb="5px"
          fontSize="14px"
        >
          {label}
        </FormLabel>

        <InputGroup w="100%">
          <Input
            type={type}
            p="20px"
            placeholder={placeholder}
            w="100%"
            h="40px"
            bg="white"
            defaultValue={defaultValue}
            fontWeight={fontWeight}
            borderRadius="4px"
            focusBorderColor={focusBorderColor ? focusBorderColor : "none"}
            borderColor={borderColor ? borderColor : "rgba(128, 128, 128, 1)"}
            _placeholder={{
              fontSize: "14px",
            }}
            _hover={{
              borderColor: borderColor,
            }}
          />
          {/* {icon && (
                        <InputRightElement
                            onClick={() => changeVisibility()}
                            cursor="pointer"
                            color="#DFDFE6"
                        >
                            
                        </InputRightElement>
                    )} */}
        </InputGroup>
      </FormControl>
    </>
  );
};

export default PrimaryDate;
