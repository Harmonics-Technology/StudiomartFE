import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Box,
} from "@chakra-ui/react";
import { ReactNode } from "react";

type Props = {
    isOpen?: any;
    onClose?: any;
    children: ReactNode;
};

const ModalWrapper = ({ isOpen, onClose, children }: Props) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            motionPreset="slideInBottom"
            isCentered
        >
            <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) " />

            <ModalContent
                py={5}
                borderRadius="10px"
                w={["88%", "30%"]}
                overflow="hidden"
                maxH="100vh"
                pos="fixed"
                mt="1rem"
                mb="1rem"
            >
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
