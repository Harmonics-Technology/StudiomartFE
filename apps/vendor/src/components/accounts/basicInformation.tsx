import React, { useContext, useRef, useState } from "react";
import {
  Box,
  Flex,
  Button,
  Circle,
  Icon,
  Text,
  Stack,
  Image,
} from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import AccountSideBar from "@components/accounts/AccountSideBar";
import register from "pages/register";
import { UpdateUserModel, UserService, UserView } from "src/services";
import { AlertBox, DisabledInput, PrimaryInput } from "ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { UserContext } from "@components/Context/UserContext";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { Widget } from "@uploadcare/react-widget";

const schema = yup.object().shape({
  // email: yup.string().email().required(),
});

export default function BasicInformation() {
  const [showAlert, setShowAlert] = useState({ status: false, content: "" });
  const [imageUrl, setImageUrl] = useState<any>("");
  const widgetApi = useRef<any>(null);
  const { user } = useContext(UserContext);
  const newUser: UserView = user;
  console.log({ widgetApi });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<UpdateUserModel>({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: {
      firstName: newUser?.firstName,
      lastName: newUser?.lastName,
      id: newUser?.id,
    },
  });
  const router = useRouter();

  const onChangeImg = (info: any) => {
    setImageUrl(info.originalUrl);
    const newData: UpdateUserModel = {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      profileURl: info.originalUrl,
      id: newUser.id,
      // phoneNumber: newUser.profilePicture
    };
    onSubmit(newData);
  };

  const onSubmit = async (data: UpdateUserModel) => {
    try {
      const result = await UserService.updateUser({ requestBody: data });
      if (result.status) {
        // toast.success("Successful!");
        setShowAlert({
          status: true,
          content:
            "Your information has been saved successfully and will reload shortly",
        });
        Cookies.set("vendor", JSON.stringify(result.data));
        router.reload();
        return;
      }
      setShowAlert({ status: true, content: result.message as string });
      // toast.error(result.message as string);
      return;
    } catch (err: any) {
      toast.error(err.message || err.body.message);
    }
  };
  return (
    <Stack
      direction="row"
      spacing={6}
      width="80%"
      my="3rem"
      mx="3rem"
      bgColor="white"
      p="5rem"
    >
      {showAlert.status && (
        <AlertBox
          status="success"
          text={showAlert.content}
          onClose={() => setShowAlert({ status: false, content: "" })}
        />
      )}
      <AccountSideBar />
      <Box w="55%" fontFamily='"DM Sans", sans-serif'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Circle
            bgColor={"grey"}
            color={"white"}
            size="5rem"
            pos={"relative"}
            overflow="hidden"
          >
            <Widget
              publicKey="fda3a71102659f95625f"
              systemDialog
              imagesOnly
              onChange={(info) => onChangeImg(info)}
              ref={widgetApi}
            />
            {newUser?.profilePicture !== null ? (
              <>
                <Image
                  src={imageUrl !== "" ? imageUrl : newUser?.profilePicture}
                  w="full"
                  h="full"
                  objectFit="cover"
                  alt="Profile Picture"
                />
              </>
            ) : (
              <Box onClick={() => widgetApi.current?.openDialog()}>
                <Icon as={FaUser} />
                <Box
                  pos={"absolute"}
                  top="50%"
                  left="50%"
                  transform={"translate(-50%, -50%)"}
                >
                  <Text>Upload Image</Text>
                </Box>
              </Box>
            )}
          </Circle>
          <Stack spacing={3}>
            <PrimaryInput<UpdateUserModel>
              label="First Name"
              type="text"
              placeholder="Enter your first name"
              name="firstName"
              error={errors.firstName}
              register={register}
              // defaultValue={newUser?.firstName}
            />
            <PrimaryInput<UpdateUserModel>
              label="Last Name"
              type="text"
              placeholder="Enter your lastname"
              name="lastName"
              error={errors.lastName}
              register={register}
              // defaultValue={newUser?.lastName}
            />
            <DisabledInput<UpdateUserModel>
              label="Email Address"
              type="text"
              placeholder="Enter your email address"
              defaultValue={newUser?.email}
              disableLabel={true}
            />
            <PrimaryInput<UpdateUserModel>
              label="Phone Number"
              type="text"
              placeholder="Enter your phonenumber"
              name="phoneNumber"
              error={errors.phoneNumber}
              register={register}
              defaultValue={""}
            />
            {/* <Link href="/vendor/account/kyc-information" passHref> */}
            <Flex justifyContent="flex-end">
              <Button
                // disabled={!isValid}
                bgColor="brand.100"
                color="white"
                width="50%"
                type="submit"
                isLoading={isSubmitting}
              >
                Save
              </Button>
            </Flex>
            {/* </Link> */}
          </Stack>
        </form>
      </Box>
    </Stack>
  );
}
