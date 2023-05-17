import React, { useContext, useState } from "react";
// import { Flex, Box, Button, HStack, Stack } from "@chakra-ui/react";
import { PrimaryInput, DisabledInput, PrimarySelect } from "ui";
import {
  BankAccountModel,
  Banks,
  StudioService,
  UserService,
} from "src/services";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import AccountSideBar from "@components/accounts/AccountSideBar";
import {
  useDisclosure,
  Link,
  HStack,
  Stack,
  Modal,
  Box,
  ModalContent,
  Button,
  ModalCloseButton,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalOverlay,
  Flex,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { BankCard } from "src/utils/BankCard";
import { UserContext } from "@components/Context/UserContext";

const schema = yup.object().shape({
  accountName: yup.string().required(),
  accountNumber: yup.string().required(),
  bankCode: yup.string().required(),
});

interface bankProps {
  banks: Banks[];
  bankAccounts: any;
  userId: string;
}
export default function BankDetails({
  banks,
  bankAccounts,
  userId,
}: bankProps) {
  const [confirmPassword, setConfirmPassword] = useState("");
  const { currentStudioId } = useContext(UserContext);
  const [password, setPassword] = useState("");
  const [newPassword, setnewPassword] = useState<boolean>(false);
  const [retypePassword, setretypePassword] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValid },
  } = useForm<BankAccountModel>({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: BankAccountModel) => {
    data.bankName = banks.filter((x: Banks) => x.code == data.bankCode)[0].name;
    data.studioId = currentStudioId;
    try {
      const result = await StudioService.addBankAccount({ requestBody: data });
      if (result.status) {
        toast.success(
          "Your information has been saved successfully and will reload shortly"
        );
        router.reload();
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
  const onVerifyPassword = async () => {
    if (confirmPassword != password) {
      toast.error("Password and Re-type password do not match", {
        className: "loginToast",
      });
      return;
    }
    try {
      setLoading(true);
      const result = await UserService.verifyPassword({
        requestBody: { userId, password },
      });
      if (result.status) {
        setLoading(false);
        onClose();
        handleSubmit(onSubmit)();
        return;
      }
      setLoading(false);
      onClose();
      toast.error(result.message as string);
      return;
    } catch (error: any) {
      toast.error(error?.body?.message || error?.message, {
        className: "loginToast",
      });
    }
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form>
              <VStack gap="1rem">
                <DisabledInput<any>
                  label="New Password"
                  type={newPassword ? "text" : "password"}
                  icon={true}
                  passwordVisible={newPassword}
                  changeVisibility={() => setnewPassword((prev) => !prev)}
                  placeholder="Enter your new password"
                  defaultValue={""}
                  onChange={(e: any) => setPassword(e.target.value)}
                />
                <DisabledInput<any>
                  label="Confirm Password"
                  type={retypePassword ? "text" : "password"}
                  icon={true}
                  passwordVisible={retypePassword}
                  changeVisibility={() => setretypePassword((prev) => !prev)}
                  placeholder="Enter your new password"
                  defaultValue={""}
                  onChange={(e: any) => setConfirmPassword(e.target.value)}
                />
                <Button
                  bgColor="brand.100"
                  color="white"
                  width="100%"
                  onClick={() => onVerifyPassword()}
                  isLoading={loading}
                >
                  Verify
                </Button>
              </VStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Flex
        bgColor="white"
        align="center"
        minH="60vh"
        w="95%"
        mx="auto"
        my="3rem"
        borderRadius="10px"
        p="5rem"
      >
        <Box w="full">
          {bankAccounts.length > 0 && (
            <Box>
              <Text fontWeight="600">Saved Banks</Text>
              <HStack gap="1rem">
                {bankAccounts.map((x: any) => (
                  <BankCard
                    key={x.id}
                    bankName={x.bankName}
                    accountNumber={x.accountNumber}
                    accountName={x.accountName}
                  />
                ))}
              </HStack>
            </Box>
          )}
          <Stack
            direction="row"
            spacing={6}
            width="80%"
            my="3rem"
            mx="1rem"
            bgColor="white"
          >
            <AccountSideBar />
            <Box w="55%" fontFamily='"DM Sans", sans-serif'>
              <form>
                <Stack gap="1rem">
                  <PrimarySelect<BankAccountModel>
                    label="Bank Name"
                    name="bankCode"
                    error={errors.bankCode}
                    register={register}
                    options={banks.map((bank: Banks) => (
                      <option value={bank.code as string} key={bank.id}>
                        {bank.name}
                      </option>
                    ))}
                  />
                  <PrimaryInput<BankAccountModel>
                    label="Account Name"
                    type="text"
                    placeholder="Enter your account name"
                    name="accountName"
                    error={errors.accountName}
                    register={register}
                    defaultValue={""}
                  />
                  <PrimaryInput<BankAccountModel>
                    label="Account Number"
                    type="text"
                    placeholder="Enter your account number"
                    name="accountNumber"
                    error={errors.accountNumber}
                    register={register}
                    defaultValue={""}
                  />
                  <Flex justifyContent="flex-end" w="full">
                    <Button
                      isDisabled={!isValid}
                      bgColor="brand.100"
                      color="white"
                      width="100%"
                      type="button"
                      h="3rem"
                      onClick={onOpen}
                      isLoading={isSubmitting}
                    >
                      Add Bank Account
                    </Button>
                  </Flex>
                </Stack>
              </form>
            </Box>
          </Stack>
        </Box>
      </Flex>
    </>
  );
}
