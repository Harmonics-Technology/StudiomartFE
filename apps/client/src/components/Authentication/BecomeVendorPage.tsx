import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  Checkbox,
  Button,
  Icon,
  HStack,
  Link,
  Image,
  Circle,
} from "@chakra-ui/react";
import { PrimaryInput, SubmitButton, sliderSets, slickImages } from "ui";
import { UserService, RegisterModel, VendorUpgradeModel } from "src/services";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { BsCheckCircle } from "react-icons/bs";
import Slider from "react-slick";
import { useRouter } from "next/router";

const schema = yup.object().shape({
  studioName: yup.string().required(),
  studioDescription: yup.string().required(),
  studioAddress: yup.string().required(),
});

export const BecomeVendorPage = () => {
  const [terms, setTerms] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  // console.log({ terms });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValid },
  } = useForm<VendorUpgradeModel>({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const router = useRouter();
  const onSubmitVendor = async (data: VendorUpgradeModel) => {
    if (!terms) {
      toast.error("You have not accepted the terms and conditions");
      return;
    }
    try {
      const result = await UserService.becomeVendor({ requestBody: data });
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
      justify={{ base: "none", md: "space-between" }}
      align="center"
      // bgColor="#e0edff"
    >
      <Box
        w="55%"
        h="100vh"
        overflow="hidden"
        display={{ base: "none", lg: "unset" }}
      >
        <Slider {...sliderSets}>
          {slickImages.map((x: any) => (
            <Box w="full" h="100vh" key={x.id}>
              <Image
                src={x.url}
                alt="any"
                w="full"
                h="full"
                objectFit="cover"
              />
            </Box>
          ))}
        </Slider>
        {/* <Image src="/assets/007.jpg" alt="any" w="full" objectFit="cover" /> */}
      </Box>

      <Flex
        w={{ base: "100%", md: "80%", lg: "50%" }}
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
                onClick={() => router.push("/")}
              >
                <Image src="/logofav.png" w="full" alt="logo" />
              </Flex>
              <VStack spacing={0} gap="1.5rem" w="100%" mb="10px">
                <Heading
                  fontWeight={700}
                  fontSize={{ base: "24px", lg: "30px" }}
                  // lineHeight={"44px"}
                  color="black"
                  textTransform="capitalize"
                  textAlign="center"
                  mx="auto"
                  w={{ base: "100%", lg: "80%" }}
                >
                  {" You're one step to becoming a vendor!"}
                </Heading>
              </VStack>
              <Box
                w={{ base: "100%", md: "100%" }}
                h={["100%", "100%", "100%"]}
                // border="2px hidden green"
                overflow="auto"
                py="15px"
                pr="3px"
              >
                <form onSubmit={handleSubmit(onSubmitVendor)}>
                  <VStack spacing={{ base: "1rem", lg: "1.5rem" }} w="full">
                    <PrimaryInput<VendorUpgradeModel>
                      label="Studio Name"
                      type="text"
                      placeholder="Enter your studio name"
                      name="name"
                      error={errors.name}
                      register={register}
                    />
                    <PrimaryInput<VendorUpgradeModel>
                      label="Studio Description"
                      type="text"
                      placeholder="Enter a short description about your studio"
                      name="description"
                      error={errors.description}
                      register={register}
                    />
                    <PrimaryInput<VendorUpgradeModel>
                      label="Studio Address"
                      type="text"
                      placeholder="Where is your studio located"
                      name="address"
                      error={errors.address}
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
                    <HStack align="center" h="fit-content" my="1rem" w="full">
                      <SubmitButton
                        textContent="Become a Vendor"
                        isLoading={isSubmitting}
                      />
                    </HStack>
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
