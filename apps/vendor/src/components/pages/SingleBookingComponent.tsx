import {
  Box,
  Flex,
  HStack,
  Square,
  Text,
  VStack,
  Image,
  List,
  ListIcon,
  ListItem,
  useDisclosure,
  Grid,
} from "@chakra-ui/react";
import data from "@components/Dashboard/data";
import { BookingInfo } from "../../utils/BookingInfo";
import { InfoBox as Infos } from "../../utils/InfoBox";
import dayjs from "dayjs";

import { useRouter } from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  AiFillFacebook,
  AiOutlineTwitter,
  AiFillInstagram,
  AiFillYoutube,
  AiFillHeart,
  AiFillWechat,
  AiOutlineClose,
} from "react-icons/ai";
import { ImRadioChecked2 } from "react-icons/im";
import { MdOutlineDoneAll, MdPayments } from "react-icons/md";
import { useDummyImage } from "react-simple-placeholder-image";
import { BookingService, BookingView } from "src/services";
import RejectBooking from "src/utils/RejectBooking";
import {
  getReviewSummary,
  ResponseBoxLarge,
  Naira,
  Rating,
  InfoBox,
  BackToPage,
  HandleSelectChat,
  ModalWrapper,
  BookingsBtn,
} from "ui";

const SingleBookingComponent = ({ bookings }: { bookings: BookingView }) => {
  const image = useDummyImage({});
  const [loading, setLoading] = useState<any>({
    status: false,
    type: "",
    id: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  // console.log({ bookings });
  const router = useRouter();
  const status = bookings.status?.toLowerCase();

  async function acceptUserBooking(id: string) {
    setLoading({ status: true, type: "accept" });
    try {
      const result = await BookingService.acceptBooking({
        id,
      });
      if (result.status) {
        setLoading({ status: false });
        toast.success(
          `You have successfully accept booking, ${bookings.user?.firstName} would be notify to make payment`
        );
        router.reload();
        return;
      }
      setLoading({ status: false });
      toast.error(result.message as string);
      return;
    } catch (error: any) {
      setLoading({ status: false });
      toast.error(error?.body?.message || error?.message, {
        className: "loginToast",
      });
    }
  }
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
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      w={{ base: "90%", lg: "95%" }}
      mx="auto"
      my="2rem"
      p="2rem"
      bgColor="white"
      borderRadius="10px"
    >
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
          size={{ base: "100%", lg: "25rem" }}
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
                  Studio Info:
                </Text>
                <HStack justify="space-between">
                  <Text fontSize=".8rem" mb="0" fontWeight="500">
                    Studio Name:
                  </Text>
                  <Text fontSize=".8rem" mb="0" noOfLines={1}>
                    {bookings?.service?.studio?.name}
                  </Text>
                </HStack>
                <HStack justify="space-between">
                  <Text fontSize=".8rem" mb="0" fontWeight="500">
                    Office Address:
                  </Text>
                  <Text fontSize=".8rem" mb="0" noOfLines={1}>
                    {bookings?.service?.studio?.officeAddress}
                  </Text>
                </HStack>
              </Box>
            </VStack>
          </HStack>
        </Box>
      </Flex>
      <Box mt="3rem">
        <Flex
          justify={"space-between"}
          flexDir={{ base: "column", lg: "row" }}
          mb="2rem"
        >
          <Text fontSize="2rem" fontFamily="BR Firma" fontWeight="500" mb="0">
            Client Information
          </Text>
        </Flex>
        <VStack align="flex-start" spacing="1.5rem" mb="1rem">
          <Grid
            templateColumns={["repeat(1, 1fr)", "repeat(3, 1fr)"]}
            gap="1.5rem"
            w="full"
          >
            <InfoBox title="Client Name" desc={bookings.user?.fullName} />

            <InfoBox
              title="Client Email"
              desc={
                status == "paid" || status == "completed"
                  ? bookings.user?.email
                  : "***************"
              }
            />
            <InfoBox
              title="Client Phone"
              desc={
                status == "paid" || status == "completed"
                  ? bookings.user?.phoneNumber
                  : "***************"
              }
            />
          </Grid>
        </VStack>
      </Box>
      <BookingInfo bookings={bookings} />
      <HStack
        w="full"
        justify="space-between"
        m="2rem auto 5rem"
        gap={{ base: "1rem", lg: "1rem" }}
        flexDir={{ base: "column", lg: "row" }}
      >
        <BookingsBtn
          text="Reject Booking"
          isDisabled={status !== "pending"}
          onClick={onOpen}
          bg="red"
          icon={AiOutlineClose}
        />
        <BookingsBtn
          text="Approve Booking"
          isDisabled={status !== "pending"}
          onClick={() => acceptUserBooking(bookings.id as string)}
          isLoading={loading.status && loading.type == "accept"}
          icon={MdPayments}
          bg="brand.100"
        />
        <HandleSelectChat
          chatUser={{
            uid: bookings?.user?.id,
            displayName: bookings?.user?.firstName,
            photoURL: bookings.user?.profilePicture,
          }}
          url="/message"
          setLoading={setIsLoading}
        >
          <BookingsBtn
            text="Chat with Client"
            isDisabled={status !== "paid"}
            icon={AiFillWechat}
            bg="yellow.500"
            isLoading={isLoading}
          />
        </HandleSelectChat>

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
      {isOpen && (
        <ModalWrapper isOpen={isOpen} onClose={onClose}>
          <RejectBooking data={bookings} onClose={onClose} />
        </ModalWrapper>
      )}
    </Box>
  );
};

export default SingleBookingComponent;
