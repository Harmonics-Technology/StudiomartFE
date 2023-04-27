import React, { useState } from 'react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  Checkbox,
  Button,
  Icon,
<<<<<<< HEAD
} from "@chakra-ui/react";
import PrimaryInput from "src/utils/PrimaryInput";
import SubmitButton from "src/utils/SubmitButton";
import { RegisterModel, UserService } from "src/services";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import YupPassword from "yup-password";
import toast from "react-hot-toast";
import Link from "next/link";
import { BsCheckCircle } from "react-icons/bs";
=======
} from '@chakra-ui/react';
import PrimaryInput from 'src/utils/PrimaryInput';
import SubmitButton from 'src/utils/SubmitButton';
import { RegisterModel, UserService } from 'src/services';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import YupPassword from 'yup-password';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { BsCheckCircle } from 'react-icons/bs';
>>>>>>> b037c3a (worked on the ui)
YupPassword(yup);

const validation = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().password(),
  confirmPassword: yup
    .string()
<<<<<<< HEAD
    .oneOf([yup.ref("password"), null], "Passwords must match"),
=======
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
>>>>>>> b037c3a (worked on the ui)
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
<<<<<<< HEAD
    mode: "all",
=======
    mode: 'all',
>>>>>>> b037c3a (worked on the ui)
  });

  const onSubmitRegister = async (data: RegisterModel) => {
    if (!terms) {
<<<<<<< HEAD
      toast.error("You have not accepted the terms and conditions");
=======
      toast.error('You have not accepted the terms and conditions');
>>>>>>> b037c3a (worked on the ui)
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
<<<<<<< HEAD
            display={["none", "none", "block"]}
=======
            display={['none', 'none', 'block']}
>>>>>>> b037c3a (worked on the ui)
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
<<<<<<< HEAD
            w={["100%", "100%", "50%"]}
            border="4px hidden red"
            h={["100%", "100%", "100vh"]}
=======
            w={['100%', '100%', '50%']}
            border="4px hidden red"
            h={['100%', '100%', '100vh']}
>>>>>>> b037c3a (worked on the ui)
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
<<<<<<< HEAD
                w={["90%", "75%"]}
=======
                w={['90%', '75%']}
>>>>>>> b037c3a (worked on the ui)
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
<<<<<<< HEAD
                    h={["100%", "100%", "100%"]}
=======
                    h={['100%', '100%', '100%']}
>>>>>>> b037c3a (worked on the ui)
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
<<<<<<< HEAD
                        type={passwordVisible ? "text" : "password"}
=======
                        type={passwordVisible ? 'text' : 'password'}
>>>>>>> b037c3a (worked on the ui)
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
<<<<<<< HEAD
                        type={passwordVisible ? "text" : "password"}
=======
                        type={passwordVisible ? 'text' : 'password'}
>>>>>>> b037c3a (worked on the ui)
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
<<<<<<< HEAD
                          I have read, undrestood and accept the{" "}
                          <span
                            style={{
                              color: "#1570FA",
=======
                          I have read, undrestood and accept the{' '}
                          <span
                            style={{
                              color: '#1570FA',
>>>>>>> b037c3a (worked on the ui)
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
<<<<<<< HEAD
                      fontSize={["14px", "16px"]}
                      display={["block", "block", "none"]}
=======
                      fontSize={['14px', '16px']}
                      display={['block', 'block', 'none']}
>>>>>>> b037c3a (worked on the ui)
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
