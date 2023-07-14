import {
  Box,
  Circle,
  Flex,
  Heading,
  Icon,
  Square,
  VStack,
  Text,
  Image,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  PrimaryInput,
  SubmitButton,
  PrimarySelect,
  BackToPage,
  DisabledInput,
} from "ui";
import { useForm } from "react-hook-form";
import { IProfileProps } from "src/models/schema";
import { FiUpload } from "react-icons/fi";
import { Widget } from "@uploadcare/react-widget";
import { CircularProgressbar } from "react-circular-progressbar";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { UpdateUserModel, UserService } from "src/services";
import { updateProfile } from "firebase/auth";
import { AuthContext } from "@components/Context/AuthContext";
import { FaUser } from "react-icons/fa";

const schema = yup.object().shape({
  // email: yup.string().email().required(),
});

const CustomerProfile = ({ user }: IProfileProps) => {
  const [imageUrl, setImageUrl] = useState<any>(user?.profilePicture);
  const { currentUser } = useContext(AuthContext);
  const [imageLoading, setImageLoading] = useState<any>({
    status: false,
    total: "0",
  });
  const [saveImagePrompt, setSaveImagePrompt] = useState(false);
  const widgetApi = useRef<any>(null);
  console.log({ imageUrl });
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValid },
  } = useForm<UpdateUserModel>({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      phoneNumber: user?.phoneNumber,
      id: user?.id,
      profileURl: user?.profilePicture,
    },
  });
  const router = useRouter();

  const onChangeImg = (file: any) => {
    if (file) {
      file.progress((info: any) => {
        setImageLoading({ status: true, total: info.progress });
        if (info.state == "ready") {
          setImageLoading({ status: false, total: "" }),
            setImageUrl(info.incompleteFileInfo.originalUrl);
          setSaveImagePrompt(true);
        }
      });
    }
  };

  const onSubmit = async (data: UpdateUserModel) => {
    imageUrl
      ? (data.profileURl = imageUrl)
      : (data.profileURl = data?.profileURl);
    try {
      const result = await UserService.updateUser({ requestBody: data });
      if (result.status) {
        await updateProfile(currentUser, {
          displayName: data.firstName,
          photoURL: imageUrl,
        });
        toast.success(
          "Your information has been saved successfully and will reload shortly"
        );
        Cookies.set("customer", JSON.stringify(result.data));
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
    const timer = setTimeout(() => {
      saveImagePrompt && setSaveImagePrompt(false);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [saveImagePrompt]);
  return (
    <Box bgColor="white" minH="100vh" pb="20" pt={["0", "0"]}>
      <Box w={["90%", "60%"]} mx="auto">
        {/* <BackToPage name="Back to home page" /> */}
        <Heading
          fontSize={["1.3rem", "2rem"]}
          py={{ base: "1rem", lg: "3rem" }}
          bgColor="white"
          mt="10"
          color="brand.100"
          px="3rem"
          textAlign="center"
        >
          My Profile Details
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="none">
            <Widget
              publicKey="fda3a71102659f95625f"
              systemDialog
              imagesOnly
              onFileSelect={onChangeImg}
              ref={widgetApi}
              inputAcceptTypes={".jpeg,.jpg, .png"}
            />
          </Box>
          <Flex
            w="full"
            py="10"
            flexDir="column"
            mt="1"
            bgColor="white"
            px={{ base: "1rem", lg: "5rem" }}
          >
            <Flex justify="center" mb="2rem">
              <Circle
                bgColor={"#636363"}
                color={"white"}
                size="6rem"
                pos={"relative"}
                overflow="hidden"
                cursor="pointer"
              >
                {user?.profilePicture !== null ? (
                  <Box
                    role="group"
                    onClick={() => widgetApi.current.openDialog()}
                  >
                    <Image
                      src={imageUrl}
                      w="full"
                      h="full"
                      objectFit="cover"
                      alt="Profile Picture"
                      pos="absolute"
                      top="0"
                      left="0"
                      opacity="1"
                      transition=".3s ease"
                      _groupHover={{
                        opacity: 0.2,
                      }}
                    />
                    <VStack
                      opacity="0"
                      transition=".3s ease"
                      _groupHover={{
                        opacity: 1,
                      }}
                    >
                      <Icon as={FiUpload} fontSize="1.2rem" />
                      <Text fontSize=".8rem">Change Image</Text>
                    </VStack>
                  </Box>
                ) : (
                  <Box
                    role="group"
                    onClick={() => widgetApi.current.openDialog()}
                  >
                    <Icon
                      as={FaUser}
                      fontSize="3rem"
                      pos="absolute"
                      left="50%"
                      top="50%"
                      transform="translate(-50%,-50%)"
                      opacity="1"
                      transition=".3s ease"
                      _groupHover={{
                        opacity: 0.5,
                      }}
                    />
                    <VStack
                      opacity="0"
                      transition=".3s ease"
                      _groupHover={{
                        opacity: 1,
                      }}
                    >
                      <Icon as={FiUpload} fontSize="1.2rem" />
                      <Text fontSize=".8rem">Upload Image</Text>
                    </VStack>
                  </Box>
                )}
              </Circle>
              {imageLoading.status && (
                <Square size="2rem">
                  <CircularProgressbar
                    value={imageLoading.total}
                    maxValue={1}
                    text={`${imageLoading.total * 100}%`}
                  />
                </Square>
              )}
            </Flex>
            <VStack gap="1.5rem" pos="relative">
              <PrimaryInput<UpdateUserModel>
                name="firstName"
                error={errors.firstName}
                register={register}
                label="first name"
                type="text"
                placeholder="first name"
                fontWeight="medium"
                focusBorderColor="brand.100"
                h="3.5rem"
              />
              <PrimaryInput<UpdateUserModel>
                name="lastName"
                error={errors.lastName}
                register={register}
                label="last name"
                type="text"
                placeholder="last name"
                fontWeight="medium"
                focusBorderColor="brand.100"
                h="3.5rem"
              />
              <DisabledInput<UpdateUserModel>
                label="Email Address"
                type="text"
                placeholder="Enter your email address"
                defaultValue={user?.email}
                disableLabel={true}
                h="3.5rem"
              />
              <PrimaryInput<UpdateUserModel>
                name="phoneNumber"
                error={errors.phoneNumber}
                register={register}
                label="phone number"
                type="text"
                placeholder="phone number"
                fontWeight="medium"
                focusBorderColor="brand.100"
                h="3.5rem"
              />
              {/* <PrimarySelect
              label="Gender(Optional)"
              focusBorderColor="brand.100"
              options={["", "male", "female"]}
            /> */}
              {/* <PrimaryInput<UpdateUserModel>
                name="name"
                error={undefined}
                register={register}
                label="Birthday(Optional)"
                type="date"
                fontWeight="medium"
                focusBorderColor="brand.100"
              /> */}
              <Box
                bgColor="black"
                color="white"
                p=".5rem 1rem"
                borderRadius="8px"
                pos="absolute"
                top="77%"
                fontSize=".8rem"
                opacity={saveImagePrompt ? "1" : "0"}
                transition=".5s ease all"
              >
                Click to save profile picture!
              </Box>
            </VStack>
            <Box my="2rem" w="full">
              <SubmitButton
                textContent="save"
                isLoading={isSubmitting}
                isValid={isValid}
                h="4rem"
              />
            </Box>
          </Flex>
        </form>
      </Box>
    </Box>
  );
};

export default CustomerProfile;
