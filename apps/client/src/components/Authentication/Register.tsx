import React, { useState } from "react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  Checkbox,
  Button,
  Icon,
} from "@chakra-ui/react";
import { PrimaryInput, SubmitButton } from "ui";
import { RegisterModel, UserService } from "src/services";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import YupPassword from "yup-password";
import toast from "react-hot-toast";
import Link from "next/link";
import { BsCheckCircle } from "react-icons/bs";
YupPassword(yup);

const validation = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().password(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const changeInputType = () => {
    setPasswordVisible(!passwordVisible);
  };
  const [terms, setTerms] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  console.log({ terms });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<RegisterModel>({
    resolver: yupResolver(validation),
    mode: "all",
  });

  const onSubmitRegister = async (data: RegisterModel) => {
    if (!terms) {
      toast.error("You have not accepted the terms and conditions");
      return;
    }
    // console.log({ data });
    try {
      const result = await UserService.create({ requestBody: data });
      console.log({ result });
      if (result.status) {
        toast.success(result.message as string);
        setSuccess(true);
        return;
      }
      toast.error(result.message as string);
      return;
    } catch (error: any) {
      toast.error(error?.body?.message || error?.message);
    }
  };

  return (
    <Flex
      border="2px hidden red"
      w="100%"
      minH="100vh"
      justify="center"
      align="center"
    >
      {success ? (
        <VStack w="40%" h="auto" p="3rem 3rem" boxShadow="lg">
          <Icon as={BsCheckCircle} color="green" fontSize="2rem" />
          <Heading>Successful!</Heading>
          <Text textAlign="center">
            Check your mail for further instructions
          </Text>
          <Link href="/" passHref>
            <Button w="full" h="3rem" bgColor="brand.100" color="white">
              Go to Home
            </Button>
          </Link>
        </VStack>
      ) : (
        <Flex w="100%" minH="100vh" border="2px hidden blue" color="white">
          <Box
            border="2px hidden green"
            display={["none", "none", "block"]}
            w="50%"
            h="auto"
            backgroundImage="/assets/login-hero.svg"
            backgroundRepeat="no-repeat"
            backgroundAttachment="fixed"
          >
            <Flex w="100%" alignItems="center" justifyContent="center" h="100%">
              <Box w="90%" mx="auto">
                <Heading
                  w="100%"
                  lineHeight={1.5}
                  fontSize="52px"
                  fontWeight={600}
                  mb="30px"
                >
                  Sign up to Studiomart
                </Heading>
                <Text w="100%" lineHeight={1.5} fontSize="28px">
                  Already have an account? You can <br />
                  <Link href="/login">Sign in here.</Link>
                </Text>
              </Box>
            </Flex>
          </Box>
          {/* info */}
          <Box
            w={["100%", "100%", "50%"]}
            border="4px hidden red"
            h={["100%", "100%", "100vh"]}
            color="black"
            overflow="hidden"
          >
            <Flex
              w="100%"
              alignItems="center"
              justifyContent="center"
              h="100%"
              border="2px hidden green"
            >
              <Box
                w={["90%", "75%"]}
                mx="auto"
                border="2px hidden blue"
                pos="relative"
                // h="90%"
              >
                <Flex
                  pos="absolute"
                  w="2rem"
                  h="2rem"
                  borderRadius="50%"
                  bgColor="gray.200"
                  justify="center"
                  align="center"
                >
                  <ChevronLeftIcon
                    onClick={() => console.log(5)}
                    fontSize="28px"
                    fontWeight={600}
                    cursor="pointer"
                  />
                </Flex>

                <Box w="100%">
                  <VStack spacing={3} w="100%" mt="20px">
                    <Heading fontWeight={600} fontSize="32px" lineHeight={1.5}>
                      Sign Up
                    </Heading>

                    <Text color="#54595E" lineHeight={1.5}>
                      Sign up to get started.
                    </Text>
                  </VStack>

                  <Box
                    w="100%"
                    h={["100%", "100%", "100%"]}
                    // border="2px hidden green"
                    overflow="auto"
                    py="15px"
                    pr="3px"
                  >
                    <form onSubmit={handleSubmit(onSubmitRegister)}>
                      <PrimaryInput<RegisterModel>
                        label="First Name"
                        type="text"
                        placeholder="Enter your first name"
                        name="firstName"
                        error={errors.firstName}
                        register={register}
                      />

                      <PrimaryInput<RegisterModel>
                        label="Last Name"
                        type="text"
                        placeholder="Enter your last name"
                        name="lastName"
                        error={errors.lastName}
                        register={register}
                      />

                      <PrimaryInput<RegisterModel>
                        label="Email Address"
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        error={errors.email}
                        register={register}
                      />

                      <PrimaryInput<RegisterModel>
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

                      <PrimaryInput<RegisterModel>
                        label="Re-enter password"
                        placeholder="Confirm your password"
                        type={passwordVisible ? "text" : "password"}
                        icon={true}
                        passwordVisible={passwordVisible}
                        changeVisibility={changeInputType}
                        name="confirmPassword"
                        error={errors.confirmPassword}
                        register={register}
                      />

                      <Flex
                        w="100%"
                        alignItems="flex-end"
                        justifyContent="flex-start"
                        my="10px"
                      >
                        <Checkbox
                          alignItems="center"
                          borderColor="none"
                          borderRadius="5px"
                          size="md"
                          onChange={(e) => setTerms(e.target.checked)}
                        >
                          I have read, undrestood and accept the{" "}
                          <span
                            style={{
                              color: "#1570FA",
                            }}
                          >
                            Terms and Conditions
                          </span>
                        </Checkbox>
                      </Flex>

                      <SubmitButton
                        textContent="sign up"
                        isLoading={isSubmitting}
                      />
                    </form>

                    <Text
                      fontSize={["14px", "16px"]}
                      display={["block", "block", "none"]}
                    >
                      Already have an account? You can
                      <Link href="/login">&nbsp;sign in here.</Link>
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Flex>
          </Box>
        </Flex>
      )}
    </Flex>
  );
};

export default Register;
