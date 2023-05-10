import React from "react";
import {
  useDisclosure,
  Modal,
  ModalContent,
  Button,
  ModalCloseButton,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Input,
  FormControl,
  FormLabel,
  ModalOverlay,
} from "@chakra-ui/react";
//  import TopPage from "src/utils/TopPage";

//  import { constants } from "buffer";

export default function confirmInformation() {
  const size = ["xs"];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  function InitialFocus() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);

    return (
      <>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Confirm Password</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input ref={initialRef} placeholder="First name" />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Confirm Password</FormLabel>
                <Input placeholder="Last name" />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button color="brand.100" mr={3}>
                Verify
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
}

