import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import { UserContext } from "@components/Context/UserContext";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { UserService } from "src/services";
import { DisabledInput } from "ui";

interface VerifyProps {
  isOpen: any;
  onClose: any;
  userId: any;
  handleSubmit?: any;
  submit?: boolean;
}

export const VerifyPasswordModal = ({
  isOpen,
  onClose,
  userId,
  handleSubmit,
  submit = false,
}: VerifyProps) => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setnewPassword] = useState<boolean>(false);
  const [retypePassword, setretypePassword] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
        submit ? handleSubmit() : router.reload();
        return;
      }
      setLoading(false);
      onClose();
      toast.error(result.message as string);
      return;
    } catch (error: any) {
      setLoading(false);
      toast.error(error?.body?.message || error?.message, {
        className: "loginToast",
      });
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Verify your account</ModalHeader>
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
  );
};
