import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { FieldError, Path, UseFormRegister } from "react-hook-form";
import { TfiAngleDown } from "react-icons/tfi";

interface FormInputProps<TFormValues extends Record<string, unknown>> {
  name: Path<TFormValues>;
  placeholder?: string;
  register: UseFormRegister<TFormValues>;
  required?: boolean;
  validate?: any;
  error: FieldError | undefined;
  label?: string;
  fontWeight?: number;
  options: any;
  defaultValue?: any;
  mb?: any;
  focusBorderColor?: any;
}
export const PrimarySelect = <TFormValues extends Record<string, any>>({
  name,
  placeholder,
  register,
  required = false,
  validate = {},
  error,
  label = "",
  fontWeight = 400,
  options,
  defaultValue,
  mb = "1rem",
  focusBorderColor = "none",
}: FormInputProps<TFormValues>) => {
  return (
    <>
      <FormControl
        w="100%"
        mb={mb}
        isInvalid={error?.type === "required" || error?.message !== undefined}
      >
        <FormLabel
          w="100%"
          textTransform="capitalize"
          fontWeight={fontWeight}
          mb="5px"
          fontSize="14px"
        >
          {label}
        </FormLabel>

        <Select
          {...register(name, { required, ...validate })}
          icon={<TfiAngleDown color="#DFDFE6" fontSize=".8rem" />}
          placeholder={placeholder}
          w="100%"
          h="2.8rem"
          defaultValue={defaultValue}
          fontWeight={fontWeight}
          borderRadius="4px"
          focusBorderColor={focusBorderColor}
          borderColor="#DFDFE6"
          _placeholder={{
            fontSize: "14px",
          }}
        >
          {options}
        </Select>
        <FormErrorMessage fontSize=".7rem">
          {(error?.type === "required" && `${label} is required`) ||
            error?.message}
        </FormErrorMessage>
      </FormControl>
    </>
  );
};

export default PrimarySelect;
