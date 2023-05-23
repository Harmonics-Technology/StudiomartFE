import {
  Box,
  Flex,
  Image,
  Icon,
  FormLabel,
  Square,
  Circle,
  Heading,
  VStack,
  Grid,
  HStack,
  Button,
} from "@chakra-ui/react";
import { Widget } from "@uploadcare/react-widget";
import React, { useRef, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FiUpload } from "react-icons/fi";
import TopPage from "src/utils/TopPage";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { StudioModel, StudioService } from "src/services";
import { PrimaryInput, PrimarySelect, PrimaryTextarea } from "ui";
//@ts-ignore
import NaijaStates from "naija-state-local-government";
import {
  AiFillFacebook,
  AiFillLinkedin,
  AiFillTwitterCircle,
  AiFillYoutube,
} from "react-icons/ai";
import Cookies from "js-cookie";

const schema = yup.object().shape({
  name: yup.string().required(),
  address: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
  website: yup.string().required(),
  country: yup.string().required(),
  state: yup.string().required(),
  city: yup.string().required(),
  zipCode: yup.string().required(),
  description: yup.string().required(),
});

const AddStudio = () => {
  //React hook form
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<StudioModel>({
    resolver: yupResolver(schema),
    mode: "all",
  });
  const allStates = NaijaStates.states();
  const selectedLga = NaijaStates.lgas(watch("state") || "lagos");
  console.log({ selectedLga });
  const router = useRouter();
  //Logo upload
  const [logoUrl, setLogoUrl] = useState();
  const [logoLoading, setLogoLoading] = useState<any>({
    status: false,
    total: "",
  });
  const widgetLogoApi = useRef<any>(null);
  const onChangeLogoImage = (file: any) => {
    if (file) {
      file.progress((info: any) => {
        setLogoLoading({ status: true, total: info.progress });
      });
      file.done((info: any) => {
        setLogoLoading({ status: false, total: "" }),
          setLogoUrl(info.originalUrl);
      });
    }
  };
  //Banner url upload
  const [bannerUrl, setBannerUrl] = useState();
  const [imageLoading, setImageLoading] = useState<any>({
    status: false,
    total: "",
  });
  const widgetApi = useRef<any>(null);
  const onChangeImg = (file: any) => {
    if (file) {
      file.progress((info: any) => {
        setImageLoading({ status: true, total: info.progress });
      });
      file.done((info: any) => {
        setImageLoading({ status: false, total: "" }),
          setBannerUrl(info.originalUrl);
      });
    }
  };

  //Studio creation function
  const onSubmit = async (data: StudioModel) => {
    data.logo = logoUrl;
    data.coverPhoto = bannerUrl;
    try {
      const result = await StudioService.createStudio({ requestBody: data });
      if (result.status) {
        const studios = await StudioService.listUserStudios({
          offset: 0,
          limit: 10,
        });
        studios.status &&
          Cookies.set("vendorStudios", JSON.stringify(studios.data?.value));
        toast.success("Studio successfully created, will reload shortly");
        window.location.href = `/dashboard?studio=${result.data?.id}`;
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
  return (
    <Box>
      <TopPage
        page={`Add a new studio`}
        details={"Fill in the information to get started"}
        right={false}
      />

      <Box
        mx="auto"
        w="95%"
        my="2rem"
        p="3rem"
        borderRadius="30px"
        bgColor="white"
        boxShadow="sm"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <Box display="none">
              <Widget
                publicKey="fda3a71102659f95625f"
                systemDialog
                imagesOnly
                onFileSelect={onChangeLogoImage}
                ref={widgetLogoApi}
                inputAcceptTypes={".jpeg,.jpg, .png"}
              />
            </Box>

            <Circle
              role="group"
              pos="relative"
              size="10rem"
              overflow="hidden"
              border="1px solid gray"
              mx="auto"
            >
              {logoUrl ? (
                <>
                  <Image
                    src={logoUrl}
                    alt="Banner Image"
                    w="full"
                    h="full"
                    objectFit="cover"
                  />
                  <Box
                    pos="absolute"
                    left="50%"
                    top="50%"
                    transform="translate(-50%,-50%)"
                    w="full"
                    bgColor="brand.100"
                    color="white"
                    p=".5rem 1rem"
                    cursor="pointer"
                    transition=".5s all ease"
                    opacity="0"
                    onClick={() => widgetApi.current.openDialog()}
                    _groupHover={{
                      opacity: "1",
                    }}
                  >
                    Change Photo
                  </Box>
                </>
              ) : (
                <>
                  {logoLoading.status ? (
                    <Square size="3rem">
                      <CircularProgressbar
                        value={logoLoading.total}
                        maxValue={1}
                        text={`${logoLoading.total * 100}%`}
                      />
                    </Square>
                  ) : (
                    <Icon
                      as={FiUpload}
                      fontSize="2rem"
                      cursor="pointer"
                      onClick={() => widgetLogoApi.current.openDialog()}
                    />
                  )}
                </>
              )}
            </Circle>
            <FormLabel fontSize=".9rem" textAlign="center" mt=".5rem">
              Upload Studio Logo
            </FormLabel>
          </Box>
          <Heading fontSize="1.5rem" my="1.5rem">
            Studio Information
          </Heading>
          <VStack gap="1.5rem" w="full">
            <Grid gap="1.5rem" templateColumns={["repeat(2, 1fr)"]} w="full">
              <PrimaryInput<StudioModel>
                label="Studio Name"
                type="text"
                placeholder="How should we address your studio?"
                name="name"
                error={errors.name}
                register={register}
              />
              <PrimaryInput<StudioModel>
                label="Studio Contact Email"
                type="email"
                placeholder="Contact email of your studio?"
                name="email"
                error={errors.email}
                register={register}
              />
              <PrimaryInput<StudioModel>
                label="Studio Contact Phone Number"
                type="text"
                placeholder="Contact phone number of your studio?"
                name="phone"
                error={errors.phone}
                register={register}
              />
              <PrimaryInput<StudioModel>
                label="Studio Website"
                type="text"
                placeholder="What is your studio website?"
                name="website"
                error={errors.website}
                register={register}
              />
            </Grid>
            <Grid gap="1.5rem" templateColumns={["repeat(2, 1fr)"]} w="full">
              <PrimarySelect<StudioModel>
                label="Studio Country"
                name="country"
                error={errors.country}
                register={register}
                options={
                  <>
                    <option selected disabled>
                      Where is your studio located?
                    </option>
                    <option value="Nigeria">Nigeria</option>
                  </>
                }
              />
              <PrimarySelect<StudioModel>
                label="Studio State"
                name="state"
                error={errors.state}
                register={register}
                options={allStates.map((x: any, i: number) => (
                  <option value={x} key={i}>
                    {x}
                  </option>
                ))}
              />
            </Grid>
            <Grid gap="1.5rem" templateColumns={["repeat(3, 1fr)"]} w="full">
              <PrimarySelect<StudioModel>
                label="Studio City"
                name="city"
                error={errors.city}
                register={register}
                options={selectedLga.lgas.map((x: any, i: number) => (
                  <option value={x} key={i}>
                    {x}
                  </option>
                ))}
              />
              <PrimaryInput<StudioModel>
                label="Zip code"
                type="text"
                placeholder="Zip code of your studio address?"
                name="zipCode"
                error={errors.zipCode}
                register={register}
              />
              <PrimaryInput<StudioModel>
                label="Studio Address"
                type="text"
                placeholder="Full address of your studio?"
                name="address"
                error={errors.address}
                register={register}
              />
            </Grid>
          </VStack>

          <Box mt="1.5rem">
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
            <FormLabel fontSize=".9rem">Upload Studio Cover Image</FormLabel>
            <Flex
              justify="center"
              align="center"
              h="15rem"
              w="full"
              borderRadius="10px"
              overflow="hidden"
              bgColor="gray.300"
              border="1px solid"
              borderColor="gray.400"
            >
              {bannerUrl ? (
                <Box
                  role="group"
                  pos="relative"
                  w="full"
                  h="full"
                  overflow="hidden"
                >
                  <Image
                    src={bannerUrl}
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
          <Heading fontSize="1.5rem" my="1.5rem">
            Social Media Information
          </Heading>
          <VStack gap="1.5rem" w="full">
            <Grid gap="1.5rem" templateColumns={["repeat(4, 1fr)"]} w="full">
              <PrimaryInput<StudioModel>
                label="Facebook url"
                type="text"
                placeholder="https://facebook.com/yourprofile"
                name="facebook"
                error={errors.facebook}
                register={register}
                left={true}
                value={AiFillFacebook}
              />
              <PrimaryInput<StudioModel>
                label="Twitter url"
                type="text"
                placeholder="https://twitter.com/yourprofile"
                name="twitter"
                error={errors.twitter}
                register={register}
                left={true}
                value={AiFillTwitterCircle}
              />
              <PrimaryInput<StudioModel>
                label="LinkedIn url"
                type="text"
                placeholder="https://linkedin.com/yourprofile"
                name="linkedIn"
                error={errors.linkedIn}
                register={register}
                left={true}
                value={AiFillLinkedin}
              />
              <PrimaryInput<StudioModel>
                label="Youtube url"
                type="text"
                placeholder="https://youtube.com/yourprofile"
                name="youTube"
                error={errors.youTube}
                register={register}
                left={true}
                value={AiFillYoutube}
              />
            </Grid>
            <Grid gap="1.5rem" templateColumns={["repeat(1, 1fr)"]} w="full">
              <PrimaryTextarea<StudioModel>
                label="Studio Description"
                name="description"
                error={errors.description}
                register={register}
                defaultValue={""}
                placeholder="Give a brief description about your studio"
              />
            </Grid>
          </VStack>

          <HStack mt="1.5rem" gap="2rem">
            <Button bgColor="gray.400" h="3rem" w="full" color="white">
              Go back
            </Button>
            <Button
              bgColor="brand.100"
              h="3rem"
              w="full"
              color="white"
              type="submit"
              isDisabled={!isValid}
              isLoading={isSubmitting}
              _hover={{
                bgColor: "gray.600",
              }}
            >
              Submit
            </Button>
          </HStack>
        </form>
      </Box>
    </Box>
  );
};

export default AddStudio;
