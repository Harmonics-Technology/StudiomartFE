import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  Flex,
  Text,
  Icon,
  Box,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { GrClose } from "react-icons/gr";

type Props = {
  isOpen?: any;
  onClose?: any;
  children: ReactNode;
  title?: string;
  w?: string;
  isCentered?: boolean;
};

const ModalWrapper = ({
  isOpen,
  onClose,
  children,
  title,
  w = "30%",
  isCentered = true,
}: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      isCentered={isCentered}
      trapFocus={false}
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) " />

      <ModalContent
        py={5}
        borderRadius="10px"
        w={["88%", w]}
        overflow="hidden"
        maxH="100vh"
        maxW="100%"
        pos="fixed"
        mt="1rem"
        mb="1rem"
      >
        <ModalHeader>
          <Flex justify="space-between">
            <Text
              color="black"
              fontSize="1.1rem"
              textAlign="left"
              fontWeight="semibold"
            >
              {title}
            </Text>
            <Icon as={GrClose} onClick={onClose} cursor="pointer" />
          </Flex>
        </ModalHeader>
        <ModalBody>
          <Box maxH="77vh" overflowY="auto" px={5}>
            {children}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalWrapper;
