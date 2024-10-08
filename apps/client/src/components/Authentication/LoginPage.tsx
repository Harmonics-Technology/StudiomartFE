import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  Checkbox,
  Image,
  Link,
} from "@chakra-ui/react";
import { PrimaryInput, SubmitButton, LoginTypeBtn, sliderSets } from "ui";
import { LoginModel, OpenAPI, UserService } from "src/services";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import YupPassword from "yup-password";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { auth, signIn } from "@components/firebase/firebase";
import Slider from "react-slick";

YupPassword(yup);

const validation = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const changeInputType = () => {
    setPasswordVisible(!passwordVisible);
  };
  const router = useRouter();
  const [terms, setTerms] = useState<boolean>(false);
  const [loginType, setLoginType] = useState("Customer");
  const [step, setStep] = useState(0);
  // console.log({ terms });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginModel>({
    resolver: yupResolver(validation),
    mode: "all",
  });

  const onSubmitRegister = async (data: LoginModel) => {
    try {
      const result = await UserService.loginUser({ requestBody: data });
      console.log({ result });
      if (result.status) {
        if (terms) {
          Cookies.set(
            "isCustomer",
            JSON.stringify({
              email: data.email,
              pass: data.password,
              rememberMe: terms,
            })
          );
        }
        await signIn(auth, data.email as string, data.password as string);
        Cookies.set("customer", JSON.stringify(result.data));
        Cookies.set("user", "Customer");
        OpenAPI.TOKEN = result?.data?.token as string;
        result.data &&
          Cookies.set("customerToken", result.data.token as string);
        router.query.from
          ? (window.location.href = decodeURIComponent(
              router.query.from as unknown as string
            ))
          : (window.location.href = `/`);
        toast.success("Login Successful!", { className: "loginToast" });
        return;
      }
      toast.error(result.message as string, { className: "logonToast" });
      return;
    } catch (error: any) {
      toast.error(error?.body?.message || error?.message, {
        className: "loginToast",
      });
    }
  };

  useEffect(() => {
    const isUser = Cookies.get("isCustomer");
    if (isUser !== undefined) {
      const userDetails = JSON.parse(isUser as unknown as string);
      setTerms(userDetails.rememberMe);
      reset({
        email: userDetails.email,
        password: userDetails.pass,
      });
    }
  }, []);

  return (
    <Flex
      border="2px hidden red"
      w="100%"
      minH={{ base: "80vh", lg: "100vh" }}
      justify={{ base: "none", md: "space-between" }}
      align="center"
      // bgColor="#e0edff"
    >
      <Box
        w="55%"
        h="100vh"
        overflow="hidden"
        display={{ base: "none", lg: "block" }}
      >
        <Slider {...sliderSets}>
          <Image src="/assets/007.jpg" alt="any" w="full" objectFit="cover" />
          <Image src="/assets/003.jpg" alt="any" w="full" objectFit="cover" />
          <Image src="/assets/004.jpg" alt="any" w="full" objectFit="cover" />
          <Image src="/assets/005.jpg" alt="any" w="full" objectFit="cover" />
          <Image src="/assets/001.jpg" alt="any" w="full" objectFit="cover" />
          <Image src="/assets/007.jpg" alt="any" w="full" objectFit="cover" />
        </Slider>
        {/* <Image src="/assets/007.jpg" alt="any" w="full" objectFit="cover" /> */}
      </Box>
      <Flex
        w={{ base: "100%", md: "80%", lg: "50%" }}
        pos="relative"
        h="100%"
        align="center"
        mx="auto"
      >
        <Box
          w="full"
          bgColor="white"
          // borderRadius="30px"
          px={{ base: "2rem", lg: "4rem" }}
          mt=".5rem"
          py="1rem"
          // boxShadow="0px 20px 26px rgba(186, 182, 182, 0.16)"
        >
          <Flex
            w="10%"
            justify="center"
            mx="auto"
            mb="2rem"
            onClick={() => (window.location.href = "/")}
          >
            <Image src="/logofav.png" w="full" alt="logo" />
          </Flex>
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
              Glad to have you back!
            </Heading>

            {/* <Text color="#54595E" lineHeight={1.5}>
              Sign up to get started.
            </Text> */}
            <Text
              fontSize={["14px", "16px"]}
              display={["block", "block", "block"]}
              textAlign="center"
              fontWeight="600"
            >
              Do not have an account?
              <Link href="/register" color="brand.100">
                &nbsp;Sign up here.
              </Link>
            </Text>
            {/* 
            <LoginTypeBtn
              loginOption={[
                {
                  text: "Customer",
                  url: `${process.env.NEXT_PUBLIC_CLIENT_URL as string}/login`,
                },
                {
                  text: "Vendor",
                  url: `${process.env.NEXT_PUBLIC_VENDOR_URL as string}/login`,
                },
              ]}
              loginType={loginType}
            /> */}
          </VStack>
          <Box
            w="100%"
            h={["100%", "100%", "100%"]}
            // border="2px hidden green"
            overflow="auto"
            py="15px"
            pr="3px"
          >
            {loginType == "Vendor" ? (
              <></>
            ) : (
              <form onSubmit={handleSubmit(onSubmitRegister)}>
                <VStack gap=".5rem" w="full">
                  <PrimaryInput<LoginModel>
                    label="Email Address"
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    error={errors.email}
                    register={register}
                  />
                  <PrimaryInput<LoginModel>
                    label="Password"
                    placeholder="Enter your password"
                    type={passwordVisible ? "text" : "password"}
                    icon={true}
                    passwordVisible={passwordVisible}
                    changeVisibility={changeInputType}
                    name="password"
                    error={errors.password}
                    register={register}
                  />
                </VStack>
                <Flex
                  w="100%"
                  alignItems="flex-end"
                  justifyContent="space-between"
                  my="1rem"
                >
                  <Checkbox
                    alignItems="center"
                    borderColor="none"
                    borderRadius="5px"
                    size="md"
                    onChange={() => setTerms(!terms)}
                    isChecked={terms}
                  >
                    Remember me
                  </Checkbox>
                  <Link href="/password/reset">Forgot Password</Link>
                </Flex>

                <SubmitButton
                  textContent="sign in"
                  isLoading={isSubmitting}
                  isValid={isValid}
                />
              </form>
            )}

            <Text
              fontSize={["14px", "14px"]}
              display={["block", "block", "block"]}
              textAlign="center"
              mt="1rem"
              color="#3e3e3e"
              fontWeight="500"
            >
              &copy; StudioMart 2022. All Rights Reserved.
              {/* <Link href="/login" color="brand.100">
                &nbsp;Sign in here.
              </Link> */}
            </Text>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};
