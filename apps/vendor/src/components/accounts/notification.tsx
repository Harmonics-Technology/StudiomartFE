import React, { useEffect, useState } from "react";
import {
  Flex,
  Box,
  Button,
  Text,
  Stack,
  HStack,
  Radio,
  Checkbox,
  VStack,
} from "@chakra-ui/react";
import AccountSideBar from "@components/accounts/AccountSideBar";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { UpdateUserModel, UserService, UserView } from "src/services";

const schema = yup.object().shape({
  // allowEmailNotification: yup.string().required(),
});

export default function Notifications() {
  const [userInfo, setUserInfo] = useState<UserView>();
  const [sms, setSms] = useState(userInfo?.allowSmsNotification);
  const [email, setEmail] = useState(userInfo?.allowEmailNotification);
  const [inApp, setInApp] = useState(userInfo?.allowPushNotification);
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<UpdateUserModel>({
    resolver: yupResolver(schema),
    mode: "all",
  });
  const router = useRouter();
  const onSubmit = async (data: UpdateUserModel) => {
    console.log({ data });
    try {
      const result = await UserService.updateUser({ requestBody: data });
      if (result.status) {
        toast.success(
          "Your information has been saved successfully and will reload shortly"
        );
        Cookies.set("vendor", JSON.stringify(result.data));
        router.reload();
        return;
      }
      toast.error(result.message as string);
      return;
    } catch (error: any) {
      toast.error(error?.body?.message || error?.message, {
        className: "loginToast",
      });
    }
  };
  useEffect(() => {
    const isUser = Cookies.get("vendor");
    if (isUser !== undefined) {
      const user = JSON.parse(isUser as unknown as string);
      reset({
        firstName: user?.firstName,
        lastName: user?.lastName,
        phoneNumber: user?.phoneNumber,
        id: user?.id,
        profileURl: user?.profilePicture,
        allowEmailNotification: user?.allowEmailNotification,
        allowPushNotification: user?.allowPushNotification,
        allowSmsNotification: user.allowSmsNotification,
      });
    }
  }, []);

  return (
    <Flex
      bgColor="white"
      align="center"
      minH="60vh"
      w="90%"
      mx="auto"
      my="3rem"
    >
      <Stack
        direction="row"
        spacing={0}
        gap="2rem"
        width="90%"
        ml="5rem"
        py="5rem"
      >
        <AccountSideBar />
        <Box w="55%" fontFamily='"DM Sans", sans-serif'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={0} gap="1.5rem">
              <Text mb="0">
                Spam is something that everyone despises. This kind that is sent
                by email. We do not need to make sure you get the vital
                information, and you might enjoy the cool information as well.
              </Text>
              <Text>
                Don&#39;t worry, you&#39;ll be able to go back and make changes
                later.
              </Text>
              <Text mb="0" fontWeight="600">
                How should we notify you about your account activity? Not to
                worry, you can edit this later
              </Text>
              <HStack spacing="24px">
                <Checkbox
                  onChange={(e) =>
                    setValue("allowSmsNotification", e.target.checked)
                  }
                  isChecked={watch("allowSmsNotification")}
                >
                  SMS
                </Checkbox>
                <Checkbox
                  onChange={(e) =>
                    setValue("allowEmailNotification", e.target.checked)
                  }
                  isChecked={watch("allowEmailNotification")}
                >
                  EMAIL
                </Checkbox>
              </HStack>
              <VStack align="flex-start">
                <Text fontWeight="600" fontSize="16px" mb="0">
                  Activate push notifications?
                </Text>
                <Text>For important updates and account notifications</Text>
                <Checkbox
                  onChange={(e) =>
                    setValue("allowPushNotification", e.target.checked)
                  }
                  isChecked={watch("allowPushNotification")}
                >
                  Yes please do
                </Checkbox>
              </VStack>
              <Flex justifyContent="flex-end" w="full">
                <Button
                  isDisabled={!isValid}
                  bgColor="brand.100"
                  color="white"
                  width="100%"
                  type="submit"
                  isLoading={isSubmitting}
                  h="3rem"
                >
                  Save
                </Button>
              </Flex>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}

//   return (
//     <Flex width="full" align="center" justifyContent="center">
//       <AccountSideBar/>
//       <Box p={2}>
//         <Box my={4} textAlign="left">
//         <Box p={8} maxWidth="500px" >
//           <Text>
//              Spam is something that everyone despises. This kind that is sent by email.
//              We do not need to make sure you get the vital information, and you might enjoy
//              the cool information as well.
//           </Text>
//           <Text>
//              Don't worry, you'll be able to go back and make changes later.
//           </Text>
//           <Text>
//              How should we notify you about your account activity?
//              Not to worry, you can edit this later
//           </Text>
//         <Button width="50%" type="submit" backgroundColor="blue" color="white" >
//              Update Settings
//         </Button>
//         </Box>
//         </Box>
//       </Box>
//     </Flex>
//   );}
