import {
  Flex,
  Box,
  Text,
  HStack,
  Image,
  Icon,
  useDisclosure,
  Button,
  Grid,
  FormLabel,
  Square,
  Tooltip,
  Table,
  TableContainer,
  Tbody,
  Thead,
  Tr,
  Th,
  Td,
  Spinner,
} from "@chakra-ui/react";
import { ServiceSlider } from "@components/Dashboard/ServicesSlider";
import React, { useContext, useRef, useState } from "react";
import {
  AdditionalService,
  UpdateServiceModel,
  ServiceTypeView,
  ServiceTypeViewListStandardResponse,
  ServiceView,
  StudioService,
  StudioView,
  AdditionalServiceModel,
  MediaView,
} from "src/services";
import {
  CurrencyField,
  DisabledInput,
  ModalWrapper,
  PrimaryInput,
  PrimarySelect,
  PrimaryTextarea,
} from "ui";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import YupPassword from "yup-password";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { FaTrash } from "react-icons/fa";
import { Widget } from "@uploadcare/react-widget";
import { AiFillDelete, AiFillEdit, AiOutlinePlus } from "react-icons/ai";
import { UserContext } from "@components/Context/UserContext";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FiUpload } from "react-icons/fi";
import { HiInformationCircle } from "react-icons/hi";
YupPassword(yup);

const validation = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().minWords(20),
  price: yup.string().required(),
  serviceTypeId: yup.string().required(),
});
const schema = yup.object().shape({
  //   name: yup.string().required(),
  //   price: yup.string().required(),
});

type Props = {
  isOpen: any;
  onClose: any;
  serviceTypes?: ServiceTypeViewListStandardResponse;
  service: ServiceView;
};

const EditServiceModal = ({
  isOpen,
  onClose,
  serviceTypes,
  service,
}: Props) => {
  const { currentStudioId } = useContext(UserContext);
  // console.log({ currentStudioId });
  const router = useRouter();
  const [imageBox, setImageBox] = useState<any[]>([0]);
  const [uploadedMedia, setUploadedMedia] = useState<any[]>([]);

  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<UpdateServiceModel>({
    resolver: yupResolver(validation),
    mode: "all",
    defaultValues: {
      id: service.id,
      bannerImageURL: service.bannerImageURL,
      description: service.description,
      name: service.name,
      price: service.price,
      serviceTypeId: service.serviceTypeId,
    },
  });
  const {
    handleSubmit: handleAdditionalSubmit,
    handleSubmit: handleEditingSubmit,
    register: registers,
    control: controls,
    formState: {
      errors: isError,
      isSubmitting: isAddSubmit,
      isValid: isAddValid,
    },
  } = useForm<AdditionalServiceModel>({
    resolver: yupResolver(schema),
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

  const [editing, setEditing] = useState({ state: false, id: "" });

  const additionServicesFn = async (data: AdditionalServiceModel) => {
    data.serviceId = service.id;
    try {
      const result = await StudioService.createAdditionalService({
        requestBody: data,
      });
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
  const editItem = async (data: AdditionalServiceModel) => {
    (data.id = editing.id), (data.serviceId = service.id);
    try {
      const result = await StudioService.updateAAdditionalService({
        requestBody: data,
      });
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

  const [loading, setLoading] = useState(false);
  const deleteItems = async (id: string) => {
    setLoading(true);
    try {
      const result = await StudioService.deleteAdditionalService({
        id,
      });
      console.log({ result });
      if (result.status) {
        setLoading(false);
        toast.success("Successful!");
        router.reload();
        return;
      }
      setLoading(false);
      toast.error(result.message as string);
      return;
    } catch (error: any) {
      setLoading(false);
      toast.error(error?.body?.message || error?.message);
    }
  };
  const deleteServiceImage = async (id: string) => {
    try {
      const result = await StudioService.deleteServiceImage({
        id,
      });
      if (result.status) {
        toast.success("Successful!");
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

  const [bannerUrl, setBannerUrl] = useState();
  const [imageLoading, setImageLoading] = useState<any>({
    status: false,
    total: "",
  });
  const widgetApi = useRef<any>(null);
  const uploadBannerUrl = (file: any) => {
    if (file) {
      file.progress((info: any) => {
        setImageLoading({ status: true, total: info.progress });
      });
      file.done((info: any) => {
        setImageLoading({ status: false, total: "" });
        setBannerUrl(info.originalUrl);
      });
    }
  };

  const closeModal = () => {
    onClose();
    router.reload();
  };

  const onSubmit = async (data: UpdateServiceModel) => {
    bannerUrl
      ? (data.bannerImageURL = bannerUrl)
      : (data.bannerImageURL = data.bannerImageURL);
    try {
      const result = await StudioService.updateService({ requestBody: data });
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
        title="Add a service"
        isOpen={isOpen}
        onClose={onClose}
        w="50%"
      >
        <form>
          <PrimaryInput<UpdateServiceModel>
            label="Service Name"
            placeholder=""
            name="name"
            error={errors.name}
            register={register}
          />
          <Grid templateColumns={["repeat(2,1fr)"]} gap="1.5rem" mt="1.5rem">
            <CurrencyField<UpdateServiceModel>
              placeholder="₦0.00"
              defaultValue={service.price}
              register={register}
              error={errors.price}
              name={"price"}
              control={control}
              label="Service Price (NGN)"
            />
            <PrimarySelect<UpdateServiceModel>
              label="Service Type"
              placeholder=""
              name="serviceTypeId"
              error={errors.serviceTypeId}
              register={register}
              options={
                <>
                  <option selected hidden>
                    {service.serviceType?.name}
                  </option>
                  {serviceTypes?.data?.map((x: ServiceTypeView) => (
                    <option value={x.id} key={x.id}>
                      {x.name}
                    </option>
                  ))}
                </>
              }
            />
          </Grid>

          <Box my="1.5rem">
            <Box display="none">
              <Widget
                publicKey="fda3a71102659f95625f"
                systemDialog
                imagesOnly
                onFileSelect={uploadBannerUrl}
                ref={widgetApi}
                inputAcceptTypes={".jpeg,.jpg, .png"}
              />
            </Box>
            <FormLabel fontSize=".8rem">Upload Cover Image</FormLabel>
            <Flex
              justify="center"
              align="center"
              h="5rem"
              w="full"
              borderRadius="10px"
              overflow="hidden"
              bgColor="gray.100"
              border="1px solid"
              borderColor="gray.400"
            >
              {service.bannerImageURL || bannerUrl ? (
                <Box
                  role="group"
                  pos="relative"
                  w="full"
                  h="full"
                  overflow="hidden"
                >
                  <Image
                    src={bannerUrl || (service.bannerImageURL as string)}
                    alt="Banner Image"
                    w="full"
                    h="full"
                    objectFit="cover"
                  />
                  <Box
                    pos="absolute"
                    bottom="-50px"
                    right="0"
                    bgColor="brand.100"
                    color="white"
                    p=".5rem 1rem"
                    cursor="pointer"
                    transition=".5s all ease"
                    onClick={() => widgetApi.current.openDialog()}
                    _groupHover={{
                      bottom: "0",
                    }}
                  >
                    Change Photo
                  </Box>
                </Box>
              ) : (
                <>
                  {imageLoading.status ? (
                    <Square size="4rem">
                      <CircularProgressbar
                        value={imageLoading.total}
                        maxValue={1}
                        text={`${imageLoading.total * 100}%`}
                      />
                    </Square>
                  ) : (
                    <Icon
                      as={FiUpload}
                      fontSize="2rem"
                      cursor="pointer"
                      onClick={() => widgetApi.current.openDialog()}
                    />
                  )}
                </>
              )}
            </Flex>
          </Box>
          <Grid templateColumns={["repeat(2,1fr)"]} gap="1.5rem">
            <Box minW="0">
              <PrimaryTextarea<UpdateServiceModel>
                label="Service Details"
                placeholder=""
                name="description"
                error={errors.description}
                register={register}
                defaultValue={""}
              />
            </Box>
            <Box minW="0">
              <FormLabel fontSize=".8rem">Upload Images</FormLabel>
              <HStack w="full" align="flex-start" gap=".5rem">
                <HStack gap=".5rem" overflow="auto" pb=".5rem">
                  {service.media?.map((x: MediaView) => (
                    <Flex
                      key={x.id}
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
                    >
                      <Image
                        src={x.url as string}
                        alt="propery-image"
                        w="100%"
                        height="100%"
                        objectFit="cover"
                      />
                      <Box
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
                        zIndex="888"
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
                          onClick={() => deleteServiceImage(x.id as string)}
                        />
                      </Box>
                    </Flex>
                  ))}
                </HStack>
                <Box>
                  <HStack
                    w="full"
                    gap=".5rem"
                    overflow="auto"
                    pb=".5rem"
                    // flexWrap="wrap"
                    // spacing="0"
                  >
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

                        {uploadedMedia?.find((x) => x.id == b) ? (
                          <>
                            <Image
                              src={uploadedMedia.find((x) => x.id == b).url}
                              alt="propery-image"
                              w="100%"
                              height="100%"
                              objectFit="cover"
                            />
                            <Box
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
                              zIndex="888"
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
                                    uploadedMedia.filter((x: any) => x.id !== b)
                                  );
                                }}
                              />
                            </Box>
                          </>
                        ) : (
                          <Icon as={AiOutlinePlus} />
                        )}
                      </Flex>
                    ))}
                  </HStack>
                  <HStack justify="space-between">
                    <Text
                      fontSize="12px"
                      mb="0"
                      color="brand.100"
                      cursor="pointer"
                      onClick={() =>
                        setImageBox([...imageBox, imageBox.at(-1) + 1])
                      }
                    >
                      Add More
                    </Text>
                  </HStack>
                </Box>
              </HStack>
            </Box>
          </Grid>
        </form>
        <Box my=".5rem">
          <HStack align="center" spacing="0">
            <FormLabel fontSize=".9rem" mb="0">
              Additional services
            </FormLabel>
            <Tooltip
              hasArrow
              p=".5rem"
              label="Additional services are optional services that are rendered by a service manager upon request by a customer. This services have their own price and are compatible with the current service being added to"
            >
              <span>
                <Icon as={HiInformationCircle} cursor="help" />
              </span>
            </Tooltip>
          </HStack>
          {(service?.additionalServices as AdditionalService[])?.length > 0 && (
            <Box w="full" mt="1rem">
              <TableContainer>
                <Table>
                  <Thead>
                    <Tr bgColor={"gray.100"}>
                      <Th minW="300px">Addon Name</Th>
                      <Th>Price</Th>
                      <Th></Th>
                      <Th></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {service?.additionalServices?.map(
                      (x: AdditionalService, i) => (
                        <Tr key={x.id}>
                          <Td>
                            <HStack>
                              <Text mr="1rem" mb="0">
                                {++i}
                              </Text>
                              <Text mb="0">{x.name}</Text>
                            </HStack>
                          </Td>
                          <Td>{x.price}</Td>
                          <Td>
                            <Icon
                              as={AiFillEdit}
                              cursor="pointer"
                              onClick={() =>
                                setEditing({ state: true, id: x.id as string })
                              }
                            />
                          </Td>
                          <Td>
                            {loading ? (
                              <Spinner size="sm" />
                            ) : (
                              <Icon
                                as={AiFillDelete}
                                cursor="pointer"
                                onClick={() => deleteItems(x.id as string)}
                              />
                            )}
                          </Td>
                        </Tr>
                      )
                    )}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          )}
          <form>
            <Grid templateColumns={["repeat(2,1fr)"]} gap="1.5rem" mt="1rem">
              <PrimaryInput<AdditionalServiceModel>
                label="Addon Name"
                placeholder=""
                name="name"
                error={isError.name}
                register={registers}
                defaultValue={
                  service.additionalServices?.find((x) => x.id == editing.id)
                    ?.name || ""
                }
              />
              <CurrencyField<AdditionalServiceModel>
                placeholder="₦0.00"
                defaultValue={
                  service.additionalServices?.find((x) => x.id == editing.id)
                    ?.price || ""
                }
                register={registers}
                error={isError.price}
                name={"price"}
                control={controls}
                label="Service Price (NGN)"
              />
            </Grid>
            <Button
              fontSize=".8rem"
              bgColor="gray.400"
              color="white"
              type="button"
              mt="1rem"
              isLoading={isAddSubmit}
              isDisabled={!isAddValid}
              onClick={
                editing.state
                  ? handleEditingSubmit(editItem)
                  : handleAdditionalSubmit(additionServicesFn)
              }
              _hover={{
                bgColor: "brand.100",
              }}
            >
              {editing.state ? "- Confirm edit" : " + Add a service"}
            </Button>
          </form>
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
            onClick={handleSubmit(onSubmit)}
          >
            Update Service
          </Button>
        </HStack>
      </ModalWrapper>
    </>
  );
};

export default EditServiceModal;
