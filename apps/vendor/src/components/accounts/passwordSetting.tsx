import React, { useState } from "react";
import { Flex, Box, Button, HStack, Stack } from "@chakra-ui/react";
import PrimaryInput from "src/utils/PrimaryInput";
import { UpdateUserModel } from "src/services";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import AccountSideBar from "@components/accounts/AccountSideBar";


const schema = yup.object().shape({
  email: yup.string().email().required(),
});
export default function PasswordSetting() {
  const [bankname, setBankname] = useState<string>("");
  const [accountname, setAccountname] = useState("");
  const [accountnumber, setAccountnumber] = useState("");
  const handleSubmits = (e: any) => {
    e.preventDefault();
    alert(
      `bankname: ${bankname}, accountname: ${accountname}, accountnumber: ${accountnumber}`
    );
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<UpdateUserModel>({
    resolver: yupResolver(schema),
    mode: "all",
  });
  
  return (
    <Stack direction="row" spacing={6} width='80%' my='3rem' mx='3rem' bgColor='white' p='5rem'>
      <AccountSideBar />
      <Box w="55%" fontFamily='"DM Sans", sans-serif'>
        <form>
          <Stack spacing={3}>
            <PrimaryInput<UpdateUserModel>
              label="Old Password"
              type="text"
              placeholder="Enter your old password"
              name="phoneNumber"
              error={errors.phoneNumber}
              register={register}
              defaultValue={""}
            />
            <PrimaryInput<UpdateUserModel>
              label="New Password"
              type="text"
              placeholder="Enter your new password"
              name="phoneNumber"
              error={errors.phoneNumber}
              register={register}
              defaultValue={""}
            />
            <PrimaryInput<UpdateUserModel>
              label="Re-Type New Password"
              type="text"
              placeholder="Enter your new password"
              name="phoneNumber"
              error={errors.phoneNumber}
              register={register}
              defaultValue={""}
            />

            <Box marginTop={30}>
              <HStack>
                <Button
                  width="50%"
                  type="submit"
                  backgroundColor="brand.100"
                  color="white"
                >
                  Update Password
                </Button>
               
                  <Button
                    color="white"
                    width="50%"
                    type="submit"
                  >
                    Save
                  </Button>
               
              </HStack>
            </Box>
          </Stack>
        </form>
      </Box>
    </Stack>
  );
}
