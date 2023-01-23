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
}: FormProps<TFormValues>) => {
  return (
    <>
      <FormControl w="100%" my="20px" isInvalid={error as unknown as boolean}>
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
            // p="20px"
            placeholder={placeholder}
            {...register(name, { required, ...validate })}
            w="100%"
            h="50px"
            defaultValue={defaultValue}
            fontWeight={fontWeight}
            borderRadius="4px"
            focusBorderColor={focusBorderColor ? focusBorderColor : "none"}
            borderColor="#DFDFE6"
            _placeholder={{
              fontSize: "14px",
            }}
          />
          {icon && (
            <InputRightElement
              onClick={() => changeVisibility()}
              cursor="pointer"
              color="#DFDFE6"
            >
              {passwordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
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
