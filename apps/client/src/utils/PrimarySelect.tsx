import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import React from "react";
import { BsFillCaretDownFill } from "react-icons/bs";

interface FormProps {
    label?: string;
    defaultValue?: string | number;
    fontWeight?: string;
    icon?: boolean;
    placeholder?: string;
    focusBorderColor?: string;
    options: any;
    my?: string;
}

const PrimarySelect = ({
    label,
    placeholder,
    fontWeight,
    defaultValue,
    focusBorderColor,
    options,
    my = "20px",
}: FormProps) => {
    return (
        <>
            <FormControl w="100%" my={my}>
                <FormLabel
                    w="100%"
                    textTransform="capitalize"
                    fontWeight={fontWeight ? fontWeight : 400}
                    mb="5px"
                    fontSize="14px"
                >
                    {label}
                </FormLabel>

                <Select
                    icon={<BsFillCaretDownFill color="#DFDFE6" />}
                    placeholder={placeholder}
                    w="100%"
                    h="50px"
                    defaultValue={defaultValue}
                    fontWeight={fontWeight}
                    borderRadius="4px"
                    focusBorderColor={
                        focusBorderColor ? focusBorderColor : "none"
                    }
                    borderColor="#DFDFE6"
                    _placeholder={{
                        fontSize: "14px",
                    }}
                >
                    {options.map((x: any, index: any) => (
                        <option key={index} value={x}>
                            {x}
                        </option>
                    ))}
                </Select>
            </FormControl>
        </>
    );
};

export default PrimarySelect;
