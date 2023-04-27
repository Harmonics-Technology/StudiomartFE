import {
    Button,
    Flex,
    Heading,
    HStack,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { BsInfoCircleFill } from "react-icons/bs";
import ModalWrapper from "./ModalWrapper";
import RejectReason from "./RejectReason";

interface RejectProps {
    onClose: any;
}

function RejectBooking({ onClose}: RejectProps) {
    const { isOpen, onOpen } = useDisclosure();
    return (
        <>
            <Flex flexDirection="column" align="center">
                <BsInfoCircleFill fontSize="6rem" color="red" />
                <Heading fontSize="2rem" fontWeight="600" py=".5rem">
                    Reject Booking
                </Heading>
                <Text fontWeight="500">
                    Are you sure you want to reject this booking?
                </Text>
                <HStack px=".8rem" spacing={4} w="full" my="1rem">
                    <Button
                        variant="outline"
                        height="3rem"
                        width="full"
                        onClick={onClose}
                        border="1px solid"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="solid"
                        height="3rem"
                        width="full"
                        bgColor="brand.100"
                        color="white"
                        onClick={onOpen}
                    >
                        Confirm
                    </Button>
                </HStack>
            </Flex>
            <ModalWrapper isOpen={isOpen} onClose={onClose}>
                <RejectReason/>
            </ModalWrapper>
        </>
    );
}

export default RejectBooking;
