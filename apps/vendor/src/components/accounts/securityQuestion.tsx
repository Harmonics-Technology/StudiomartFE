import React, { useState } from "react";
import {
  Flex,
  Box,
  Input,
  Button,
  Stack,
  HStack,
  Icon,
  Text,
} from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import AccountSideBar from "@components/accounts/AccountSideBar";
import register from "pages/register";
import { UpdateUserModel } from "src/services";
import {PrimaryInput }from "ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Link from "next/link";

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

export default function SecurityQuestion() {
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const handleSubmits = (e: any) => {
    e.preventDefault();
    alert(
      `firstname: ${firstname}, lastname: ${lastname}, Email: ${email}  phonenumber: ${phonenumber}`
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
  const areAllFieldsFilled = firstname != "" && lastname != "";
  return (
    <Stack
      direction="row"
      spacing={6}
      width="80%"
      my="3rem"
      mx="3rem"
      bgColor="white"
      p="5rem"
    >
      <AccountSideBar />
      <Box w="55%" fontFamily='"DM Sans", sans-serif'>
        <form>
          <Stack spacing={3}>
            <PrimaryInput<UpdateUserModel>
              label="Set a personal security question"
              type="text"
              placeholder="E.g What is your pet name?"
              name="phoneNumber"
              error={errors.phoneNumber}
              register={register}
              defaultValue={""}
            />
            <PrimaryInput<UpdateUserModel>
              label="Enter the answer"
              type="text"
              placeholder="E.g Cat"
              name="phoneNumber"
              error={errors.phoneNumber}
              register={register}
              defaultValue={""}
            />
            <PrimaryInput<UpdateUserModel>
              label="Please Enter Generated OTP"
              type="text"
              placeholder="Number"
              name="phoneNumber"
              error={errors.phoneNumber}
              register={register}
              defaultValue={""}
            />
            <PrimaryInput<UpdateUserModel>
              label="Please enter your password"
              type="text"
              placeholder="........"
              name="phoneNumber"
              error={errors.phoneNumber}
              register={register}
              defaultValue={""}
            />

            <Box marginTop={30}>
              <HStack spacing={15} mt={20}>
                <Link href="/vendor/account/bank-details" passHref>
                  <Button
                    disabled={!areAllFieldsFilled}
                    bgColor="brand.100"
                    color="white"
                    width="50%"
                    type="submit"
                  >
                    Back
                  </Button>
                </Link>
                <Link href="/vendor/account/notifications" passHref>
                  <Button
                    disabled={!areAllFieldsFilled}
                    bgColor="brand.100"
                    color="white"
                    width="50%"
                    type="submit"
                  >
                    Save
                  </Button>
                </Link>
              </HStack>
            </Box>
          </Stack>
        </form>
      </Box>
    </Stack>
  );
}
