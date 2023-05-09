import React, { useState } from "react";
// import { Flex, Box, Button, HStack, Stack } from "@chakra-ui/react";
import PrimaryInput from "src/utils/PrimaryInput";
import { UpdateUserModel } from "src/services";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import AccountSideBar from "@components/accounts/AccountSideBar";
import {useDisclosure, Link, HStack, Stack, Modal,  Box, ModalContent,Button , ModalCloseButton ,ModalBody, ModalHeader, ModalFooter, Input, FormControl, FormLabel, ModalOverlay  } from "@chakra-ui/react";
import AlertBox from "src/utils/AlertBox";


const schema = yup.object().shape({
  email: yup.string().email().required(),
});
export default function BankDetails() {
  const [bankname, setBankname] = useState<string>("");
  const [accountname, setAccountname] = useState("");
  const [accountnumber, setAccountnumber] = useState("");
  const handleSubmits = (e: any) => {
    e.preventDefault();
    alert(
      `bankname: ${bankname}, accountname: ${accountname}, accountnumber: ${accountnumber}`
    );
  };
  const  [showAlert,  setShowAlert] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  
const acceptVerifyAccount = (id:string) => {
  setLoading(true);
  setTimeout(() => {
    onClose();
  setShowAlert(true);
 
    setLoading(false);
  }, 3000);
}

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<UpdateUserModel>({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const size = ["xs"]
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  function InitialFocus() {

    const { isOpen, onOpen, onClose } = useDisclosure()
   
  
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
  }
 
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
        <ModalHeader>Create your account</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input ref={initialRef} placeholder='First name' />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Confirm Password</FormLabel>
            <Input placeholder='Last name' />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={() => acceptVerifyAccount("2")} 
          isLoading={loading}>
            Verify
          </Button >
         
        </ModalFooter>
      </ModalContent>
    </Modal>
<Box>
{showAlert && (
          <AlertBox
            status="success"
            text="Your account verification is ongoing, you will be notified once completed"
            onClose={() => setShowAlert(false)}
          />
        )}
     
</Box>
    <Box w="90%" mx="auto" mt="2rem">
    
    <Stack direction="row" spacing={6} width='80%' my='3rem' mx='3rem' bgColor='white' p='5rem'>
      <AccountSideBar />
      <Box w="55%" fontFamily='"DM Sans", sans-serif'>
        <form>
          <Stack spacing={3}>
            <PrimaryInput<UpdateUserModel>
              label="Bank Name"
              type="text"
              placeholder="Enter name of bank"
              name="phoneNumber"
              error={errors.phoneNumber}
              register={register}
              defaultValue={""}
            />
            <PrimaryInput<UpdateUserModel>
              label="Account Name"
              type="text"
              placeholder="Enter your account name"
              name="phoneNumber"
              error={errors.phoneNumber}
              register={register}
              defaultValue={""}
            />
            <PrimaryInput<UpdateUserModel>
              label="Account Number"
              type="text"
              placeholder="Enter your account number"
              name="phoneNumber"
              error={errors.phoneNumber}
              register={register}
              defaultValue={""}
            />
            <Box marginTop={50}>
              <HStack spacing="20px">
                <Link href="/vendor/account/update-security-question">
                <Button 
                  width="50%"
                  type="submit"
                  backgroundColor="brand.100"
                  color="white"
                >
                  Back
                </Button>
                </Link>
                <Link>
                <Button
                  width="50%"
                  // type="submit"
                  backgroundColor="brand.100"
                  color="white"
                  onClick={onOpen}
                >
                  Verify
                </Button>
                </Link>
              </HStack>
            </Box>
          </Stack>
        </form>
      </Box>
    </Stack>
</Box>
    </>
  
  );
}
