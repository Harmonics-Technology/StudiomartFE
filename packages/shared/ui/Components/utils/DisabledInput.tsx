import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React from "react";
import CurrencyInput from "react-currency-input-field";
import { FieldError, UseFormRegister, Path } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface FormProps<TFormValues extends Record<string, unknown>> {
  label: string;
  icon?: boolean;
  type?: string;
  defaultValue?: any;
  fontWeight?: number | string;
  onChange?: any;
  placeholder?: string;
  passwordVisible?: boolean;
  changeVisibility?: any;
  focusBorderColor?: string;
  required?: boolean;
  disableLabel?: any;
  borderRadius?: string;
  value?: any;
  currency?: boolean;
  readonly?: boolean;
  h?: string;
}

const DisabledInput = <TFormValues extends Record<string, any>>({
  label,
  type = "text",
  onChange,
  placeholder,
  fontWeight,
  passwordVisible,
  defaultValue,
  changeVisibility,
  focusBorderColor,
  required = false,
  icon = false,
  disableLabel = false,
  borderRadius = "4px",
  value,
  currency = false,
  readonly,
  h = "2.8rem",
}: FormProps<TFormValues>) => {
  return (
    <>
      <FormControl w="100%">
        <FormLabel fontSize=".8rem">{label}</FormLabel>
        {currency ? (
          <CurrencyInput
            placeholder={placeholder}
            defaultValue={defaultValue}
            decimalsLimit={2}
            prefix="&#8358;"
            className="currency"
            disabled={disableLabel}
            onValueChange={onChange}
            value={value}
          />
        ) : (
          <InputGroup w="100%">
            <Input
              type={type}
              // p="20px"
              placeholder={placeholder}
              w="100%"
              h={h}
              defaultValue={defaultValue}
              fontWeight={fontWeight}
              borderRadius={borderRadius}
              focusBorderColor={focusBorderColor ? focusBorderColor : "none"}
              borderColor="gray.400"
              _placeholder={{
                fontSize: "14px",
              }}
              disabled={disableLabel}
              value={value}
              onChange={onChange}
              readOnly={readonly}
            />
            {icon && (
              <InputRightElement
                onClick={changeVisibility}
                cursor="pointer"
                color="brand.100"
                h="full"
              >
                {passwordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
              </InputRightElement>
            )}
          </InputGroup>
        )}
      </FormControl>
    </>
  );
};

export default DisabledInput;
