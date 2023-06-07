import React, { useEffect, useState } from 'react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  Checkbox,
  HStack,
} from '@chakra-ui/react';
import { PrimaryInput, SubmitButton } from 'ui';
import { LoginModel, UserService } from 'src/services';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import YupPassword from 'yup-password';
import toast from 'react-hot-toast';
import Link from 'next/link';
import Cookies from 'js-cookie';
YupPassword(yup);

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().password(),
});

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const changeInputType = () => {
    setPasswordVisible(!passwordVisible);
  };
  const [terms, setTerms] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<any>({});
  useEffect(() => {
    if (Cookies.get('hash') !== undefined) {
      setLoggedIn(JSON.parse(Cookies.get('hash') as string));
    }
  }, []);
  console.log({ loggedIn });
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<LoginModel>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const onSubmit = async (data: LoginModel) => {
    const logged = {
      email: data.email,
      password: data.password,
    };
    try {
      const result = await UserService.loginUser({ requestBody: data });
      if (result.status) {
        toast.success('Login Successful!');
        Cookies.set('user', JSON.stringify(result.data));
        if (terms) {
          Cookies.set('hash', JSON.stringify(logged), {
            expires: 10,
          });
        }
        window.location.href = '/customer';
        return;
      }
      toast.error(result.message as string);
      return;
    } catch (err: any) {
      toast.error(err.message || err.body.message);
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
      <Flex w="100%" minH="100vh" border="2px hidden blue" color="white">
        <Box
          border="2px hidden green"
          display={['none', 'none', 'block']}
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
                Do not have an account? You can <br />
                <Link href="/register">Sign up here.</Link>
              </Text>
            </Box>
          </Flex>
        </Box>
        {/* info */}
        <Box
          w={['100%', '100%', '50%']}
          border="4px hidden red"
          h={['100%', '100%', '100vh']}
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
              w={['90%', '75%']}
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
                    Sign In
                  </Heading>

                  <Text color="#54595E" lineHeight={1.5}>
                    Glad to have you back!.
                  </Text>
                </VStack>

                <Box
                  w="100%"
                  h={['100%', '100%', '100%']}
                  // border="2px hidden green"
                  overflow="auto"
                  py="15px"
                  pr="3px"
                >
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <PrimaryInput<LoginModel>
                      label="Email Address"
                      type="text"
                      placeholder="Enter your email"
                      name="email"
                      error={errors.email}
                      register={register}
                      defaultValue={loggedIn.email}
                    />

                    <PrimaryInput<LoginModel>
                      label="Password"
                      placeholder="Enter your password"
                      type={passwordVisible ? 'text' : 'password'}
                      icon={true}
                      passwordVisible={passwordVisible}
                      changeVisibility={changeInputType}
                      name="password"
                      error={errors.password}
                      register={register}
                      defaultValue={loggedIn.password}
                    />

                    <HStack
                      w="100%"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Flex
                        w="50%"
                        alignItems="flex-end"
                        justifyContent="flex-start"
                      >
                        <Checkbox
                          alignItems="center"
                          borderColor="none"
                          borderRadius="5px"
                          size="sm"
                          textTransform="capitalize"
                          onChange={(e) => setTerms(e.target.checked)}
                          defaultChecked={loggedIn !== null}
                        >
                          remember me.
                        </Checkbox>
                      </Flex>

                      <Text
                        w="50%"
                        textAlign="right"
                        textTransform="capitalize"
                        color="brand.100"
                        fontSize="14px"
                        fontWeight={600}
                      >
                        forgot password?
                      </Text>
                    </HStack>
                    <SubmitButton
                      textContent="sign in"
                      isLoading={isSubmitting}
                    />
                  </form>

                  <Text
                    fontSize={['14px', '16px']}
                    display={['block', 'block', 'none']}
                  >
                    Don&apos;t have an account? You can
                    <Link href="/register">&nbsp;sign up here.</Link>
                  </Text>
                </Box>
              </Box>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Login;
