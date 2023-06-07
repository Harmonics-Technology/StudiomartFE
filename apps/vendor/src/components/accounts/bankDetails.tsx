import React, { useContext } from "react";
import { DisabledInput, PrimaryInput, PrimarySelect } from "ui";
import { BankAccountModel, Banks, StudioService } from "src/services";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import AccountSideBar from "@components/accounts/AccountSideBar";
import {
  useDisclosure,
  HStack,
  Stack,
  Box,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { BankCard } from "src/utils/BankCard";
import { UserContext } from "@components/Context/UserContext";
import { VerifyPasswordModal } from "@components/Modals/VerifyPasswordModal";
import axios from "axios";
import { useNonInitialEffect } from "ui";

const schema = yup.object().shape({
  accountName: yup.string().required(),
  accountNumber: yup.string().required(),
  bankCode: yup.string().required(),
});

interface bankProps {
  banks: Banks[];
  userId: string;
  bankAccounts: any;
}
export default function BankDetails({
  banks,
  bankAccounts,
  userId,
}: bankProps) {
  const { currentStudioId } = useContext(UserContext);

  const {
    handleSubmit,
    register,
    watch,
    getValues,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<BankAccountModel>({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bankCode = watch("bankCode");
  const accountNumber = watch("accountNumber");
  console.log({ bankCode, accountNumber, accountName: watch("accountName") });

  const getBankDetails = async () => {
    try {
      const response = await axios.get(
        "https://maylancer.org/api/nuban/api.php",
        {
          params: {
            account_number: accountNumber,
            bank_code: bankCode,
          },
        }
      );
      // console.log(response);
      if (response.status == 200) {
        setValue("accountName", response.data.account_name);
        return;
      }
      toast.error(response.data.message, { className: "loginToast" });
    } catch (error) {
      console.error(error);
      toast.error("An error occured", { className: "loginToast" });
    }
  };
  useNonInitialEffect(() => {
    getBankDetails();
  }, [bankCode && accountNumber?.length == 10]);

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

  return (
    <>
      <VerifyPasswordModal
        isOpen={isOpen}
        onClose={onClose}
        handleSubmit={handleSubmit(onSubmit)}
        userId={userId}
        submit={true}
      />

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
                    id={x.id}
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
                    options={
                      <>
                        <option hidden selected>
                          Select a bank
                        </option>
                        {banks.map((bank: Banks) => (
                          <option value={bank.code as string} key={bank.id}>
                            {bank.name}
                          </option>
                        ))}
                      </>
                    }
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
                  <DisabledInput<BankAccountModel>
                    label="Account Name"
                    type="text"
                    placeholder="Enter your account name"
                    defaultValue={""}
                    value={watch("accountName") || ""}
                    readonly={true}
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
