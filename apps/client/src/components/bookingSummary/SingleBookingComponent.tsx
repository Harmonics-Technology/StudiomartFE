import {
  Box,
  Flex, Grid, HStack, Image,
  List,
  ListIcon,
  ListItem, Square,
  Text, useDisclosure, VStack
} from "@chakra-ui/react";
import { BookingInfo } from "@components/utils/BookingInfo";
import { InfoBox as Infos } from "@components/utils/InfoBox";
import { SocialWrapper } from "@components/utils/SocialWrapper";
import dayjs from "dayjs";

import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  AiFillFacebook, AiFillInstagram, AiFillWechat, AiFillYoutube, AiOutlineClose, AiOutlineTwitter
} from "react-icons/ai";
import { ImRadioChecked2 } from "react-icons/im";
import {
  MdOutlineDoneAll,
  MdOutlineRateReview,
  MdPayments
} from "react-icons/md";
import { useDummyImage } from "react-simple-placeholder-image";
import { BookingService, BookingView } from "src/services";
import {
  BackToPage, BookingsBtn, getReviewSummary, HandleSelectChat, InfoBox, Naira,
  Rating, ResponseBoxLarge
} from "ui";
import { ReviewModal } from "./ReviewModal";

const SingleBookingComponent = ({ bookings }: { bookings: BookingView }) => {
  const image = useDummyImage({});
  const [loading, setLoading] = useState<any>({
    status: false,
    type: "",
    id: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  //
  const router = useRouter();
  const status = bookings.status?.toLowerCase();

  const cancelBooking = async (id: string) => {
    setLoading({ status: true, id, type: "cancel" });
    try {
      const result = await BookingService.cancelBookings({
        id,
      });
      if (result.status) {
        setLoading({ status: false });
        toast.success(`You booking has been cancelled`);
        return;
      }
      setLoading({ status: false });
      toast.error(result.message as string);
      return;
    } catch (err: any) {
      setLoading({ status: false });
      toast.error(err?.body?.message || err?.message, {
        className: "loginToast",
      });
    }
  };
  const markAsCompleted = async (id: string) => {
    setLoading({ status: true, id, type: "complete" });
    try {
      const result = await BookingService.completeBooking({
        bookingId: id,
      });
      if (result.status) {
        setLoading({ status: false });
        toast.success(`Successful`);
        router.reload();
        return;
      }
      setLoading({ status: false });
      toast.error(result.message as string);
      return;
    } catch (err: any) {
      setLoading({ status: false });
      toast.error(err?.body?.message || err?.message, {
        className: "loginToast",
      });
    }
  };

  const [reviewId, setReviewId] = useState<any>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box w={{ base: "90%", lg: "80%" }} mx="auto" my="2rem">
      <Box mb="3rem">
        <BackToPage name="Back" />
      </Box>
      <ResponseBoxLarge
        response={status}
        reference={bookings.bookingReference}
      />
      <Flex
        gap={["2rem", "2rem"]}
        align="center"
        mt="2rem"
        flexDir={{ base: "column", lg: "row" }}
      >
        <Square
          size={{ base: "20rem", lg: "25rem" }}
          overflow="hidden"
          borderRadius="10px"
          bgColor="red"
          // display={{ base: "none", lg: "block" }}
        >
          <Image
            src={bookings.service?.bannerImageURL || image}
            w="full"
            h="full"
            objectFit="cover"
            alt=""
          />
        </Square>

        <Box w="full">
          <Text fontSize="2rem" fontFamily="BR Firma" fontWeight="500">
            Booking Information
          </Text>

          <HStack
            justify="space-between"
            w="full"
            flexDir={{ base: "column", lg: "row" }}
            align="flex-start"
            gap="2rem"
          >
            <VStack spacing={["1rem", "2rem"]} align="flex-start" w="full">
              <Infos
                title="Booking reference"
                desc={bookings.bookingReference}
              />
              <HStack>
                <Text
                  fontSize={["1.2rem", "1.5rem"]}
                  noOfLines={1}
                  fontWeight="700"
                  mb="0"
                >
                  {bookings.service?.name}
                </Text>

                <Text
                  fontSize={[".7rem", "1.5rem"]}
                  noOfLines={1}
                  fontWeight="700"
                  mb="0"
                >
                  - {Naira(bookings.service?.price as number)}
                </Text>
              </HStack>
              <Box>
                {(bookings.additionalServices as any)?.length > 0 && (
                  <>
                    <Text
                      fontSize={[".7rem", "1rem"]}
                      noOfLines={1}
                      fontWeight="500"
                      mt="1rem"
                      mb="0"
                    >
                      Addons
                    </Text>

                    <List display="flex" flexWrap="wrap" gap=".5rem">
                      {bookings?.additionalServices?.map((b) => (
                        <ListItem key={b.id}>
                          <ListIcon as={ImRadioChecked2} />
                          {b.name} - {Naira(b.price as number)}
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}
              </Box>
            </VStack>
            <VStack w="full" align="flex-start">
              <Box>
                <Infos
                  title="Date and Time"
                  desc={`${dayjs(bookings.date).format("DD/MM/YYYY")} - ${dayjs(
                    dayjs().format("YYYY-MM-DD") + `T${bookings.time}Z`
                  )
                    .subtract(1, "hour")
                    .format("hh:mm A")}`}
                />
              </Box>
              <HStack>
                <Rating
                  value={
                    getReviewSummary(bookings.service?.reviewCounts).reviewStars
                  }
                />
                <Text mb="0">
                  {getReviewSummary(bookings.service?.reviewCounts).reviewTotal}{" "}
                  review
                </Text>
              </HStack>
              <Box>
                <Text
                  fontSize={[".7rem", ".9rem"]}
                  noOfLines={1}
                  mb=".5rem"
                  fontWeight="600"
                >
                  {bookings.service?.name}{" "}
                  {bookings.additionalServices?.length !== 0 && <>+ </>}
                  {bookings.additionalServices?.map((x) => x.name).join(",")} +
                  tax(
                  {Naira(bookings.tax as number)}) ={" "}
                  {Naira(bookings.totalAmount as number)}
                </Text>
              </Box>
              <Box bgColor="#f2f2f2" p="1rem" w="full">
                <Text fontWeight="600" mb=".5rem">
                  Your Info:
                </Text>
                <HStack justify="space-between">
                  <Text fontSize=".8rem" mb="0" fontWeight="500">
                    Full Name:
                  </Text>
                  <Text fontSize=".8rem" mb="0">
                    {bookings?.user?.fullName}
                  </Text>
                </HStack>
                <HStack justify="space-between">
                  <Text fontSize=".8rem" mb="0" fontWeight="500">
                    Email:
                  </Text>
                  <Text fontSize=".8rem" mb="0">
                    {bookings?.user?.email}
                  </Text>
                </HStack>
              </Box>
            </VStack>
          </HStack>
        </Box>
      </Flex>
      <HStack
        w="full"
        justify="space-between"
        m="2rem auto 5rem"
        gap={{ base: "1rem", lg: "1rem" }}
        flexDir={{ base: "column", lg: "row" }}
      >
        <BookingsBtn
          text="Cancel Booking"
          isDisabled={status !== "pending"}
          onClick={() => cancelBooking(bookings.id as string)}
          isLoading={
            loading.status &&
            loading.type == "cancel" &&
            loading.id == bookings.id
          }
          bg="red"
          icon={AiOutlineClose}
        />
        <BookingsBtn
          text="Make payment"
          isDisabled={status !== "approved"}
          onClick={() =>
            router.push(`/customer/checkout/${bookings.id as string}`)
          }
          isLoading={
            loading.status && loading.type == "pay" && loading.id == bookings.id
          }
          icon={MdPayments}
          bg="brand.100"
        />
        <HandleSelectChat
          chatUser={{
            uid: bookings?.service?.user?.id,
            displayName: bookings?.service?.user?.firstName,
            photoURL: bookings.service?.user?.profilePicture,
          }}
          url="/customer/message"
          setLoading={setIsLoading}
        >
          <BookingsBtn
            text="Chat with vendor"
            isDisabled={status !== "paid"}
            icon={AiFillWechat}
            bg="yellow.500"
            isLoading={isLoading}
          />
        </HandleSelectChat>

        <BookingsBtn
          text="Rate this service"
          isDisabled={status !== "completed"}
          onClick={() => {
            setReviewId(bookings.serviceId);
            onOpen();
          }}
          icon={MdOutlineRateReview}
          bg="gray.500"
        />
        <BookingsBtn
          text="Mark as Completed"
          isDisabled={status !== "paid"}
          onClick={() => markAsCompleted(bookings.id as string)}
          isLoading={
            loading.status &&
            loading.type == "complete" &&
            loading.id == bookings.id
          }
          icon={MdOutlineDoneAll}
          bg="green.500"
        />
      </HStack>
      <Box mt="3rem">
        <Flex
          justify={"space-between"}
          flexDir={{ base: "column", lg: "row" }}
          mb="2rem"
        >
          <Text fontSize="2rem" fontFamily="BR Firma" fontWeight="500" mb="0">
            Studio Information
          </Text>
          <HStack
            h="3rem"
            gap="1rem"
            pointerEvents={status !== "paid" ? "none" : "unset"}
          >
            <SocialWrapper
              icon={AiFillFacebook}
              iconName="Facebook"
              color="#3b5998"
              url={bookings.service?.studio?.facebook}
            />
            <SocialWrapper
              icon={AiOutlineTwitter}
              iconName="Twitter"
              color="#00acee"
              url={bookings.service?.studio?.twitter}
            />
            <SocialWrapper
              icon={AiFillInstagram}
              iconName="Instagram"
              color="#d62976"
              url={bookings.service?.studio?.instagram}
            />
            <SocialWrapper
              icon={AiFillYoutube}
              iconName="Youtube"
              color="red"
              url={bookings.service?.studio?.youTube}
            />
          </HStack>
        </Flex>
        <VStack align="flex-start" spacing="1.5rem" mb="1rem">
          <Grid
            templateColumns={["repeat(1, 1fr)", "repeat(3, 1fr)"]}
            gap="1.5rem"
            w="full"
          >
            <InfoBox
              title="Studio Name"
              desc={bookings.service?.studio?.name}
            />

            <InfoBox
              title="Studio Email"
              desc={
                status == "paid" || status == "completed"
                  ? bookings.service?.studio?.email
                  : "***************"
              }
            />
            <InfoBox
              title="Studio Phone"
              desc={
                status == "paid" || status == "completed"
                  ? bookings.service?.studio?.phone
                  : "***************"
              }
            />
          </Grid>
          <InfoBox
            title="Studio Address"
            des
            desc={
              status == "paid" || status == "completed"
                ? bookings.service?.studio?.address
                : "***************"
            }
          />
        </VStack>
      </Box>
      <BookingInfo bookings={bookings} />

      {isOpen && (
        <ReviewModal id={reviewId} isOpen={isOpen} onClose={onClose} />
      )}
    </Box>
  );
};

export default SingleBookingComponent;
