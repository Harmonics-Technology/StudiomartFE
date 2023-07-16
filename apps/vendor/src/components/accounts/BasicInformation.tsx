import {
  Box,
  Button,
  Circle,
  Flex,
  Icon,
  Image,
  Square,
  Text,
  VStack,
} from "@chakra-ui/react";
import { AuthContext } from "@components/Context/AuthContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { Widget } from "@uploadcare/react-widget";
import { updateProfile } from "firebase/auth";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaUser } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import NoSSR from "react-no-ssr";
import { UpdateUserModel, UserService, UserView } from "src/services";
import { DisabledInput, PrimaryInput } from "ui";
import * as yup from "yup";
import AccountContainer from "./AccountContainer";

// const Widget = dynamic(
//   () => import("@uploadcare/react-widget").then((mod) => mod.Widget),
//   { ssr: false }
// );

const schema = yup.object().shape({
  // email: yup.string().email().required(),
});

export default function BasicInformation({ user }: { user: UserView }) {
  const [imageUrl, setImageUrl] = useState<any>("");
  const [imageLoading, setImageLoading] = useState<any>({
    status: false,
    total: "0",
  });
  const { currentUser } = useContext(AuthContext);
  const [saveImagePrompt, setSaveImagePrompt] = useState(false);
  const widgetApi = useRef<any>(null);
  //

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
      allowEmailNotification: user?.allowEmailNotification,
      allowPushNotification: user?.allowPushNotification,
      allowSmsNotification: user?.allowSmsNotification,
    },
  });
  const router = useRouter();

  const onChangeImg = async (file: any) => {
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
    const timer = setTimeout(() => {
      saveImagePrompt && setSaveImagePrompt(false);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [saveImagePrompt]);
  return (
    <AccountContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <NoSSR>
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
        </NoSSR>
        <Flex
          justify={{ base: "center", lg: "flex-start" }}
          align="flex-end"
          gap=".5rem"
          mb="1rem"
        >
          <Circle
            bgColor={"#636363"}
            color={"white"}
            size="6rem"
            pos={"relative"}
            overflow="hidden"
            cursor="pointer"
          >
            {user?.profilePicture !== null ? (
              <Box role="group" onClick={() => widgetApi.current.openDialog()}>
                <Image
                  src={imageUrl !== "" ? imageUrl : user?.profilePicture}
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
              <Box role="group" onClick={() => widgetApi.current.openDialog()}>
                {imageUrl ? (
                  <Image
                    src={imageUrl !== "" ? imageUrl : user?.profilePicture}
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
                ) : (
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
                )}
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
          {/* {saveImagePrompt && (
                )} */}
          {/* <Box
                bgColor="black"
                color="white"
                p=".5rem 1rem"
                borderRadius="8px"
                opacity={saveImagePrompt ? "1" : "0"}
                transition=".5s ease all"
                fontSize=".8rem"
              >
                Click save to save profile picture!
              </Box> */}
        </Flex>
        <VStack gap="1rem" pos="relative">
          <PrimaryInput<UpdateUserModel>
            label="First Name"
            type="text"
            placeholder="Enter your first name"
            name="firstName"
            error={errors.firstName}
            register={register}
            // defaultValue={user?.firstName}
          />
          <PrimaryInput<UpdateUserModel>
            label="Last Name"
            type="text"
            placeholder="Enter your lastname"
            name="lastName"
            error={errors.lastName}
            register={register}
            // defaultValue={user?.lastName}
          />
          <DisabledInput<UpdateUserModel>
            label="Email Address"
            type="text"
            placeholder="Enter your email address"
            defaultValue={user?.email}
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
          {/* {saveImagePrompt && (
              )} */}
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
        </VStack>
      </form>
    </AccountContainer>
  );
}
