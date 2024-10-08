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
import { PrimaryInput, SubmitButton, sliderSets } from "ui";
import { InitiateResetModel, LoginModel, UserService } from "src/services";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import YupPassword from "yup-password";
import toast from "react-hot-toast";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useRouter } from "next/router";
import { BsCheckCircle } from "react-icons/bs";
import Slider from "react-slick";
YupPassword(yup);

const validation = yup.object().shape({
  email: yup.string().email().required(),
});

export const InitiateReset = () => {
  const router = useRouter();
  const [success, setSuccess] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<InitiateResetModel>({
    resolver: yupResolver(validation),
    mode: "all",
  });

  const onSubmit = async (data: InitiateResetModel) => {
    try {
      const result = await UserService.initiateReset({ requestBody: data });
      if (result.status) {
        // toast.success(result.message as string, { className: "loginToast" });
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
      minH={{ base: "60vh", lg: "100vh" }}
      justify="space-between"
      align="center"
      // bgColor="#e0edff"
    >
      <Box
        w="55%"
        h="100vh"
        overflow="hidden"
        pos="relative"
        display={{ base: "none", lg: "block" }}
      >
        <Box w="30%" pos="absolute" top="2rem" left="3rem">
          <Image src="/assets/StudioMart.png" w="full" alt="logo" />
        </Box>
        <Slider {...sliderSets}>
          <Image src="/assets/007.jpg" alt="any" w="full" objectFit="cover" />
          <Image src="/assets/003.jpg" alt="any" w="full" objectFit="cover" />
          <Image src="/assets/004.jpg" alt="any" w="full" objectFit="cover" />
          <Image src="/assets/005.jpg" alt="any" w="full" objectFit="cover" />
          <Image src="/assets/001.jpg" alt="any" w="full" objectFit="cover" />
          <Image src="/assets/007.jpg" alt="any" w="full" objectFit="cover" />
        </Slider>
      </Box>
      <Flex
        w={{ base: "full", lg: "50%" }}
        pos="relative"
        h="full"
        align="center"
      >
        {success ? (
          <VStack w="90%" h="auto" p="3rem 3rem" boxShadow="none" mx="auto">
            <Icon as={BsCheckCircle} color="green" fontSize="2rem" />
            <Heading>Successful!</Heading>
            <Text textAlign="center">
              Check your mail for further instructions
            </Text>
            <Link
              href="https://gmail.com"
              target="_blank"
              w="full"
              _hover={{
                textDecor: "none",
              }}
            >
              <Flex w="full">
                <Button
                  w="50%"
                  mx="auto"
                  h="3rem"
                  bgColor="brand.100"
                  color="white"
                >
                  Open Mail
                </Button>
              </Flex>
            </Link>
          </VStack>
        ) : (
          <Box
            w="full"
            bgColor="white"
            // borderRadius="30px"
            px={{ base: "1rem", lg: "4rem" }}
            mt=".5rem"
            py="1rem"
            // boxShadow="0px 20px 26px rgba(186, 182, 182, 0.16)"
          >
            <Flex w="10%" justify="center" mx="auto" mb="2rem">
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
                Reset Password!
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
                Own an account?
                <Link href="/login" color="brand.100">
                  &nbsp;Sign in here.
                </Link>
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
              <form onSubmit={handleSubmit(onSubmit)}>
                <VStack mb="1rem" spacing={0} gap="1rem" w="80%" mx="auto">
                  <PrimaryInput<InitiateResetModel>
                    label="Email"
                    name="email"
                    error={errors.email}
                    defaultValue=""
                    register={register}
                  />
                  <SubmitButton
                    textContent="Proceed"
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
        )}
      </Flex>
    </Flex>
  );
};
