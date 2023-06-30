import React from "react";

import { Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";

interface ICheckbox {
  checked?: any;
  onChange?: any;
  label?: string;
  mb?: string;
  disabled?: boolean;
  dir?: any;
}

function CustomCheckbox({
  checked,
  onChange,
  label,
  mb,
  disabled,
  dir,
}: ICheckbox) {
  return (
    <FormControl w="auto">
      <Flex gap=".9rem" fontWeight="500" mb={mb}>
        {dir == "ltr" && (
          <FormLabel fontSize=".9rem" m="0">
            {label}
          </FormLabel>
        )}
        <input
          type="checkbox"
          className="formcheck"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          value={checked}
        />
        {dir == "rtl" && (
          <FormLabel fontSize=".9rem" m="0">
            {label}
          </FormLabel>
        )}
      </Flex>
    </FormControl>
  );
}

export default CustomCheckbox;
