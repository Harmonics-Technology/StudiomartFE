import {
  Flex,
  Box,
  Text,
  HStack,
  Image,
  Icon,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { ServiceSlider } from "@components/Dashboard/ServicesSlider";
import React, { useRef, useState } from "react";
import { ServiceModel, StudioService, StudioView } from "src/services";
import { ModalWrapper, PrimaryInput, PrimarySelect, PrimaryTextarea } from "ui";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import YupPassword from "yup-password";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { FaTrash } from "react-icons/fa";
import { Widget } from "@uploadcare/react-widget";
import { AiOutlinePlus } from "react-icons/ai";
YupPassword(yup);

const validation = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  price: yup.string().required(),
  studioId: yup.string().required(),
});

type Props = {
  isOpen: any;
  onClose: any;
  studios: any;
};

const AddingOptionsModal = ({ isOpen, onClose, studios }: Props) => {
  studios = studios?.data?.value;
  const router = useRouter();
  const [imageBox, setImageBox] = useState<any[]>([0, 1, 2, 3]);
  const [uploadedMedia, setUploadedMedia] = useState<any[]>([]);
  const { isOpen: open, onOpen: opens, onClose: close } = useDisclosure();
  const { isOpen: opened, onOpen: opensed, onClose: closed } = useDisclosure();
  // let widgetApi = useRef<any>([]);
  // widgetApi.current = [0, 0, 0, 0].map(
  //   (ref, index) => (widgetApi.current[index] = React.createRef())
  // );
  // const openFileUpload = (index: any) => {
  //   widgetApi.current[index]?.current.openDialog();
  // };
  // console.log({
  //   uploadedMedia,
  //   imageBox,
  //   widgetApi,
  // });
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ServiceModel>({
    resolver: yupResolver(validation),
    mode: "all",
  });
  const {
    handleSubmit: studioSubmit,
    register: registers,
    formState: { errors: error, isSubmitting: submitting },
  } = useForm<ServiceModel>({
    resolver: yupResolver(validation),
    mode: "all",
  });

  const onChangeImg = (info: any, id: number) => {
    console.log({ info, id });
    let newMedia = {
      url: info.originalUrl,
      id: id,
    };

    setUploadedMedia([...uploadedMedia, newMedia]);
    console.log({ uploadedMedia });
  };

  const closeModal = () => {
    onClose();
    router.reload();
  };

  const onSubmit = async (data: ServiceModel) => {
    data.mediaUrls = uploadedMedia.map((x: any) => x.url);
    try {
      const result = await StudioService.createService({ requestBody: data });
      console.log({ result });
      if (result.status) {
        toast.success("Successful!");
        router.reload();
        return;
      }
      toast.error(result.message as string);
      return;
    } catch (error: any) {
      toast.error(error?.body?.message || error?.message);
    }
  };
  return (
    <>
      <ModalWrapper
        title="Select an Option"
        isOpen={isOpen}
        onClose={onClose}
        w="35%"
      >
        <Flex gap="2rem" h="12rem">
          <Flex
            w="full"
            h="6rem"
            boxShadow="0px 20px 26px rgba(186, 182, 182, 0.16)"
            border="1px solid #e8e8e8"
            borderRadius="8px"
            onClick={opens}
            justify="center"
            align="center"
            cursor="pointer"
          >
            <Text mb="0" fontSize="28px" fontWeight="500">
              Services
            </Text>
          </Flex>
          <Flex
            w="full"
            h="6rem"
            boxShadow="0px 20px 26px rgba(186, 182, 182, 0.16)"
            border="1px solid #e8e8e8"
            borderRadius="8px"
            onClick={opensed}
            justify="center"
            align="center"
            cursor="pointer"
          >
            <Text mb="0" fontSize="28px" fontWeight="500">
              Studio
            </Text>
          </Flex>
        </Flex>
      </ModalWrapper>

      <ModalWrapper title="Add a service" isOpen={open} onClose={close}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <PrimaryInput<ServiceModel>
            label="Service Name"
            placeholder=""
            name="name"
            error={errors.name}
            register={register}
          />
          <PrimarySelect<ServiceModel>
            label="Service Studio"
            placeholder=""
            name="studioId"
            error={errors.studioId}
            register={register}
            options={studios?.map((x: StudioView, i: any) => (
              <option value={x.id} key={i}>
                {x.name}
              </option>
            ))}
          />
          <PrimaryInput<ServiceModel>
            label="Service Price (NGN)"
            placeholder=""
            name="price"
            error={errors.price}
            register={register}
          />
          <PrimaryTextarea<ServiceModel>
            label="Service Details"
            placeholder=""
            name="description"
            error={errors.description}
            register={register}
            defaultValue={""}
          />
          <Box>
            <Text fontSize="14px">Upload Images</Text>
            <HStack w="full" gap=".5rem" overflow="auto" pb=".5rem">
              {imageBox.map((b, i) => (
                <Flex
                  key={i}
                  w="70px"
                  h="70px"
                  borderRadius="5px"
                  border="1px solid"
                  flexShrink={0}
                  overflow="hidden"
                  role="group"
                  justify="center"
                  align="center"
                  pos="relative"
                  // onClick={() => openFileUpload}
                >
                  <Widget
                    publicKey="fda3a71102659f95625f"
                    //@ts-ignore
                    id="file"
                    systemDialog
                    imagesOnly
                    onChange={(info) => onChangeImg(info, b)}
                    //@ts-ignore
                    // ref={widgetApi.current[i]}
                  />
                  {/* <Box
                    pos="absolute"
                    left="50%"
                    top="50%"
                    w="full"
                    h="full"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    transition=".5s ease all"
                    opacity="0"
                    cursor="pointer"
                    transform="translate(-50%, -50%)"
                    _groupHover={{
                      opacity: 1,
                      bgColor: "rgba(0,0,0,.5)",
                    }}
                  >
                    <FaTrash
                      color="white"
                      fontSize="1rem"
                      onClick={() => {
                        setUploadedMedia(
                          uploadedMedia.filter((x: any) => x.id !== x)
                        );
                      }}
                    />
                  </Box> */}
                  {uploadedMedia?.find((x) => x.id == b) ? (
                    <Image
                      src={uploadedMedia.find((x) => x.id == b).url}
                      alt="propery-image"
                      w="100%"
                      height="100%"
                      objectFit="cover"
                    />
                  ) : (
                    <Icon as={AiOutlinePlus} />
                  )}
                </Flex>
              ))}
            </HStack>
            <HStack justify="space-between">
              <Text fontSize="12px" mb="0">
                *First image will be set as service cover
              </Text>
              <Text
                fontSize="12px"
                mb="0"
                color="brand.100"
                cursor="pointer"
                onClick={() => setImageBox([...imageBox, imageBox.at(-1) + 1])}
              >
                Add More
              </Text>
            </HStack>
          </Box>
          <HStack mt="1.5rem" gap="2rem">
            <Button
              variant="outline"
              borderColor="brand.100"
              color="brand.100"
              w="full"
              h="3rem"
              borderRadius="4px"
              onClick={closeModal}
            >
              Cancel
            </Button>
            <Button
              // variant="solid"
              bgColor="brand.100"
              color="white"
              w="full"
              h="3rem"
              borderRadius="4px"
              type="submit"
              disabled={!isValid}
              isLoading={isSubmitting}
            >
              List Service
            </Button>
          </HStack>
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddingOptionsModal;
