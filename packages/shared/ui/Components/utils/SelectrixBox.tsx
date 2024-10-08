import React from "react";
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import { Control, Controller, FieldError, Path } from "react-hook-form";
interface select {
  options: [];
  customKeys: { key: string | number | boolean; label: string };
  onChange: (value: any) => void;
  placeholder?: string;
  disabled?: boolean;
  searchable?: boolean;
  onRenderSelection?: any;
  onRenderOption?: any;
}
import dynamic from "next/dynamic";
//@ts-ignore
const Selectrix = dynamic<select>(() => import("react-selectrix"), {
  ssr: false,
});

interface FormInputProps<TFormValues extends Record<string, unknown>> {
  name: Path<TFormValues>;
  placeholder?: string;
  error: FieldError | undefined;
  label?: string;
  fontSize?: string;
  options: any;
  keys: any;
  keyLabel: any;
  control: Control<TFormValues>;
  disabled?: boolean;
  renderSelection?: any;
  customOnchange?: any;
  searchable?: boolean;
  renderOption?: any;
  withIcon?: any;
}
export const SelectrixBox = <TFormValues extends Record<string, any>>({
  name,
  placeholder,
  error,
  label = "",
  fontSize = ".8rem",
  options,
  keys,
  keyLabel,
  control,
  disabled,
  renderSelection,
  customOnchange,
  searchable = false,
  renderOption,
  withIcon = false,
}: FormInputProps<TFormValues>) => {
  // console.log({ customOnchange });
  return (
    <FormControl isInvalid={error?.type === "required"} minW="0">
      {label && (
        <FormLabel
          htmlFor={label}
          textTransform="capitalize"
          fontSize={fontSize}
        >
          {label}
        </FormLabel>
      )}

      <Controller
        render={({ field: { onChange } }) => (
          // @ts-ignore
          <Selectrix
            options={options}
            placeholder={placeholder}
            disabled={disabled}
            customKeys={{
              key: keys,
              label: keyLabel,
            }}
            onChange={
              customOnchange ? customOnchange : (value) => onChange(value.key)
            }
            searchable={searchable}
            onRenderSelection={renderSelection ? renderSelection : false}
            onRenderOption={renderOption}
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
