import React, { useContext, useState } from 'react';
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
  Grid,
  HStack,
  Link,
  Image,
  Circle,
} from '@chakra-ui/react';
import { PrimaryInput, SubmitButton, CustomStepper, LoginTypeBtn } from 'ui';
import { VendorRegisterModel, UserService, RegisterModel } from 'src/services';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import YupPassword from 'yup-password';
import toast from 'react-hot-toast';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
// import Link from "next/link";
import { BsCheckCircle } from 'react-icons/bs';
import { auth, db } from '@components/firebase/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { UserContext } from '@components/Context/UserContext';
YupPassword(yup);

const validation = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().password(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

// const schema = yup.object().shape({});

export const SignUpPage = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const changeInputType = () => {
    setPasswordVisible(!passwordVisible);
  };
  const [terms, setTerms] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [loginType, setLoginType] = useState('Vendor');
  const { device } = useContext(UserContext);
  const [step, setStep] = useState(0);
  let validationSchema = {
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().password(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  };
  if (step == 1) {
    validationSchema = {
      //@ts-ignore
      studioName: yup.string().required(),
      studioDescription: yup.string().required(),
      studioAddress: yup.string().required(),
    };
  }
  const schema = yup.object().shape(validationSchema);
  // console.log({ terms });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<RegisterModel>({
    resolver: yupResolver(validation),
    mode: 'all',
  });
  const {
    handleSubmit: VendorSubmit,
    register: registers,
    trigger,
    formState: { errors: isError, isSubmitting: submitting, isValid },
  } = useForm<VendorRegisterModel>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const completeFormStep = async () => {
    await trigger();
    if (isValid) {
      setStep((cur: number) => cur + 1);
      return;
    }
  };

  const onSubmitRegister = async (data: RegisterModel) => {
    if (!terms) {
      toast.error('You have not accepted the terms and conditions');
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
  const onSubmitVendor = async (data: VendorRegisterModel) => {
    if (!terms) {
      toast.error('You have not accepted the terms and conditions');
      return;
    }
    // console.log({ data });
    try {
      const result = await UserService.createVendor({
        requestBody: data,
        device,
      });
      // console.log({ result });
      if (result.status) {
        const res = await createUserWithEmailAndPassword(
          auth,
          data.email as string,
          data.password as string
        );
        await updateProfile(res.user, {
          displayName: data.firstName,
        });
        await setDoc(doc(db, 'users', result?.data?.id as string), {
          uid: result.data?.id,
          email: res.user.email,
          displayName: data.firstName,
        });
        await setDoc(doc(db, 'userChats', result?.data?.id as string), {});
        toast.success(result.message as string, { className: 'loginToast' });
        setSuccess(true);
        return;
      }
      toast.error(result.message as string, { className: 'loginToast' });
      return;
    } catch (error: any) {
      toast.error(error?.body?.message || error?.message, {
        className: 'loginToast',
      });
    }
  };

  return (
    <Flex
      border="2px hidden red"
      w="100%"
      minH="100vh"
      justify={{ base: 'none', md: 'space-between' }}
      align="center"
      // bgColor="#e0edff"
    >
      <Box
        w="55%"
        h="100vh"
        overflow="hidden"
        display={{ base: 'none', lg: 'unset' }}
      >
        <Carousel
          showStatus={false}
          autoPlay
          infiniteLoop
          animationHandler="fade"
          useKeyboardArrows
          showArrows={false}
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
      <Flex
        w={{ base: '100%', md: '80%', lg: '50%' }}
        pos="relative"
        h="100vh"
        align="center"
        mx="auto"
      >
        {success ? (
          <VStack w="100%" h="auto" p="3rem 3rem">
            <Icon as={BsCheckCircle} color="green" fontSize="2rem" />
            <Heading>Successful!</Heading>
            <Text textAlign="center">
              Check your mail for further instructions
            </Text>
            <Link href="/">
              <Button w="full" h="3rem" bgColor="brand.100" color="white">
                Go to Home
              </Button>
            </Link>
          </VStack>
        ) : (
          <>
            {loginType == 'Vendor' && (
              <Box pos="absolute" top="0" w="100%">
                <CustomStepper steps={[0, 1]} currentStep={step} />
              </Box>
            )}
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
                  Welcome to studio services without border!
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
                  Have an account?
                  <Link href="/login" color="brand.100">
                    &nbsp;Sign in here.
                  </Link>
                </Text>

                <LoginTypeBtn
                  loginOption={[
                    {
                      text: 'Customer',
                      url: `${
                        process.env.NEXT_PUBLIC_CLIENT_URL as string
                      }/register`,
                    },
                    {
                      text: 'Vendor',
                      url: `${
                        process.env.NEXT_PUBLIC_VENDOR_URL as string
                      }/register`,
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
                    <VStack
                      spacing="1.5rem"
                      w={{ base: '110%', md: 'full' }}
                      display={step == 1 ? 'none' : 'flex'}
                    >
                      <PrimaryInput<VendorRegisterModel>
                        label="Email Address"
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        error={isError.email}
                        register={registers}
                        toolTip="An active email address to reach your studio"
                      />
                      <Grid
                        templateColumns={['repeat(2,1fr)']}
                        gap="1.5rem 1rem"
                        w="full"
                      >
                        <PrimaryInput<VendorRegisterModel>
                          label="First Name"
                          type="text"
                          placeholder="Enter your first name"
                          name="firstName"
                          error={isError.firstName}
                          register={registers}
                        />

                        <PrimaryInput<VendorRegisterModel>
                          label="Last Name"
                          type="text"
                          placeholder="Enter your last name"
                          name="lastName"
                          error={isError.lastName}
                          register={registers}
                        />
                        <PrimaryInput<VendorRegisterModel>
                          label="Password"
                          placeholder="Enter your password"
                          type={passwordVisible ? 'text' : 'password'}
                          icon={true}
                          passwordVisible={passwordVisible}
                          changeVisibility={changeInputType}
                          name="password"
                          error={isError.password}
                          register={registers}
                        />
                        <PrimaryInput<VendorRegisterModel>
                          label="Re-enter password"
                          placeholder="Confirm your password"
                          type={passwordVisible ? 'text' : 'password'}
                          icon={true}
                          passwordVisible={passwordVisible}
                          changeVisibility={changeInputType}
                          name="confirmPassword"
                          error={isError.confirmPassword}
                          register={registers}
                        />
                      </Grid>
                      <Button
                        w="full"
                        bgColor="brand.100"
                        borderRadius="0"
                        height="3rem"
                        color="white"
                        mb="1rem"
                        onClick={completeFormStep}
                      >
                        Next
                      </Button>
                    </VStack>

                    <VStack
                      spacing="1.5rem"
                      w="full"
                      display={step == 0 ? 'none' : 'flex'}
                    >
                      <PrimaryInput<VendorRegisterModel>
                        label="Studio Name"
                        type="text"
                        placeholder="Enter your studio name"
                        name="studioName"
                        error={isError.studioName}
                        register={registers}
                      />
                      <PrimaryInput<VendorRegisterModel>
                        label="Studio Description"
                        type="text"
                        placeholder="Enter a short description about your studio"
                        name="studioDescription"
                        error={isError.studioDescription}
                        register={registers}
                      />
                      <PrimaryInput<VendorRegisterModel>
                        label="Studio Address"
                        type="text"
                        placeholder="Where is your studio located"
                        name="studioAddress"
                        error={isError.studioAddress}
                        register={registers}
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
                          I have read, undrestood and accept the{' '}
                          <span
                            style={{
                              color: '#1570FA',
                            }}
                          >
                            Terms and Conditions
                          </span>
                        </Checkbox>
                      </Flex>
                      <HStack align="center" h="fit-content" my="1rem" w="full">
                        <Button
                          w="full"
                          bgColor="gray.400"
                          borderRadius="0"
                          height="3rem"
                          color="white"
                          onClick={() => setStep(step - 1)}
                        >
                          Back
                        </Button>
                        <SubmitButton
                          textContent="sign up"
                          isLoading={submitting}
                        />
                      </HStack>
                    </VStack>
                  </form>
                ) : (
                  <form onSubmit={handleSubmit(onSubmitRegister)}>
                    <PrimaryInput<RegisterModel>
                      label="Email Address"
                      type="email"
                      placeholder="Enter your email"
                      name="email"
                      error={errors.email}
                      register={register}
                    />
                    <Grid templateColumns={['repeat(2,1fr)']} gap="0rem 1rem">
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
                      <PrimaryInput<RegisterModel>
                        label="Re-enter password"
                        placeholder="Confirm your password"
                        type={passwordVisible ? 'text' : 'password'}
                        icon={true}
                        passwordVisible={passwordVisible}
                        changeVisibility={changeInputType}
                        name="confirmPassword"
                        error={errors.confirmPassword}
                        register={register}
                      />
                    </Grid>
                    <Flex
                      w="100%"
                      alignItems="flex-end"
                      justifyContent="flex-start"
                      mb="1rem"
                    >
                      <Checkbox
                        alignItems="center"
                        borderColor="none"
                        borderRadius="5px"
                        size="md"
                        onChange={(e) => setTerms(e.target.checked)}
                      >
                        I have read, undrestood and accept the{' '}
                        <span
                          style={{
                            color: '#1570FA',
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
          </>
        )}
      </Flex>
    </Flex>
  );
};
