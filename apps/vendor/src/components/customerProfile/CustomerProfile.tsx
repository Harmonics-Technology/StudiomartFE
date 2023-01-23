import { Box, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import PrimaryInput from "src/utils/PrimaryInput";
import SubmitButton from "src/utils/SubmitButton";
import PrimarySelect from "src/utils/PrimarySelect";
import BackToPage from "src/utils/BackToPage";
import { useForm } from "react-hook-form";

const CustomerProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting },
  } = useForm();
  return (
    <Box bgColor="brand.200" minH="screen" pb="20" pt={["10", "20"]}>
      <Box w={["90%", "70%"]} mx="auto">
        <BackToPage name="Back to home page" path="/customer" />
        <Heading
          fontSize={["1.3rem", "2rem"]}
          py="6"
          bgColor="white"
          mt="10"
          color="brand.100"
          px="7"
        >
          My Profile Details
        </Heading>
        <form>
          <Flex w="full" py="10" flexDir="column" mt="1" bgColor="white" px="7">
            <PrimaryInput
              name="name"
              error={undefined}
              register={register}
              label="first name"
              type="text"
              placeholder="first name"
              defaultValue="Fola"
              fontWeight="medium"
              focusBorderColor="brand.100"
            />
            <PrimaryInput
              name="name"
              error={undefined}
              register={register}
              label="last name"
              type="text"
              placeholder="last name"
              defaultValue="Jackson"
              fontWeight="medium"
              focusBorderColor="brand.100"
            />
            <PrimaryInput
              name="name"
              error={undefined}
              register={register}
              label="email address"
              type="email"
              placeholder="Enter your email"
              defaultValue="Folajackson@gmail.com"
              fontWeight="medium"
              focusBorderColor="brand.100"
            />
            <PrimaryInput
              name="name"
              error={undefined}
              register={register}
              label="phone number"
              type="text"
              placeholder="phone number"
              defaultValue="09087276362"
              fontWeight="medium"
              focusBorderColor="brand.100"
            />
            <PrimarySelect
              label="Gender(Optional)"
              fontWeight="medium"
              focusBorderColor="brand.100"
              options={["", "male", "female"]}
            />
            <PrimaryInput
              name="name"
              error={undefined}
              register={register}
              label="Birthday(Optional)"
              type="date"
              fontWeight="medium"
              focusBorderColor="brand.100"
            />
            <Box my="4" w="full">
              <SubmitButton textContent="save" isLoading={isSubmitting} />
            </Box>
          </Flex>
        </form>
      </Box>
    </Box>
  );
};

export default CustomerProfile;
