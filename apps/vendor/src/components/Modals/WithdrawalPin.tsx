import {
  Box,
  Button,
  Flex,
  HStack,
  PinInput,
  PinInputField,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { UserContext } from "@components/Context/UserContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { WalletPinModel, Banks, StudioService } from "src/services";
import { PrimaryInput, ModalWrapper } from "ui";
import { VerifyPasswordModal } from "./VerifyPasswordModal";
import * as yup from "yup";

const schema = yup.object().shape({
  pin: yup
    .string()
    .required()
    .min(4, "Pin Must be exactly 4 digits")
    .max(4, "Pin Must be exactly 4 digits"),
});

interface bankProps {
  close: any;
  open: any;
  userId: string;
}

export default function WithdrawalPin({ close, open, userId }: bankProps) {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<WalletPinModel>({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentStudioId } = useContext(UserContext);

  const onSubmit = async (data: WalletPinModel) => {
    data.studioId = currentStudioId;
    try {
      const result = await StudioService.createWalletPin({ requestBody: data });
      if (result.status) {
        toast.success("Your pin has been created successfully");
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
    <ModalWrapper
      isOpen={open}
      onClose={close}
      title="Set up a wallet pin"
      w="30%"
    >
      <Box>
        <form>
          <Stack gap="1rem">
            {/* <HStack>
              <PinInput
                mask
                onComplete={(value) =>
                  setValue("pin", value as unknown as number)
                }
              >
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack> */}
            <PrimaryInput<WalletPinModel>
              label="Wallet Withdrawal Pin"
              type="number"
              placeholder="Enter your 4 digit wallet withdrawal pin"
              name="pin"
              error={errors.pin}
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
                Set up pin
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
