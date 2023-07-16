import {
  Box,
  Button,
  FormLabel,
  HStack,
  Square,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { UserContext } from "@components/Context/UserContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { Widget } from "@uploadcare/react-widget";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext, useRef, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BiCloudUpload } from "react-icons/bi";
import { StudioKYCModel, StudioService, StudioView } from "src/services";
import { PrimaryInput } from "ui";
import * as yup from "yup";
import AccountContainer from "./AccountContainer";

const schema = yup.object().shape({
  officeAddress: yup.string().required(),
  studioCapacity: yup.string().required(),
});

interface StudioProps {
  singleStudio: StudioView;
}

export default function KycInformation({ singleStudio }: StudioProps) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValid },
  } = useForm<StudioKYCModel>({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: {
      officeAddress: singleStudio.officeAddress,
      studioCapacity: singleStudio.studioCapacity,
      meansOfIdentification: singleStudio.meansOfIdentification,
      cacDocumentReference: singleStudio.cacDocumentReference,
      studioId: singleStudio.id,
    },
  });
  const router = useRouter();
  const { currentStudioId } = useContext(UserContext);
  //CAC upload
  const [cacDocument, setCacDocument] = useState({
    url: singleStudio?.cacDocumentReference,
    name: singleStudio?.cacDocumentReference,
  });
  const [logoLoading, setLogoLoading] = useState<any>({
    status: false,
    total: "",
  });
  const widgetLogoApi = useRef<any>(null);
  const onChangeLogoImage = (file: any) => {
    if (file) {
      file.progress((info: any) => {
        setLogoLoading({ status: true, total: info.progress });
        if (info.state == "ready") {
          setLogoLoading({ status: false, total: "" }),
            setCacDocument({
              url: info.incompleteFileInfo.originalUrl,
              name: info.incompleteFileInfo.name,
            });
        }
      });
    }
  };
  //Id url upload
  const [idUrl, setIdUrl] = useState({
    url: singleStudio?.meansOfIdentification,
    name: singleStudio?.cacDocumentReference,
  });
  const [imageLoading, setImageLoading] = useState<any>({
    status: false,
    total: "",
  });
  const widgetApi = useRef<any>(null);
  const onChangeImg = (file: any) => {
    if (file) {
      file.progress((info: any) => {
        setImageLoading({ status: true, total: info.progress });
        console.log({ info });
        if (info.state == "ready") {
          setImageLoading({ status: false, total: "" }),
            setIdUrl({
              url: info.incompleteFileInfo.originalUrl,
              name: info.incompleteFileInfo.name,
            });
        }
      });
    }
  };

  // console.log({ idUrl, cacDocument });

  const onSubmit = async (data: StudioKYCModel) => {
    data.cacDocumentReference = cacDocument.url;
    data.meansOfIdentification = idUrl.url;
    data.studioId = currentStudioId;
    try {
      const result = await StudioService.addOrUpdateKyc({ requestBody: data });
      if (result.status) {
        const studios = await StudioService.listUserStudios({
          offset: 0,
          limit: 10,
        });
        studios.status &&
          Cookies.set("vendorStudios", JSON.stringify(studios.data?.value));
        toast.success(
          "Your information has been saved successfully and will reload shortly"
        );
        window.location.href = `/dashboard`;

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

  return (
    <AccountContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="1rem">
          <PrimaryInput<StudioKYCModel>
            label="Office Address"
            type="text"
            placeholder="Enter your office address"
            name="officeAddress"
            error={errors.officeAddress}
            register={register}
            defaultValue={""}
          />
          <PrimaryInput<StudioKYCModel>
            label="Studio Capacity"
            type="text"
            placeholder="What is your studio capacity"
            name="studioCapacity"
            error={errors.studioCapacity}
            register={register}
            defaultValue={""}
          />
          <FormLabel fontWeight="500" fontSize=".8rem">
            CAC Document
          </FormLabel>
          <Box display="none">
            <Widget
              publicKey="fda3a71102659f95625f"
              systemDialog
              imagesOnly
              onFileSelect={onChangeLogoImage}
              ref={widgetLogoApi}
              // inputAcceptTypes={".jpeg,.jpg, .png"}
            />
          </Box>
          <Button
            fontWeight="400"
            fontSize="16px"
            height="3.5rem"
            color="#AFAFAF"
            bgColor="white"
            border="1px dotted #afafaf82"
            justifyContent="center"
            borderRadius="8px"
            onClick={() => widgetLogoApi.current.openDialog()}
          >
            {logoLoading.status ? (
              <Square size="3rem">
                <CircularProgressbar
                  value={logoLoading.total}
                  maxValue={1}
                  text={`${logoLoading.total * 100}%`}
                />
              </Square>
            ) : (
              <>
                <Text mb="0">
                  {singleStudio.cacDocumentReference
                    ? "File 001"
                    : cacDocument.name || "Click here to upload CAC Document"}
                </Text>
              </>
            )}
          </Button>
          <FormLabel fontWeight="500" fontSize=".8rem">
            Upload a valid means of identification
          </FormLabel>
          <Box display="none">
            <Widget
              publicKey="fda3a71102659f95625f"
              systemDialog
              imagesOnly
              onFileSelect={onChangeImg}
              ref={widgetApi}
              // inputAcceptTypes={".jpeg,.jpg, .png"}
            />
          </Box>
          <Button
            fontWeight="400"
            fontSize="16px"
            height="4rem"
            color="#AFAFAF"
            bgColor="white"
            border="1px dotted #afafaf82"
            justifyContent="center"
            borderRadius="8px"
            onClick={() => widgetApi.current.openDialog()}
          >
            {imageLoading.status ? (
              <Square size="3rem">
                <CircularProgressbar
                  value={logoLoading.total}
                  maxValue={1}
                  text={`${logoLoading.total * 100}%`}
                />
              </Square>
            ) : (
              <>
                {singleStudio.meansOfIdentification
                  ? "File 002"
                  : idUrl.name || (
                      <VStack>
                        <BiCloudUpload />
                        <Text mb="0">
                          Click here to upload your identification
                        </Text>
                      </VStack>
                    )}
              </>
            )}
          </Button>
          <HStack justifyContent="flex-end" w="full">
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
          </HStack>
        </Stack>
      </form>
    </AccountContainer>
  );
}
