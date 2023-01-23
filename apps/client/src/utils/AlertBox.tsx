import { Alert, AlertIcon, Box, CloseButton } from "@chakra-ui/react";
import React from "react";

interface AlertProps {
  onClose: any;
  text: string;
  status: string;
}
function AlertBox({ onClose, status, text }: AlertProps) {
  return (
    <Box
      bgColor="rgba(0,0,0,.8)"
      w="full"
      h="100vh"
      pos="absolute"
      top="0"
      left="0"
      zIndex="991"
    >
      <Box w="80%" mx="auto" pt="4rem">
        <Alert
          //@ts-ignore
          status={status}
          bgColor="white"
          h="4rem"
        >
          <AlertIcon />
          {text}

          <CloseButton
            alignSelf="flex-start"
            position="absolute"
            right={5}
            onClick={onClose}
          />
        </Alert>
      </Box>
    </Box>
  );
}

export default AlertBox;
