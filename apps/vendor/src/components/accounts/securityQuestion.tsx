import React, { useContext, useEffect, useState } from "react";
import {
  Flex,
  Box,
  Button,
  Stack,
  VStack,
  Spinner,
  Text,
} from "@chakra-ui/react";
import AccountSideBar from "@components/accounts/AccountSideBar";
import { SecurityQuestionModel, StudioView, UserService } from "src/services";
import { getDeviceFromUserAgent, PrimaryInput } from "ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { UserContext } from "@components/Context/UserContext";
import AccountContainer from "./AccountContainer";

const schema = yup.object().shape({
  question: yup.string().required(),
  answer: yup.string().required(),
  otp: yup.string().required(),
  password: yup.string().required(),
});

interface SecurityQuestionProps {
  userId: string;
  userQuestion: any;
}

export default function SecurityQuestion({
  userId,
  userQuestion,
}: SecurityQuestionProps) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SecurityQuestionModel>({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: {
      userId,
    },
  });
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userQuest, setUserQuest] = useState<any>(userQuestion);
  const onSubmit = async (data: SecurityQuestionModel) => {
    try {
      const result = await UserService.createSecurityQuestion({
        requestBody: data,
      });
      if (result.status) {
        toast.success(
          "Your information has been saved successfully and will reload shortly"
        );
        router.reload();
        return;
      }
      toast.error(result.message as string);
      return;
    } catch (error: any) {
      toast.error(error?.body?.message || error?.message, {
        className: "loginToast",
      });
    }
  };
  const getOtp = async () => {
    setIsLoading(true);
    try {
      const result = await UserService.getOtp({});
      if (result.status) {
        setIsLoading(false);
        toast.success("OTP sent, Check your email", {
          className: "loginToast",
        });
        return;
      }
      setIsLoading(false);
      toast.error(result.message as string, {
        className: "loginToast",
      });
      return;
    } catch (error: any) {
      toast.error(error?.body?.message || error?.message, {
        className: "loginToast",
      });
    }
  };

  const { device } = useContext(UserContext);
  console.log({ device });
  return (
    <AccountContainer>
      {userQuest?.message && (
        <Text
          textAlign="right"
          color="brand.100"
          fontSize=".8rem"
          cursor="pointer"
          onClick={() => setUserQuest(undefined)}
        >
          Change Security Question
        </Text>
      )}
      {userQuest?.message && (
        <Box w="full" h="80vh" pos="absolute" zIndex="888" />
      )}
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <VStack gap="1rem">
          <PrimaryInput<SecurityQuestionModel>
            label="Set a personal security question."
            type="text"
            placeholder="what is your pet name"
            name="question"
            error={errors.question}
            register={register}
            defaultValue={userQuest?.message}
          />
          <PrimaryInput<SecurityQuestionModel>
            label="Enter the answer"
            type="text"
            placeholder="cat"
            name="answer"
            error={errors.answer}
            register={register}
            // defaultValue={user?.lastName}
          />
          <PrimaryInput<SecurityQuestionModel>
            label="Please Enter Generated OTP"
            type="text"
            placeholder="489752"
            name="otp"
            error={errors.otp}
            register={register}
            defaultValue={""}
            icon={true}
            changeVisibility={getOtp}
            otp={isLoading ? <Spinner size="sm" /> : "Get OTP"}
          />
          <PrimaryInput<SecurityQuestionModel>
            label="Please enter your password"
            placeholder="......"
            type={passwordVisible ? "text" : "password"}
            icon={true}
            passwordVisible={passwordVisible}
            changeVisibility={() => setPasswordVisible((prev) => !prev)}
            name="password"
            error={errors.password}
            register={register}
          />

          <Flex justifyContent="flex-end" w="full">
            <Button
              disabled={!isValid}
              bgColor="brand.100"
              color="white"
              width="100%"
              type="submit"
              isLoading={isSubmitting}
              h="3rem"
            >
              Save
            </Button>
          </Flex>
        </VStack>
      </form>
    </AccountContainer>
  );
}
