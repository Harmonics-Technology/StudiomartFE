import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React from "react";
import { FieldError, UseFormRegister, Path } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface FormProps<TFormValues extends Record<string, unknown>> {
  label: string;
  type?: string;
  defaultValue?: any;
  fontWeight?: number | string;
  icon?: boolean;
  placeholder?: string;
  passwordVisible?: boolean;
  changeVisibility?: any;
  focusBorderColor?: string;
  required?: boolean;
  disableLabel?: any;
  borderRadius?: string;
}

const DisabledInput = <TFormValues extends Record<string, any>>({
  label,
  type = "text",
  icon = false,
  placeholder,
  fontWeight,
  passwordVisible,
  defaultValue,
  changeVisibility,
  focusBorderColor,
  required = false,
  disableLabel = {},
  borderRadius = "4px",
}: FormProps<TFormValues>) => {
  return (
    <>
      <FormControl w="100%" mb="1rem">
        <FormLabel fontSize=".8rem">{label}</FormLabel>
        <InputGroup w="100%">
          <Input
            type={type}
            // p="20px"
            placeholder={placeholder}
            w="100%"
            h="2.8rem"
            defaultValue={defaultValue}
            fontWeight={fontWeight}
            borderRadius={borderRadius}
            focusBorderColor={focusBorderColor ? focusBorderColor : "none"}
            borderColor="gray.400"
            _placeholder={{
              fontSize: "14px",
            }}
            disabled={disableLabel}
          />
        </InputGroup>
      </FormControl>
    </>
  );
};

export default DisabledInput;