import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Flex,
  ModalBody,
  Text,
  Icon,
  VStack,
  Box,
  Image,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import { WaitList, WaitListService } from "src/services";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { PrimaryInput, PrimarySelect, SubmitButton } from "ui";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const schema = yup.object().shape({
  firstName: yup.string().required(),
  userType: yup.string().required(),
  email: yup.string().email().required(),
});

interface IWaitListProps {
  isOpen: boolean;
  onClose: () => void;
  data?: any;
}

export const WaitListModal = ({ isOpen, onClose, data }: IWaitListProps) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<WaitList>({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);

  const onSubmit = async (data: WaitList) => {
    const fullName = data.firstName?.split(" ") as any[];
    data.firstName = fullName[0];
    data.lastName = fullName[1] || "";
    try {
      const result = await WaitListService.createWaitList({
        requestBody: data,
      });
      if (result.status) {
        setShowSuccess(true);
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

  useEffect(() => {
    reset({
      email: data?.email,
      userType: data?.userType,
    });
  }, [data, reset]);

  return (
    <>
      {showSuccess ? (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          motionPreset="slideInBottom"
          isCentered
          trapFocus={false}
        >
          <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) " />

          <ModalContent
            py={5}
            borderRadius="10px"
            w={{ base: "88%", md: "88%", lg: "45%" }}
            // overflow="hidden"
            maxH="100vh"
            pos="fixed"
            mt="1rem"
            mb="1rem"
            maxW="100%"
            p={["1rem 2rem", "2rem 4rem"]}
          >
            <ModalBody>
              <VStack gap="1rem">
                <Text
                  color="brand.100"
                  fontSize="32px"
                  textAlign="center"
                  fontWeight="bold"
                  lineHeight="38px"
                >
                  Successful!
                </Text>
                <Image src="/assets/45.png" alt="" />
                <Text
                  color="#171717"
                  fontSize="18px"
                  textAlign="center"
                  fontWeight="500"
                  lineHeight="31px"
                  w="80%"
                >
                  Congratulations! You&apos;ve been successfully added to the
                  waiting list.
                </Text>
                <Button
                  onClick={() => {
                    onClose();
                    router.reload();
                  }}
                  h="60px"
                  bgColor="brand.100"
                  color="white"
                  w="80%"
                >
                  Close
                </Button>
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      ) : (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          motionPreset="slideInBottom"
          isCentered
          trapFocus={false}
        >
          <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) " />

          <ModalContent
            py={5}
            borderRadius="10px"
            w={{ base: "88%", lg: "45%" }}
            // overflow="hidden"
            maxH="100vh"
            pos="fixed"
            mt="1rem"
            mb="1rem"
            maxW="100%"
            p={["1rem 0", "2rem 4rem"]}
          >
            <ModalHeader textAlign="center">
              <Flex justify="flex-end" mb="1rem">
                <Icon
                  as={GrClose}
                  onClick={onClose}
                  cursor="pointer"
                  fontSize="1.5rem"
                />
              </Flex>
              <Flex justify="center">
                <Text
                  color="#171717"
                  fontSize={["20px", "32px"]}
                  textAlign="center"
                  fontWeight="bold"
                  lineHeight={["unset", "38px"]}
                >
                  Discover, connect, and thrive with StudioMart.
                </Text>
              </Flex>
            </ModalHeader>

            <ModalBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                <VStack gap=".5rem" w="full">
                  <PrimaryInput<WaitList>
                    label=""
                    type="text"
                    placeholder="Enter your full name"
                    name="firstName"
                    error={errors.firstName}
                    register={register}
                    h="51px"
                  />
                  <PrimaryInput<WaitList>
                    label=""
                    type="email"
                    placeholder="Enter your email address"
                    name="email"
                    error={errors.email}
                    register={register}
                    h="51px"
                  />
                  <PrimarySelect<WaitList>
                    label=""
                    name="userType"
                    error={errors.userType}
                    register={register}
                    h="51px"
                    options={
                      <>
                        <option selected disabled>
                          Choose a user type
                        </option>
                        <option value="Customer">Customer</option>
                        <option value="Vendor">Vendor</option>
                      </>
                    }
                  />
                </VStack>

                <Box mt="1.5rem">
                  <SubmitButton
                    textContent="Join Waitlist"
                    isLoading={isSubmitting}
                    isValid={isValid}
                    h="60px"
                  />
                </Box>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
