import React, { useState } from "react";
import {
  Box,
  Input,
  Button,
  Icon,
  Grid,
  FormControl,
  Text,
  Stack,
  HStack,
  FormLabel,
} from "@chakra-ui/react";
// import { FaFileUpload } from 'react-icons/fa';
import { BiCloudUpload } from "react-icons/bi";
<style>
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');
</style>
import Link from "next/link";
import AccountSideBar from "@components/accounts/AccountSideBar";
import register from "pages/register";
import { UpdateUserModel } from "src/services";
import PrimaryInput from "src/utils/PrimaryInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email().required()
});
export default function KycInformation() {
  const [officeaddress, setOfficeAddress] = useState<string>("");
  const [studiocapacity, setStudioCapacity] = useState("");
  const [cacdocument, setCACDocument] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const handleSubmits = (e: any) => {
    e.preventDefault();
    alert(
      `officeaddress: ${officeaddress}, studiocapacity: ${studiocapacity}, cacdocument: ${cacdocument}  phonenumber: ${phonenumber}`
    );
  };
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<UpdateUserModel>({
    resolver: yupResolver(schema),
    mode: "all",
  });
  const areAllFieldsFilled = (officeaddress != "") && (officeaddress !="")
  return (
    <Stack direction="row" spacing={6} width='80%' my='3rem' mx='3rem' bgColor='white' p='5rem'>
      <AccountSideBar />
      <Box w="55%" fontFamily='"DM Sans", sans-serif'>
        <form>
          <Stack spacing={3}>
            <PrimaryInput<UpdateUserModel>
              label="Office Address"
              type="text"
              placeholder="Enter your office address"
              name="phoneNumber"
              error={errors.phoneNumber}
              register={register}
              defaultValue={""}
            />
               <PrimaryInput<UpdateUserModel>
              label="Email Address"
              type="text"
              placeholder="Enter your email address"
              name="phoneNumber"
              error={errors.phoneNumber}
              register={register}
              defaultValue={""}
            />
                 <FormLabel color='#636363' fontWeight='100' fontFamily='DM Sans'>CAC Document</FormLabel>
            <Button fontWeight='400' fontSize='16px' height='3.5rem' color='#AFAFAF' bgColor='white' border='1px dotted #afafaf82' justifyContent='center' borderRadius='8px' >
                <Grid>
                    <Box>
                        <Text>image_scanner_photo.jpg</Text>
                    </Box>
                </Grid>
            </Button> 
            <FormLabel color='#636363' fontWeight='100'>Upload a valid means of identification</FormLabel>
            <Button fontWeight='400' fontSize='16px' height='3.5rem' color='#AFAFAF' bgColor='white' border='1px dotted #afafaf82' justifyContent='center' borderRadius='8px' >
                <Grid>
                    <Box marginLeft={130}>
                        <BiCloudUpload/>
                    </Box>
                
                    <Box>
                        <Text>Click here to upload your identification</Text>
                    </Box>
                </Grid>
            </Button>
             <HStack spacing='24px'>

            <Link href='/vendor/account/basic-information' passHref>
            <Button disabled={!
                areAllFieldsFilled}color='white' bgColor='brand.100' width='50%' >Back </Button>
            </Link>
            <Link href='/vendor/account/bank-details' passHref>
            <Button disabled={!
                areAllFieldsFilled}color='white' bgColor='brand.100' width='50%' >Next </Button>
            </Link>
            </HStack>
          </Stack>
        </form>
      </Box>
    </Stack>
  );
}
