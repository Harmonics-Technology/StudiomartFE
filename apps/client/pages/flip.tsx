import { Box, Button, Flex, Text, Checkbox, HStack } from "@chakra-ui/react";
import React, { useState } from "react";
import styles from "../src/styles/flip.module.css";
import PrimaryInput from "src/utils/PrimaryInput";
import SubmitButton from "src/utils/SubmitButton";
import { useForm } from "react-hook-form";

const Flip = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting },
  } = useForm();
  const [flip, setFlip] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const changeInputType = () => {
    setPasswordVisible(!passwordVisible);
  };
  // const { handleSubmit, register, formState { errors} } = useForm({}); // resolver: yupResolver(schema), mode: "all" });
  return (
    <>
      <Box w="100%" h="50vh" className={styles.boxContainer}>
        <Flex
          className={`${styles.boxCard} ${flip && styles.flip}`}
          w="100%"
          h="100%"
          pos="relative"
        >
          <Box
            w="100%"
            h="100%"
            className={styles.front}
            // display={`${flip && "none"}`}
          >
            <form>
              <PrimaryInput
                name="name"
                error={undefined}
                register={register}
                label="email address"
                type="text"
                placeholder="Enter your email"
              />

              <PrimaryInput
                name="name"
                error={undefined}
                register={register}
                label="password"
                placeholder="Enter your password"
                type={passwordVisible ? "text" : "password"}
                icon={true}
                passwordVisible={passwordVisible}
                changeVisibility={changeInputType}
              />

              <HStack
                w="100%"
                justifyContent="space-between"
                alignItems="center"
              >
                <Flex w="50%" alignItems="flex-end" justifyContent="flex-start">
                  <Checkbox
                    alignItems="center"
                    borderColor="none"
                    borderRadius="5px"
                    size="sm"
                    textTransform="capitalize"
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

              {flip ? null : (
                <SubmitButton textContent="sign in" isLoading={isLoading} />
              )}

              {/* <SubmitButton textContent="sign in" /> */}
            </form>
          </Box>

          <Box w="100%" h="100%" className={styles.back}>
            <form>
              <PrimaryInput
                name="name"
                error={undefined}
                register={register}
                label="first name"
                type="text"
                placeholder="Enter your first name"
              />

              <PrimaryInput
                name="name"
                error={undefined}
                register={register}
                label="last name"
                type="text"
                placeholder="Enter your last name"
              />

              <PrimaryInput
                name="name"
                error={undefined}
                register={register}
                label="email address"
                type="text"
                placeholder="Enter your email"
              />

              <PrimaryInput
                name="name"
                error={undefined}
                register={register}
                label="password"
                placeholder="Enter your password"
                type={passwordVisible ? "text" : "password"}
                icon={true}
                passwordVisible={passwordVisible}
                changeVisibility={changeInputType}
              />

              <PrimaryInput
                name="name"
                error={undefined}
                register={register}
                label="Re-enter password"
                placeholder="Confirm your password"
                type={passwordVisible ? "text" : "password"}
                icon={true}
                passwordVisible={passwordVisible}
                changeVisibility={changeInputType}
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
                  size="sm"
                >
                  I have read, undrestood and accept the{" "}
                  <span style={{ color: "#1570FA" }}>Terms and Conditions</span>
                </Checkbox>
              </Flex>

              <SubmitButton textContent="sign up" isLoading={isSubmitting} />
            </form>
          </Box>
        </Flex>
      </Box>

      <Button onClick={() => setFlip(true)}>flip front</Button>
      <Button onClick={() => setFlip(false)}>flip back</Button>
    </>
  );
};

export default Flip;
