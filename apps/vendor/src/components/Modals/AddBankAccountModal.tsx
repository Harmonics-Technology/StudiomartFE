import { Box, Button, Flex, Stack, useDisclosure } from "@chakra-ui/react";
import { UserContext } from "@components/Context/UserContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { BankAccountModel, Banks, StudioService } from "src/services";
import { PrimarySelect, PrimaryInput, ModalWrapper, DisabledInput } from "ui";
import { VerifyPasswordModal } from "./VerifyPasswordModal";
import * as yup from "yup";
import axios from "axios";
import { useNonInitialEffect } from "ui";

const schema = yup.object().shape({
  accountName: yup.string().required(),
  accountNumber: yup.string().required(),
  bankCode: yup.string().required(),
});

interface bankProps {
  close: any;
  open: any;
  banks: Banks[];
  userId: string;
}

export default function AddBankAccountModal({
  banks,
  close,
  open,
  userId,
}: bankProps) {
  const {
    handleSubmit,
    register,
    watch,
    setValue,

    formState: { errors, isSubmitting, isValid },
  } = useForm<BankAccountModel>({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentStudioId } = useContext(UserContext);
  // let bankCode = watch("bankCode");
  // let accountNumber = watch("accountNumber");

  // console.log({ bankCode, accountNumber, accountName: watch("accountName") });

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

  // const getBankDetails = async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://maylancer.org/api/nuban/api.php",
  //       {
  //         params: {
  //           account_number: accountNumber,
  //           bank_code: bankCode,
  //         },
  //       }
  //     );
  //     // console.log(response);
  //     if (response.status == 200) {
  //       setValue("accountName", response.data.account_name);
  //       return;
  //     }
  //     toast.error(response.data.message, { className: "loginToast" });
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("An error occured", { className: "loginToast" });
  //   }
  // };
  // useNonInitialEffect(() => {
  //   getBankDetails();
  // }, [bankCode && accountNumber?.length == 10]);

  return (
    <ModalWrapper
      isOpen={open}
      onClose={close}
      title="Add Bank Account"
      w="30%"
    >
      <Box>
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
              label="Account Number"
              type="text"
              placeholder="Enter your account number"
              name="accountNumber"
              error={errors.accountNumber}
              register={register}
              defaultValue={""}
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
            {/* <DisabledInput<BankAccountModel>
              label="Account Name"
              type="text"
              placeholder="Enter your account name"
              value={watch("accountName") || ""}
              readonly={true}
            /> */}
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
      <VerifyPasswordModal
        isOpen={isOpen}
        onClose={onClose}
        handleSubmit={handleSubmit(onSubmit)}
        userId={userId}
        submit={true}
      />
    </ModalWrapper>
  );
}
