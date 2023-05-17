import {
    Box,
    HStack,
    VStack,
    Button,
    Image,
    useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import WalletNotice from "src/utils/WalletNotice";
import TopPage from "src/utils/TopPage";
import { BsExclamationCircleFill } from "react-icons/bs";

function WalletService() {
    const [id, setId] = useState<any>();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [showAlert, setShowAlert] = useState<boolean>(true);
    return (
      <Box>
        <TopPage
          page={"Wallet"}
          details={"Here you see all your money transactions"}
          right={true}
          // clickFunction={undefined}
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
            <WalletNotice
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
              src="assets/empty.png"
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
  
  export default WalletService;
  