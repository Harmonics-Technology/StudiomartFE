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
} from '@chakra-ui/react';
import { ServiceSlider } from '@components/Dashboard/ServicesSlider';
import React, { useContext, useRef, useState } from 'react';
import {
  ServiceModel,
  ServiceTypeView,
  ServiceTypeViewListStandardResponse,
  StudioService,
  StudioView,
} from 'src/services';
import {
  CurrencyField,
  DisabledInput,
  ModalWrapper,
  PrimaryInput,
  PrimarySelect,
  PrimaryTextarea,
} from 'ui';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import YupPassword from 'yup-password';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { FaTrash } from 'react-icons/fa';
import { Widget } from '@uploadcare/react-widget';
import { AiFillDelete, AiFillEdit, AiOutlinePlus } from 'react-icons/ai';
import { UserContext } from '@components/Context/UserContext';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FiUpload } from 'react-icons/fi';
import { HiInformationCircle } from 'react-icons/hi';
YupPassword(yup);

const validation = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().minWords(20),
  price: yup.string().required(),
  serviceTypeId: yup.string().required(),
});

type Props = {
  isOpen: any;
  onClose: any;
  serviceTypes?: ServiceTypeViewListStandardResponse;
};

const AddingOptionsModal = ({ isOpen, onClose, serviceTypes }: Props) => {
  const { currentStudioId } = useContext(UserContext);
  // console.log({ currentStudioId });
  const router = useRouter();
  const [imageBox, setImageBox] = useState<any[]>([0, 1, 2, 3]);
  const [uploadedMedia, setUploadedMedia] = useState<any[]>([]);
  const { isOpen: open, onOpen: opens, onClose: close } = useDisclosure();
  const { isOpen: opened, onOpen: opensed, onClose: closed } = useDisclosure();

  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ServiceModel>({
    resolver: yupResolver(validation),
    mode: 'all',
  });

  const onChangeImg = (info: any, id: number) => {
    console.log({ info, id });
    let newMedia = {
      url: info.originalUrl,
      id: id,
    };

    setUploadedMedia([...uploadedMedia, newMedia]);
    // console.log({ uploadedMedia });
  };

  const [addon, setAddon] = useState({ id: '', name: '', price: '' });
  const [populatedItem, setPopulatedItem] = useState<any[]>([]);
  const [editing, setEditing] = useState(false);

  const additionServicesFn = () => {
    setEditing(false);
    if (addon.name == '' || addon.price == '') {
      toast.error('One or more field is empty', { className: 'loginToast' });
      return;
    }
    const newSubmittedItem = {
      id: populatedItem.length + 1,
      name: addon.name,
      price: addon.price,
    };
    setAddon({
      id: '',
      name: '',
      price: '',
    });
    setPopulatedItem([...populatedItem, newSubmittedItem]);
  };
  const editItem = (id: string) => {
    setEditing(true);
    setPopulatedItem(populatedItem.filter((x) => x.id !== id));
    const editingItem = populatedItem.find((x) => x.id === id);
    setAddon({
      id: editingItem.id,
      name: editingItem.name,
      price: editingItem.price,
    });
  };

  const deleteItems = (id: string) => {
    const newItem = populatedItem.filter((x) => x.id !== id);
    setPopulatedItem(newItem);
  };

  const [bannerUrl, setBannerUrl] = useState();
  const [imageLoading, setImageLoading] = useState<any>({
    status: false,
    total: '',
  });
  const widgetApi = useRef<any>(null);
  const uploadBannerUrl = (file: any) => {
    if (file) {
      file.progress((info: any) => {
        setImageLoading({ status: true, total: info.progress });
      });
      file.done((info: any) => {
        setImageLoading({ status: false, total: '' }),
          setBannerUrl(info.originalUrl);
      });
    }
  };

  const closeModal = () => {
    onClose();
    router.reload();
  };

  const onSubmit = async (data: ServiceModel) => {
    data.mediaUrls = uploadedMedia.map((x: any) => x.url);
    data.studioId = currentStudioId;
    data.bannerImageURL = bannerUrl;
    data.additionalServices = populatedItem.map((x: any) => {
      return {
        name: x.name,
        price: x.price,
      };
    });
    console.log({ data });
    // try {
    //   const result = await StudioService.createService({ requestBody: data });
    //   console.log({ result });
    //   if (result.status) {
    //     toast.success("Successful!");
    //     router.reload();
    //     return;
    //   }
    //   toast.error(result.message as string);
    //   return;
    // } catch (error: any) {
    //   toast.error(error?.body?.message || error?.message);
    // }
  };
  return (
    <>
      <ModalWrapper
        title="Add a service"
        isOpen={isOpen}
        onClose={onClose}
        w="50%"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <PrimaryInput<ServiceModel>
            label="Service Name"
            placeholder=""
            name="name"
            error={errors.name}
            register={register}
          />
          <Grid
            templateColumns={{ base: 'repeat(1,1fr)', md: 'repeat(2,1fr)' }}
            gap="1.5rem"
            mt="1.5rem"
          >
            <CurrencyField<ServiceModel>
              placeholder="₦0.00"
              defaultValue=""
              register={register}
              error={errors.price}
              name={'price'}
              control={control}
              label="Service Price (NGN)"
            />
            <PrimarySelect<ServiceModel>
              label="Service Type"
              placeholder=""
              name="serviceTypeId"
              error={errors.serviceTypeId}
              register={register}
              options={serviceTypes?.data?.map((x: ServiceTypeView) => (
                <option value={x.id} key={x.id}>
                  {x.name}
                </option>
              ))}
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
                inputAcceptTypes={'.jpeg,.jpg, .png'}
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
                      bottom: '0',
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
          <Grid
            templateColumns={{ base: 'repeat(1,1fr)', md: 'repeat(2,1fr)' }}
            gap="1.5rem"
          >
            <Box minW="0">
              <PrimaryTextarea<ServiceModel>
                label="Service Details"
                placeholder=""
                name="description"
                error={errors.description}
                register={register}
                defaultValue={''}
              />
            </Box>
            <Box minW="0">
              <FormLabel fontSize=".8rem">Upload Images</FormLabel>
              <HStack
                w="full"
                gap=".7rem"
                overflow="auto"
                pb=".5rem"
                // flexWrap="wrap"
                spacing="0"
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
                          cursor="pointer"
                          transform="translate(-50%, -50%)"
                          _groupHover={{
                            opacity: 1,
                            bgColor: 'rgba(0,0,0,.5)',
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
          </Grid>
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
            {populatedItem.length > 0 && (
              <Box w="full" mt="1rem">
                <TableContainer>
                  <Table>
                    <Thead>
                      <Tr bgColor={'gray.100'}>
                        <Th minW="300px">Addon Name</Th>
                        <Th>Price</Th>
                        <Th></Th>
                        <Th></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {populatedItem?.map((x, i) => (
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
                              onClick={() => editItem(x.id)}
                            />
                          </Td>
                          <Td>
                            <Icon
                              as={AiFillDelete}
                              onClick={() => deleteItems(x.id)}
                            />
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
            )}
            <Grid
              templateColumns={{ base: 'repeat(1,1fr)', md: 'repeat(2,1fr)' }}
              gap="1.5rem"
              mt=".5rem"
            >
              <DisabledInput<ServiceModel>
                label="Addon Name"
                placeholder=""
                value={addon.name}
                onChange={(e: any) =>
                  setAddon({ ...addon, name: e.target.value })
                }
              />
              <DisabledInput<ServiceModel>
                label="Addon Price (NGN)"
                placeholder="₦0.00"
                currency
                value={addon.price}
                onChange={(value: any) => setAddon({ ...addon, price: value })}
              />
            </Grid>
            <Button
              fontSize=".8rem"
              bgColor="gray.400"
              color="white"
              type="button"
              mt="1rem"
              onClick={additionServicesFn}
              _hover={{
                bgColor: 'brand.100',
              }}
            >
              {editing ? '- Confirm edit' : ' + Add a service'}
            </Button>
          </Box>
          <HStack
            mt="1.5rem"
            gap={{ base: '.5rem', md: '2rem' }}
            display={{ base: 'flex', md: '' }}
            flexDir={{ base: 'column', md: 'row' }}
          >
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
