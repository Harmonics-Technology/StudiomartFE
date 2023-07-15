import {
  Box,
  Button,
  Circle,
  Flex,
  Icon,
  Text,
  useDisclosure,
  Image,
  Grid,
  VStack,
  HStack,
  Heading,
  Square,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { UserContext } from "@components/Context/UserContext";
import { DeleteStudioModal } from "@components/Modals/DeleteStudioModal";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { IoChevronBackCircle } from "react-icons/io5";
import {
  AdditionalServiceView,
  MediaView,
  ReviewView,
  ReviewViewPagedCollection,
  ServiceTypeViewListStandardResponse,
  ServiceView,
} from "src/services";
import { InfoBox, Naira } from "ui";
import { Rating, Star } from "@smastrom/react-rating";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import moment from "moment";
import EditServiceModal from "@components/Modals/EditServiceModal";
import NoSSR from "react-no-ssr";
import { DummyImage } from "react-simple-placeholder-image";

interface StudioProps {
  service: ServiceView;
  reviews: ReviewViewPagedCollection;
  serviceTypes: ServiceTypeViewListStandardResponse;
}
const myStyles = {
  itemShapes: Star,
  activeFillColor: "#ffb700",
  inactiveStrokeColor: "#ffb700",
  itemStrokeWidth: 2,
  activeStrokeColor: "transparent",
};
export const SingleServicePage = ({
  service,
  reviews,
  serviceTypes,
}: StudioProps) => {
  // const { userStudios, user, setCurrentStudioId, currentStudioId } =
  //   useContext(UserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: open, onOpen: opens, onClose: closed } = useDisclosure();
  const router = useRouter();

  return (
    <Box>
      <Box bgColor="white">
        <Flex
          justify="space-between"
          align={{ base: "start", md: "space-between" }}
          w="100%"
          mx="auto"
          py="1.5rem"
          px={{ base: "1rem", md: "2rem" }}
          flexDir={{ base: "column", md: "row" }}
        >
          <Box fontFamily="BR Firma">
            <Text fontSize="1.5rem" fontWeight="600" mb=".2rem">
              {service?.name}
            </Text>
          </Box>
          <HStack gap=".5rem">
            <Button
              variant="outline"
              color="red"
              borderColor="red"
              minW="8rem"
              onClick={onOpen}
            >
              Delete
            </Button>
            <Button
              bgColor="brand.100"
              color="white"
              minW="8rem"
              onClick={opens}
            >
              Edit
            </Button>
          </HStack>
        </Flex>
      </Box>
      <Box>
        <Button
          bgColor="transparent"
          onClick={() => router.back()}
          // m="1rem 3rem"
          m={{ base: "1rem .4rem", md: "1rem 1.4rem", lg: "1rem 3rem" }}
        >
          <Icon as={IoChevronBackCircle} mr=".3rem" />
          <Text mb="0">Back</Text>
        </Button>
        <Box
          mx="auto"
          w="90%"
          // my=".5rem"
          // p="3rem"
          borderRadius="30px"
          // bgColor="white"
          // boxShadow="sm"
        >
          <Box mb="1.5rem">
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
              pos="relative"
            >
              <NoSSR>
                {service?.bannerImageURL ? (
                  <Image
                    src={service?.bannerImageURL as string}
                    alt="Banner Image"
                    w="full"
                    h="full"
                    objectFit="cover"
                  />
                ) : (
                  <DummyImage />
                )}
              </NoSSR>
            </Flex>
          </Box>

          <Grid
            gap="3rem"
            templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]}
            w="100%"
            m="4rem auto 1rem"
          >
            <Box>
              <VStack gap="1rem" align="flex-start">
                {/* <InfoBox title={"Service Name"} desc={service?.name} /> */}
                <InfoBox title={" Description"} desc={service?.description} />
                <InfoBox
                  title={"Service Price"}
                  desc={Naira(service?.price as number)}
                />
                <Box>
                  <Text fontWeight="600">Image Gallery</Text>
                  <HStack flexWrap="wrap" w="full" spacing={0} gap="1rem">
                    {service?.media?.map((x: MediaView) => (
                      <Square
                        key={x.id}
                        size="6rem"
                        borderRadius="4px"
                        overflow="hidden"
                        bgColor="gray.200"
                        border="1px solid"
                        borderColor="gray.300"
                      >
                        <Image
                          src={x.url as string}
                          alt="propery-image"
                          w="100%"
                          height="100%"
                          objectFit="cover"
                        />
                      </Square>
                    ))}
                  </HStack>
                </Box>
                {(service?.additionalServices as AdditionalServiceView[])
                  ?.length > 0 && (
                  <Box w="full" mt="1rem">
                    <Text fontWeight="600" mb="0">
                      Additional Services
                    </Text>
                    <TableContainer>
                      <Table>
                        <Tbody>
                          {service?.additionalServices?.map(
                            (x: AdditionalServiceView, i: number) => (
                              <Tr key={x.id}>
                                <Td pl="0">
                                  <HStack>
                                    <Text mr="1rem" mb="0">
                                      {++i}
                                    </Text>
                                    <Text mb="0">{x.name}</Text>
                                  </HStack>
                                </Td>
                                <Td p=".8rem">{Naira(x.price as number)}</Td>
                              </Tr>
                            )
                          )}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </Box>
                )}
              </VStack>
            </Box>
            <Box>
              <Text fontWeight="600">Reviews</Text>
              <VStack w="full" gap="1rem">
                {reviews.value?.map((review: ReviewView, i: number) => (
                  <Box
                    border=" 1px solid #E8E8E8"
                    borderRadius="4px"
                    p="1rem"
                    key={i}
                    w="full"
                  >
                    <HStack justify="space-between">
                      <Text mb="0" fontWeight="500">
                        {review.user?.firstName}
                      </Text>
                      <Rating
                        style={{ maxWidth: 100 }}
                        value={review.reviewCount as number}
                        readOnly
                        itemStyles={myStyles}
                      />
                    </HStack>
                    <Text my=".3rem">{review.reviewNote}</Text>
                    <HStack justify="flex-end">
                      <Text mb="0" fontSize="12px">
                        {moment(review.dateCreated).format("MMM DD, YYYY")}
                      </Text>
                    </HStack>
                  </Box>
                ))}
              </VStack>
            </Box>
          </Grid>
        </Box>
      </Box>
      <DeleteStudioModal
        isOpen={isOpen}
        onClose={onClose}
        id={service.id as string}
        isService
      />
      <EditServiceModal
        isOpen={open}
        onClose={closed}
        serviceTypes={serviceTypes}
        service={service}
      />
    </Box>
  );
};
