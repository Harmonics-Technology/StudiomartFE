import React from "react";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import {
  Controller,
  UseFormRegister,
  Path,
  FieldError,
  Control,
} from "react-hook-form";
import CurrencyInput from "react-currency-input-field";

interface FormInputProps<TFormValues extends Record<string, unknown>> {
  name: Path<TFormValues>;
  required?: boolean;
  disableLabel?: boolean;
  validate?: any;
  label?: string;
  register: UseFormRegister<TFormValues>;
  defaultValue?: string | number | undefined;
  error: FieldError | undefined;
  control: Control<TFormValues>;
  radios?: any;
  minDate?: any;
  placeholder?: string;
  fontSize?: string;
  icon?: any;
  value?: any;
}

export const CurrencyField = <TFormValues extends Record<string, any>>({
  name,
  required = false,
  label = "",
  register,
  validate = {},
  error,
  defaultValue,
  control,
  placeholder,
  fontSize,
  disableLabel,
  value,
}: FormInputProps<TFormValues>) => {
  return (
    <FormControl
      w="100%"
      fontFamily="'DM Sans', sans-serif"
      isInvalid={error?.type === "required" || error?.message !== undefined}
    >
      <FormLabel w="100%" textTransform="capitalize" mb="8px" fontSize=".8rem">
        {label}
      </FormLabel>
      <Controller
        render={({ field }) => (
          <CurrencyInput
            placeholder={placeholder}
            defaultValue={defaultValue}
            decimalsLimit={2}
            prefix="&#8358;"
            className="currency"
            disabled={disableLabel}
            onValueChange={(value) => field.onChange(value)}
            value={value}
          />
        )}
        name={name}
        control={control}
      />
      <FormErrorMessage fontSize=".7rem">
        {(error?.type === "required" && `${label} is required`) ||
          error?.message}
      </FormErrorMessage>
    </FormControl>
  );
};
