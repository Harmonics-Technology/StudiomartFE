import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  Icon,
  InputRightElement,
  InputLeftElement,
  HStack,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import { FieldError, UseFormRegister, Path } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { HiInformationCircle } from "react-icons/hi2";

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
  otp?: any;
  left?: boolean;
  value?: any;
  toolTip?: any;
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
  otp,
  left = false,
  value,
  toolTip,
}: FormProps<TFormValues>) => {
  return (
    <>
      <FormControl
        w="100%"
        isInvalid={error as unknown as boolean}
        fontFamily="'DM Sans', sans-serif"
      >
        <HStack align="center" spacing="0" mb=".5rem">
          <FormLabel fontSize=".8rem" mb="0">
            {label}
          </FormLabel>
          {toolTip && (
            <Tooltip hasArrow p=".5rem" label={toolTip} borderRadius="4px">
              <span>
                <Icon as={HiInformationCircle} fontSize=".8rem" cursor="help" />
              </span>
            </Tooltip>
          )}
        </HStack>
        <InputGroup w="100%">
          {left && (
            <InputLeftElement
              cursor="pointer"
              h="full"
              fontSize=".9rem"
              fontWeight="500"
            >
              {<Icon as={value} />}
            </InputLeftElement>
          )}
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
              w="fit-content"
              fontSize=".8rem"
              right=".7rem"
              fontWeight="500"
            >
              {otp ? otp : passwordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
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
