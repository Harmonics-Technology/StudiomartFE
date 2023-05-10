import {
  Box,
  Flex,
  Text,
  HStack,
  VStack,
  Button,
  Image,
  Square,
  InputGroup,
  InputLeftElement,
  Input,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import BookingText from "src/utils/BookingText";
import TopPage from "src/utils/TopPage";
import { BsExclamationCircleFill } from "react-icons/bs";

function BookingService() {
  const [id, setId] = useState<any>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showAlert, setShowAlert] = useState<boolean>(true);
  return (
    <Box>
      <TopPage
        page={"Services"}
        details={"Here you manage all your services"}
        right={true}
        clickFunction={undefined}
      />
      <Box
        bgColor= "rgba(220, 38, 38, 0.1)"
        borderRadius="8px"
        p="2rem .5rem 1rem"
        border="1px solid"
        borderColor="red"
      >
        <HStack
          justify="space-between"
          px="2rem"
          fontSize=".8rem"
          align="center"
        ></HStack>
        <VStack gap="1rem" align="left">
          <BsExclamationCircleFill color="red" />
          <BookingText
            top="Notice!"
            bottom="It is mandatory that you complete your profile and add your bank account details before you transact on this platform"
          />
          <Button
            variant="outline"
            w="full"
            bgColor="#1570FA"
            color="white"
            h="full"
          >
            Complete Profile
          </Button>
        </VStack>
        <Box
          bgColor= "White"
          borderRadius="8px"
          p="2rem .5rem 1rem"
          h="full"
          w="full"
        >
          <Image
            src="assets/Clipboard.png"
            width="full"
            h="full"
            objectFit="cover"
            alt=""
          />
        </Box>
      </Box>
    </Box>
  );
}

export default BookingService;
