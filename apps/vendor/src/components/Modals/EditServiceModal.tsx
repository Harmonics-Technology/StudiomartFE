import {
  Box,
  Button,
  Flex,
  FormLabel,
  Grid,
  HStack,
  Icon,
  IconButton,
  Image,
  Spinner,
  Square,
  Tooltip,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { UserContext } from "@components/Context/UserContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { Widget } from "@uploadcare/react-widget";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiFillDelete, AiOutlinePlus } from "react-icons/ai";
import { BsCheck2All } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { HiInformationCircle } from "react-icons/hi";
import {
  AdditionalService,
  AdditionalServiceModel,
  MediaView,
  ServiceTypeView,
  ServiceTypeViewListStandardResponse,
  ServiceView,
  StudioService,
  UpdateServiceModel,
} from "src/services";
import {
  CurrencyField,
  DisabledInput,
  ModalWrapper,
  PrimaryInput,
  PrimarySelect,
  PrimaryTextarea,
} from "ui";
import * as yup from "yup";
import YupPassword from "yup-password";
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
  const router = useRouter();
  const [mediaUrl, setMediaUrl] = useState<string>("");
  const widgetImageApi = useRef<any>(null);

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

  const [loading, setLoading] = useState<any>({
    status: false,
    id: "",
    delete: false,
  });

  const onChangeImg = (file: any) => {
    if (file) {
      file.progress((info: any) => {
        setLoading({ status: true, id: "imageLoad" });
        if (info.state == "ready") {
          setLoading({ status: false, total: "" }),
            AddServiceImage(info.incompleteFileInfo.originalUrl);
        }
      });
    }
  };

  const [populatedItem, setPopulatedItem] = useState<any>(
    service?.additionalServices
  );
  const [populatedImages, setPopulatedImages] = useState<any>(service.media);
  const [newField, setNewField] = useState<any>([]);
  const [addon, setAddon] = useState({
    id: "",
    name: undefined,
    price: undefined,
  });

  const additionServicesFn = async (data: AdditionalServiceModel) => {
    data.serviceId = service.id;

    try {
      const result = await StudioService.createAdditionalService({
        requestBody: data,
      });

      if (result.status) {
        toast.success("Successful!", { className: "loginToast" });
        setNewField([]);
        const services = await StudioService.getServiceById({
          id: service.id as string,
        });
        setPopulatedItem(services.data?.additionalServices);

        // router.reload();
        return;
      }
      toast.error(result.message as string, { className: "loginToast" });
      return;
    } catch (error: any) {
      toast.error(error?.body?.message || error?.message);
    }
  };

  const editItem = async (data: AdditionalServiceModel) => {
    setLoading({ status: true, id: data.id });
    try {
      const result = await StudioService.updateAAdditionalService({
        requestBody: data,
      });

      if (result.status) {
        toast.success("Successful!", { className: "loginToast" });
        const services = await StudioService.getServiceById({
          id: service.id as string,
        });
        setLoading({ status: false });
        setPopulatedItem(services.data?.additionalServices);
        // router.reload();
        return;
      }
      setLoading({ status: false });
      toast.error(result.message as string, { className: "loginToast" });
      return;
    } catch (error: any) {
      setLoading({ status: false });
      toast.error(error?.body?.message || error?.message);
    }
  };

  const deleteItems = async (id: string) => {
    setLoading({ status: true, id: id, delete: true });
    try {
      const result = await StudioService.deleteAdditionalService({
        id,
      });

      if (result.status) {
        setLoading({ status: false });
        toast.success("Successful!", { className: "loginToast" });
        setPopulatedItem(
          service?.additionalServices?.filter((x) => x.id !== id)
        );
        // router.reload();
        return;
      }
      setLoading({ status: false });
      toast.error(result.message as string, { className: "loginToast" });
      return;
    } catch (error: any) {
      setLoading({ status: false });
      toast.error(error?.body?.message || error?.message);
    }
  };
  const deleteServiceImage = async (id: string) => {
    setLoading({ status: false, id });
    try {
      const result = await StudioService.deleteServiceImage({
        id,
      });
      if (result.status) {
        setPopulatedImages(service?.media?.filter((x: any) => x.id !== id));
        setLoading({ status: false });
        toast.success("Successful!", { className: "loginToast" });
        // router.reload();
        return;
      }
      setLoading({ status: false });
      toast.error(result.message as string, { className: "loginToast" });
      return;
    } catch (error: any) {
      setLoading({ status: false });
      toast.error(error?.body?.message || error?.message, {
        className: "loginToast",
      });
    }
  };
  const AddServiceImage = async (url: string) => {
    if (url == "") {
      return;
    }
    try {
      const result = await StudioService.addMediaUrl({
        requestBody: { url, serviceId: service.id as string },
      });
      if (result.status) {
        const services = await StudioService.getServiceById({
          id: service.id as string,
        });
        setPopulatedImages(services.data?.media);
        setLoading({ status: false });
        toast.success("Successful!", { className: "loginToast" });
        // router.reload();
        return;
      }
      setLoading({ status: false });
      toast.error(result.message as string, { className: "loginToast" });
      return;
    } catch (error: any) {
      setLoading({ status: false });
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
    onClose();
    if (file) {
      file.progress((info: any) => {
        setImageLoading({ status: true, total: info.progress });
        if (info.state == "ready") {
          setImageLoading({ status: false, total: "" }),
            setBannerUrl(info.incompleteFileInfo.originalUrl);
        }
      });
    }
  };

  const { onOpen: opens, isOpen: open, onClose: close } = useDisclosure();
  const [func, setFunc] = useState<any>();
  const openModal = (funcs: any, imageState: any, imageSetter: any) => {
    opens();
    setFunc({ click: funcs, imageState, imageSetter });
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

  useEffect(() => {
    AddServiceImage(mediaUrl);
  }, [mediaUrl]);
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
          <Grid
            templateColumns={{ base: "repeat(1,1fr)", md: "repeat(2,1fr)" }}
            gap="1.5rem"
            mt="1.5rem"
          >
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
                    onClick={() =>
                      openModal(widgetApi.current, bannerUrl, setBannerUrl)
                    }
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
                      onClick={() =>
                        openModal(widgetApi.current, bannerUrl, setBannerUrl)
                      }
                    />
                  )}
                </>
              )}
            </Flex>
          </Box>
          <Grid
            templateColumns={{ base: "repeat(1,1fr)", md: "repeat(2,1fr)" }}
            gap="1.5rem"
          >
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
                  {populatedImages.map((x: MediaView) => (
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
                        {loading.status && loading.id == x.id ? (
                          <Spinner size="sm" />
                        ) : (
                          <FaTrash
                            color="white"
                            fontSize="1rem"
                            onClick={() => deleteServiceImage(x.id as string)}
                          />
                        )}
                      </Box>
                    </Flex>
                  ))}
                </HStack>
                <Box>
                  <HStack w="full" gap=".5rem" overflow="auto" pb=".5rem">
                    <Flex
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
                      <Widget
                        publicKey="fda3a71102659f95625f"
                        //@ts-ignore
                        id="file"
                        systemDialog
                        imagesOnly
                        ref={widgetImageApi}
                        onFileSelect={(file) => onChangeImg(file)}
                      />

                      {loading.status && loading.id == "imageLoad" ? (
                        <Spinner size="sm" />
                      ) : (
                        <Icon
                          as={AiOutlinePlus}
                          onClick={() =>
                            openModal(
                              widgetImageApi.current,
                              mediaUrl,
                              setMediaUrl
                            )
                          }
                        />
                      )}
                    </Flex>
                  </HStack>
                </Box>
              </HStack>
            </Box>
          </Grid>
        </form>
        <Box my=".5rem">
          <Flex justify="space-between" flexDir={{ base: "column", md: "row" }}>
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
            <Button
              bgColor="brand.100"
              color="white"
              onClick={() => setNewField([...newField, newField.at(-1) + 1])}
            >
              + Add Service
            </Button>
          </Flex>
          {newField.map((x: any) => (
            <form key={x.id}>
              <HStack key={x.id} align="flex-end" w="full" gap="1rem">
                <Grid
                  templateColumns={["repeat(2,1fr)"]}
                  gap="1.5rem"
                  mt="1rem"
                  w="full"
                >
                  <PrimaryInput<AdditionalServiceModel>
                    label="Addon Name"
                    placeholder="Service Name"
                    name="name"
                    error={isError.name}
                    register={registers}
                  />
                  <CurrencyField<AdditionalServiceModel>
                    placeholder="₦0.00"
                    register={registers}
                    error={isError.price}
                    name={"price"}
                    control={controls}
                    label="Service Price (NGN)"
                  />
                </Grid>
                <Button
                  aria-label="Edit Addon"
                  bgColor={"brand.100"}
                  color="white"
                  height="2.8rem"
                  px="2.5rem"
                  isLoading={isAddSubmit}
                  isDisabled={!isAddValid}
                  onClick={handleAdditionalSubmit(additionServicesFn)}
                  _hover={{
                    bgColor: "brand.100",
                  }}
                >
                  Add
                </Button>
              </HStack>
            </form>
          ))}
          {populatedItem?.length > 0 && (
            <VStack w="full" mt="1rem" gap="1rem" align="flex-start">
              {populatedItem?.map((x: AdditionalService) => (
                <HStack key={x.id} align="flex-end" w="full" gap="1rem">
                  <Grid
                    templateColumns={{
                      base: "repeat(1,1fr)",
                      lg: "repeat(1,1fr)",
                    }}
                    gap="1.5rem"
                    w="full"
                  >
                    <DisabledInput<any>
                      label="Addon Name"
                      placeholder=""
                      value={(addon.id == x.id && addon.name) || x.name}
                      onChange={(e: any) =>
                        setAddon({
                          ...addon,
                          name: e.target.value,
                          id: x.id as string,
                        })
                      }
                    />
                    <DisabledInput<any>
                      label="Addon Price (NGN)"
                      placeholder="₦0.00"
                      currency
                      value={(addon.id == x.id && addon.price) || x.price}
                      onChange={(value: any) =>
                        setAddon({ ...addon, price: value, id: x.id as string })
                      }
                    />
                  </Grid>
                  <HStack py="3.5rem" gap="1">
                    <IconButton
                      icon={<BsCheck2All />}
                      aria-label="Edit Addon"
                      bgColor={addon.id == x.id ? "brand.100" : "gray.400"}
                      color="white"
                      height="2.8rem"
                      w="2.8rem"
                      isLoading={
                        loading.status && loading.id == x.id && !loading.delete
                      }
                      isDisabled={addon.id !== x.id}
                      onClick={() =>
                        editItem({
                          id: x.id,
                          name: addon.name || x.name,
                          price: addon.price || x.price,
                          serviceId: x.serviceId,
                        })
                      }
                    />
                    <IconButton
                      icon={<AiFillDelete />}
                      aria-label="Edit Addon"
                      bgColor={addon.id == x.id ? "red" : "gray.400"}
                      color="white"
                      height="2.8rem"
                      w="2.8rem"
                      isLoading={
                        loading.status && loading.id == x.id && loading.delete
                      }
                      isDisabled={addon.id !== x.id}
                      onClick={() => deleteItems(x.id as string)}
                    />
                  </HStack>
                </HStack>
              ))}
            </VStack>
          )}
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
