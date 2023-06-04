import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
  Image,
} from "@chakra-ui/react";
import React from "react";

interface ImageBox {
  isOpen: boolean;
  onClose: () => void;
  image: string;
}

export const ImageLightBox = ({ isOpen, onClose, image }: ImageBox) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg="rgba(0,0,0,.8)" backdropFilter="blur(20px) " />
      <ModalContent maxW="100%" w="80%" my="0">
        {/* <ModalHeader fontSize=".9rem">Delete {text}</ModalHeader> */}
        <ModalCloseButton zIndex="999" />
        <ModalBody h="100vh" w="full">
          <Box w="full" h="full" pos="relative">
            <Image src={image} w="full" h="full" objectFit="cover" />
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
