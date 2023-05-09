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
  name: Path<TFormValues>;
  register: UseFormRegister<TFormValues>;
  error: FieldError | undefined;
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
  validate?: any;
  borderRadius?: string;
}

const PrimaryInput = <TFormValues extends Record<string, any>>({
  name,
  register,
  error,
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
  validate = {},
  borderRadius = "4px",
}: FormProps<TFormValues>) => {
  return (
    <>
      <FormControl w="100%" mb="1rem" isInvalid={error as unknown as boolean}>
        <FormLabel fontSize=".8rem">{label}</FormLabel>
        <InputGroup w="100%">
          <Input
            type={type}
            // p="20px"
            placeholder={placeholder}
            {...register(name, { required, ...validate })}
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
          />
          {icon && (
            <InputRightElement
              onClick={() => changeVisibility()}
              cursor="pointer"
              color="brand.100"
              h="full"
            >
              {passwordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
            </InputRightElement>
          )}
        </InputGroup>
        <FormErrorMessage fontSize=".7rem" color="red">
          {(error?.type === "required" && `${label} is required`) ||
            error?.message}
        </FormErrorMessage>
      </FormControl>
    </>
  );
};

export default PrimaryInput;
