import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  Checkbox,
  Link,
  Image,
} from '@chakra-ui/react';
import { PrimaryInput, SubmitButton, LoginTypeBtn } from 'ui';
import { LoginModel, OpenAPI, UserService } from 'src/services';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import YupPassword from 'yup-password';
import toast from 'react-hot-toast';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
YupPassword(yup);

const validation = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().password(),
});

export const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const changeInputType = () => {
    setPasswordVisible(!passwordVisible);
  };
  const router = useRouter();
  const [terms, setTerms] = useState<boolean>(false);
  const [loginType, setLoginType] = useState('Vendor');
  const [step, setStep] = useState(0);
  // console.log({ terms });

  const {
    handleSubmit,
    handleSubmit: VendorSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<LoginModel>({
    resolver: yupResolver(validation),
    mode: 'all',
  });

  const onSubmitRegister = async (data: LoginModel) => {
    try {
      const result = await UserService.loginUser({ requestBody: data });
      console.log({ result });
      if (result.status) {
        if (terms) {
          Cookies.set('isCustomer', JSON.stringify(data));
        }
        toast.success('Login Successful!');
        Cookies.set('customer', JSON.stringify(result.data));
        Cookies.set('user', 'Customer');
        OpenAPI.TOKEN = result?.data?.token as string;
        result.data &&
          Cookies.set('customerToken', result.data.token as string);
        router.query.from
          ? (window.location.href = decodeURIComponent(
              router.query.from as unknown as string
            ))
          : (window.location.href = `/dashboard`);
        return;
      }
      toast.error(result.message as string);
      return;
    } catch (error: any) {
      toast.error(error?.body?.message || error?.message);
    }
  };
  const onSubmitVendor = async (data: LoginModel) => {
    // console.log({ data });
    try {
      const result = await UserService.loginUser({ requestBody: data });
      console.log({ result });
      if (result.status) {
        if (terms) {
          Cookies.set('isVendor', JSON.stringify(data));
        }
        toast.success('Login Successful!', {
          style: {
            border: '1px solid black',
            minWidth: '10%',
            borderRadius: '8px',
          },
        });

        Cookies.set('vendor', JSON.stringify(result.data));
        Cookies.set('user', 'Vendor');
        OpenAPI.TOKEN = result?.data?.token as string;
        result.data && Cookies.set('vendorToken', result.data.token as string);
        router.query.from
          ? (window.location.href = decodeURIComponent(
              router.query.from as unknown as string
            ))
          : (window.location.href = `/dashboard`);
        return;
      }
      toast.error(result.message as string, {
        style: {
          border: '1px solid black',
          width: '200px',
          borderRadius: '8px',
        },
      });
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
        </Carousel>
        <Image src="/assets/007.jpg" alt="any" w="full" objectFit="cover" />
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
              Glad to have you back!
            </Heading>

            {/* <Text color="#54595E" lineHeight={1.5}>
              Sign up to get started.
            </Text> */}
            <Text
              fontSize={['14px', '16px']}
              display={['block', 'block', 'block']}
              textAlign="center"
              fontWeight="600"
            >
              Do not have an account?
              <Link href="/register" color="brand.100">
                &nbsp;Sign up here.
              </Link>
            </Text>

            <LoginTypeBtn
              loginOption={[
                {
                  text: 'Customer',
                  url: `${process.env.NEXT_PUBLIC_CLIENT_URL as string}/login`,
                },
                {
                  text: 'Vendor',
                  url: `${process.env.NEXT_PUBLIC_VENDOR_URL as string}/login`,
                },
              ]}
              loginType={loginType}
            />
          </VStack>
          <Box
            w="100%"
            h={['100%', '100%', '100%']}
            // border="2px hidden green"
            overflow="auto"
            py="15px"
            pr="3px"
          >
            {loginType == 'Vendor' ? (
              <form onSubmit={VendorSubmit(onSubmitVendor)}>
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
                  type={passwordVisible ? 'text' : 'password'}
                  icon={true}
                  passwordVisible={passwordVisible}
                  changeVisibility={changeInputType}
                  name="password"
                  error={errors.password}
                  register={register}
                />
                <Flex
                  w="100%"
                  alignItems="flex-end"
                  justifyContent="flex-start"
                  my="1rem"
                >
                  <Checkbox
                    alignItems="center"
                    borderColor="none"
                    borderRadius="5px"
                    size="md"
                    onChange={() => setTerms(!terms)}
                  >
                    Remember me
                  </Checkbox>
                </Flex>

                <SubmitButton textContent="sign in" isLoading={isSubmitting} />
              </form>
            ) : (
              <form onSubmit={handleSubmit(onSubmitRegister)}>
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
                  type={passwordVisible ? 'text' : 'password'}
                  icon={true}
                  passwordVisible={passwordVisible}
                  changeVisibility={changeInputType}
                  name="password"
                  error={errors.password}
                  register={register}
                />
                <Flex
                  w="100%"
                  alignItems="flex-end"
                  justifyContent="flex-start"
                  my="1rem"
                >
                  <Checkbox
                    alignItems="center"
                    borderColor="none"
                    borderRadius="5px"
                    size="md"
                    onChange={() => setTerms(!terms)}
                  >
                    Remember me
                  </Checkbox>
                </Flex>

                <SubmitButton textContent="sign in" isLoading={isSubmitting} />
              </form>
            )}

            <Text
              fontSize={['14px', '14px']}
              display={['block', 'block', 'block']}
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
