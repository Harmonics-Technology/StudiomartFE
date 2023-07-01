import {
  Box,
  Flex,
  Grid,
  HStack,
  Image,
  List,
  ListIcon,
  ListItem,
  Square,
  Text,
  Button,
  VStack,
  Icon,
  useDisclosure,
} from "@chakra-ui/react";
import { InfoBox } from "@components/utils/InfoBox";
import React, { useContext, useState } from "react";
import { useDummyImage } from "react-simple-placeholder-image";
import { IBookingsProps } from "src/models/schema";
import { ImRadioChecked2 } from "react-icons/im";
import {
  AiFillFacebook,
  AiFillHeart,
  AiFillInstagram,
  AiFillWechat,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import Link from "next/link";
import {
  BookingFilters,
  getReviewSummary,
  getUrlRoute,
  Naira,
  NotFound,
  Pagination,
  Rating,
} from "ui";
import dayjs from "dayjs";
import { ResponseBox } from "@components/utils/ResponseBox";
import toast from "react-hot-toast";
import { BookingService, ReviewModel, ReviewService } from "src/services";
import { useRouter } from "next/router";
import { AuthContext } from "@components/Context/AuthContext";
import { ChatContext } from "@components/Context/ChatContext";
import { db } from "@components/firebase/firebase";
import { info } from "console";
import {
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  doc,
} from "firebase/firestore";
import { UserContext } from "@components/Context/UserContext";
import { ReviewModal } from "./ReviewModal";

export default function BookingHistory({ bookings }: IBookingsProps) {
  console.log({ bookings });
  const image = useDummyImage({});

  const [loading, setLoading] = useState<any>({
    status: false,
    type: "",
    id: "",
  });
  const router = useRouter();
  const { device } = useContext(UserContext);

  const checkoutBooking = async (id: string) => {
    setLoading({ status: true, id, type: "pay" });
    try {
      const result = await BookingService.checkout({
        id,
        frontEndBaseUrl: `${getUrlRoute().clientUrl}/payment/validate`,
        device: device,
      });
      if (result.status) {
        setLoading({ status: false });
        toast.success(
          `You will be redirected to an external gateway to make payment`
        );
        setTimeout(() => {
          window.open(result.data as string);
        }, 3000);
        return;
      }
      setLoading({ status: false });
      toast.error(result.message as string);
      return;
    } catch (err: any) {
      setLoading({ status: false });
      toast.error(err?.body?.message || err?.message);
    }
  };
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

  const [reviewId, setReviewId] = useState<any>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { dispatch } = useContext(ChatContext);

  const { currentUser } = useContext(AuthContext);

  const handleSelect = async (chatUser: any, id: any) => {
    // console.log({ currentUser, chatUser });
    setLoading({ status: true, id, type: "chat" });
    const combinedId =
      currentUser?.uid > chatUser.uid
        ? currentUser?.uid + chatUser.uid
        : chatUser.uid + currentUser?.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      console.log({ res: res.exists() });
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), {
          messages: [],
        });
        await updateDoc(doc(db, "userChats", currentUser?.uid), {
          [combinedId + ".userInfo"]: {
            uid: chatUser.uid,
            displayName: chatUser.displayName,
            photoURL: chatUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", chatUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser?.uid,
            displayName: currentUser?.displayName,
            photoURL: currentUser?.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        setLoading({ status: false });
        router.push("/customer/message");
      } else {
        dispatch({ type: "CHANGE_USER", payload: chatUser });
        setLoading({ status: false });
        router.push("/customer/message");
      }
    } catch (error) {
      setLoading({ status: false });
      console.log({ error });
    }
  };
  return (
    <Box my="3rem">
      <Box w={{ base: "90%", lg: "90%" }} mx="auto">
        <BookingFilters />
        {bookings?.value?.length == 0 ? (
          <NotFound />
        ) : (
          <>
            <Grid
              w="full"
              gap="1.5rem"
              my="1rem"
              templateColumns={["repeat(1, 1fr)", "repeat(3,1fr)"]}
            >
              {bookings?.value?.map((x) => (
                <>
                  <HStack
                    borderRadius="8px"
                    boxShadow="md"
                    p="1.5rem"
                    spacing="1rem"
                    w="full"
                    h="full"
                    key={x.id}
                  >
                    <Box
                      width={{ base: "10rem", lg: "10rem" }}
                      height="100%"
                      overflow="hidden"
                      borderRadius="10px"
                      bgColor="red"
                      // display={{ base: "none", lg: "block" }}
                    >
                      <Image
                        src={x.service?.bannerImageURL || image}
                        alt="image"
                        w="full"
                        h="full"
                        objectFit="cover"
                      />
                    </Box>
                    <VStack align="flex-start" w="full">
                      <HStack w="full">
                        <Text fontSize=".8rem" mb="0">
                          Booking ID: {x.bookingReference}
                        </Text>
                        <ResponseBox response={x.status?.toLowerCase()} />
                      </HStack>
                      <HStack>
                        <Text
                          fontSize={[".7rem", "1.5rem"]}
                          noOfLines={1}
                          fontWeight="700"
                          mb="0"
                        >
                          {x.service?.name}
                        </Text>

                        {/* <Text
                          fontSize={[".7rem", "1.5rem"]}
                          noOfLines={1}
                          fontWeight="700"
                          mb="0"
                        >
                          - {Naira(x.service?.price as number)}
                        </Text> */}
                      </HStack>
                      <HStack>
                        {x?.additionalServices?.map((b) => (
                          <Text key={b.id} mb="0" fontSize=".8rem">
                            {b.name} - {Naira(b.price as number)}
                          </Text>
                        ))}
                      </HStack>
                      <Box>
                        <InfoBox
                          title="Date and Time"
                          desc={`${dayjs(x.date).format(
                            "DD/MM/YYYY"
                          )} - ${dayjs(
                            dayjs().format("YYYY-MM-DD") + `T${x.time}Z`
                          )
                            .subtract(1, "hour")
                            .format("hh:mm A")}`}
                        />
                      </Box>
                      <HStack justify="space-between" w="full">
                        <Rating
                          value={
                            getReviewSummary(x.service?.reviewCounts)
                              .reviewStars
                          }
                        />
                        <Button
                          bgColor="brand.100"
                          borderRadius="25px"
                          h="2rem"
                          color="white"
                          px="1rem"
                          fontSize=".8rem"
                          onClick={() =>
                            router.push(`/customer/history/${x.id}`)
                          }
                        >
                          View Details
                        </Button>
                      </HStack>
                    </VStack>
                  </HStack>
                </>
              ))}
            </Grid>
            <HStack my="3rem" w="full" justify="center">
              <Pagination data={bookings} />
            </HStack>

            <ReviewModal id={reviewId} isOpen={isOpen} onClose={onClose} />
          </>
        )}
      </Box>
    </Box>
  );
}
