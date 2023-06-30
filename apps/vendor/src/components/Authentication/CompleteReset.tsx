import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  Link,
  Image,
  Button,
  Icon,
} from "@chakra-ui/react";
import { DisabledInput, PrimaryInput, SubmitButton } from "ui";
import {
  InitiateResetModel,
  LoginModel,
  PasswordReset,
  UserService,
} from "src/services";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import YupPassword from "yup-password";
import toast from "react-hot-toast";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useRouter } from "next/router";
import { BsCheckCircle } from "react-icons/bs";
YupPassword(yup);

const validation = yup.object().shape({
  newPassword: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("New password is required"),
});

export const CompleteReset = ({ code }: { code: any }) => {
  const router = useRouter();
  const [retypePassword, setretypePassword] = useState<boolean>(false);
  const [confirmpassword, setConfirmPassword] = useState<string>();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const changeInputType = () => {
    setPasswordVisible(!passwordVisible);
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<PasswordReset>({
    resolver: yupResolver(validation),
    mode: "all",
  });

  const onSubmit = async (data: PasswordReset) => {
    if (data.newPassword != confirmpassword) {
      toast.error("Password do not match", { className: "loginToast" });
      return;
    }
    try {
      const result = await UserService.completeReset({ requestBody: data });
      if (result.status) {
        toast.success(
          "Password reset successful, you will be redirected to login",
          { className: "loginToast" }
        );
        router.push("/login");
        return;
      }
      toast.error(result.message as string, { className: "loginToast" });
    } catch (error: any) {
      toast.error(error.message || error.body.message, {
        className: "loginToast",
      });
    }
  };

  return (
    <Flex
      border="2px hidden red"
      w="100%"
      minH="100vh"
      justify="space-between"
      align="center"
      // bgColor="#e0edff"
    >
      <Box w="55%" h="100vh" overflow="hidden" pos="relative">
        <Box w="30%" pos="absolute" top="2rem" left="3rem">
          <Image src="/assets/studiomart.png" w="full" alt="logo" />
        </Box>
        <Carousel
          showStatus={false}
          autoPlay
          infiniteLoop
          animationHandler="fade"
          useKeyboardArrows
          showArrows={false}
          showThumbs={false}
          showIndicators={false}
          stopOnHover={false}
          interval={5000}
        >
          <Image src="/assets/007.jpg" alt="any" w="full" objectFit="cover" />
          <Image src="/assets/003.jpg" alt="any" w="full" objectFit="cover" />
          <Image src="/assets/004.jpg" alt="any" w="full" objectFit="cover" />
          <Image src="/assets/005.jpg" alt="any" w="full" objectFit="cover" />
          <Image src="/assets/001.jpg" alt="any" w="full" objectFit="cover" />
          <Image src="/assets/007.jpg" alt="any" w="full" objectFit="cover" />
        </Carousel>
      </Box>
      <Flex w="50%" pos="relative" h="100vh" align="center">
        <Box
          w="full"
          bgColor="white"
          // borderRadius="30px"
          px="4rem"
          mt=".5rem"
          py="1rem"
          // boxShadow="0px 20px 26px rgba(186, 182, 182, 0.16)"
        >
          <VStack spacing={0} gap="1.5rem" w="100%" mb="10px">
            <Heading
              fontWeight={700}
              fontSize="30px"
              // lineHeight={"44px"}
              color="black"
              textTransform="capitalize"
              textAlign="center"
              mx="auto"
              w="80%"
            >
              Reset Password!
            </Heading>

            {/* <Text color="#54595E" lineHeight={1.5}>
              Sign up to get started.
            </Text> */}
            {/* <Text
              fontSize={["14px", "16px"]}
              display={["block", "block", "block"]}
              textAlign="center"
              fontWeight="600"
            >
              Own an account?
              <Link href="/login" color="brand.100">
                &nbsp;Sign in here.
              </Link>
            </Text> */}
          </VStack>
          <Box
            w="100%"
            h={["100%", "100%", "100%"]}
            // border="2px hidden green"
            overflow="auto"
            py="15px"
            pr="3px"
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack gap="1rem">
                <PrimaryInput<PasswordReset>
                  label="New Password"
                  name="newPassword"
                  error={errors.newPassword}
                  register={register}
                  placeholder="Enter your password"
                  type={passwordVisible ? "text" : "password"}
                  icon={true}
                  passwordVisible={passwordVisible}
                  changeVisibility={changeInputType}
                />

                <DisabledInput<any>
                  label="Confirm Password"
                  type={retypePassword ? "text" : "password"}
                  icon={true}
                  passwordVisible={retypePassword}
                  changeVisibility={() => setretypePassword((prev) => !prev)}
                  placeholder="Enter your new password"
                  defaultValue={""}
                  onChange={(e: any) => setConfirmPassword(e.target.value)}
                />
                <SubmitButton
                  textContent="Change Password"
                  isLoading={isSubmitting}
                />
              </VStack>
            </form>

            <Text
              fontSize={["14px", "14px"]}
              display={["block", "block", "block"]}
              textAlign="center"
              mt="1rem"
              color="#3e3e3e"
              fontWeight="500"
            >
              &copy; StudioMart 2022. All Rights Reserved.
            </Text>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};
