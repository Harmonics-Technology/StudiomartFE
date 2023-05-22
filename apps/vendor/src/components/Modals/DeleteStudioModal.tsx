import {
  Button,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { StudioService } from "src/services";

interface StudioProps {
  onClose: any;
  isOpen: any;
  id: string;
  isService?: boolean;
}

export const DeleteStudioModal = ({
  onClose,
  isOpen,
  id,
  isService = false,
}: StudioProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const text = isService ? "Service" : "Studio";
  const deleteStudio = async (id: string) => {
    try {
      setLoading(true);

      const result = isService
        ? await StudioService.deleteService({ id })
        : await StudioService.deleteStudio({ id });
      if (result.status) {
        setLoading(false);
        toast.success(
          `${text} deleted successful, you'll be redirected shortly`
        );
        isService
          ? router.push("/services")
          : (Cookies.remove("currentStudioId"), router.push("/login"));
        return;
      }
      setLoading(false);
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
        <ModalHeader fontSize=".9rem">Delete {text}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Text fontSize="1rem" fontWeight="600">
            Are you sure you want to delete this {text}? <br /> Action is
            irreversible
          </Text>
          <HStack gap=".5rem" w="full" m="2rem 0 1rem">
            <Button
              variant="outline"
              color="red"
              borderColor="red"
              w="full"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              bgColor="brand.100"
              color="white"
              w="full"
              isLoading={loading}
              onClick={() => deleteStudio(id)}
            >
              Yes, Delete!
            </Button>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
