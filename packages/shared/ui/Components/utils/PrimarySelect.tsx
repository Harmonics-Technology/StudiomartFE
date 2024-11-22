import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	HStack,
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
	h?: string;
	schema?: any;
}
export const PrimarySelect = <TFormValues extends Record<string, any>>({
	name,
	placeholder,
	register,
	required = false,
	validate = {},
	error,
	label = "",
	fontWeight = 500,
	options,
	defaultValue,
	mb = "0rem",
	focusBorderColor = "none",
	h = "2.8rem",
	schema,
}: FormInputProps<TFormValues>) => {
	const fieldDescription = schema?.fields[name]?.describe();
	const isRequired = fieldDescription?.tests.some(
		(test: any) => test.name === "required"
	);
	return (
		<>
			<FormControl
				w="100%"
				mb={mb}
				fontFamily="'DM Sans', sans-serif"
				isInvalid={error?.type === "required" || error?.message !== undefined}
			>
				<HStack align="center" spacing="0" mb=".5rem">
					<FormLabel
						w="100%"
						textTransform="capitalize"
						fontWeight={fontWeight}
						mb="5px"
						fontSize=".8rem"
					>
						{label}
					</FormLabel>
					{isRequired && (
						<FormLabel fontSize=".8rem" mb="0" color="red" h="12px">
							*
						</FormLabel>
					)}
				</HStack>

				<Select
					{...register(name, { required, ...validate })}
					icon={<TfiAngleDown color="#DFDFE6" fontSize=".8rem" />}
					placeholder={placeholder}
					w="100%"
					h={h}
					defaultValue={defaultValue}
					fontWeight={fontWeight}
					borderRadius="4px"
					focusBorderColor={focusBorderColor}
					borderColor="gray.400"
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
