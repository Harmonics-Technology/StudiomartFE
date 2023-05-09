import React, { useState } from 'react';
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Circle,
  Icon,
  Text,
  Stack,
  VStack,
} from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa';
import Link from "next/link";
import AccountSideBar from '@components/accounts/AccountSideBar';
import register from 'pages/register';
import { UpdateUserModel } from 'src/services';
import PrimaryInput from 'src/utils/PrimaryInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from "yup";

const schema = yup.object().shape({
    email: yup.string().email().required(),
  });

export default function BasicInformation() {
const [firstname, setFirstname] = useState<string>('');
const [lastname, setLastname] = useState('');
const [email, setEmail] = useState('');
const [phonenumber, setPhonenumber] = useState('');
const handleSubmits = (e:any) => {
  e.preventDefault();
alert(`firstname: ${firstname}, lastname: ${lastname}, Email: ${email}  phonenumber: ${phonenumber}`);
};
const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<UpdateUserModel>({
    resolver: yupResolver(schema),
    mode: "all",
  });
 
  const areAllFieldsFilled = (firstname != "") && (lastname !="")
    return (
      <Stack direction="row" spacing={6} width='80%' my='3rem' mx='3rem' bgColor='white' p='5rem'>
          <AccountSideBar/>
       <Box w="55%" fontFamily='"DM Sans", sans-serif'>
          <form>
          <Circle bgColor={"grey"} color={"white"} size="5rem" pos={"relative"}>
           <Icon as={FaUser}/>
            <Box pos={"absolute"} top="50%" left="50%" transform={"translate(-50%, -50%)"}>
                <Text>Upload Image</Text>
            </Box>
           </Circle>
            <Stack spacing={3}>
            <PrimaryInput<UpdateUserModel>
                      label="First Name"
                      type="text"
                      placeholder="Enter your first name"
                      name="phoneNumber"
                      error={errors.phoneNumber}
                      register={register}
                      defaultValue={''}
                    />
              <PrimaryInput<UpdateUserModel>
                      label="Last Name"
                      type="text"
                      placeholder="Enter your lastname"
                      name="phoneNumber"
                      error={errors.phoneNumber}
                      register={register}
                      defaultValue={''}
                    />
                    <PrimaryInput<UpdateUserModel>
                      label="Email Address"
                      type="text"
                      placeholder="Enter your email address"
                      name="phoneNumber"
                      error={errors.phoneNumber}
                      register={register}
                      defaultValue={''}
                    />
                    <PrimaryInput<UpdateUserModel>
                      label="Phone Number"
                      type="text"
                      placeholder="Enter your phonenumber"
                      name="phoneNumber"
                      error={errors.phoneNumber}
                      register={register}
                      defaultValue={''}
                    />
             <Link href='/vendor/account/kyc-information' passHref>
              <Flex justifyContent="flex-end">
               <Button disabled={!
                areAllFieldsFilled}
                  bgColor='brand.100' color='white' width='50%'>
                    Next 
                  </Button>
              </Flex>
             </Link>
            </Stack>
          </form>
        </Box>
      </Stack>
    );
  }

