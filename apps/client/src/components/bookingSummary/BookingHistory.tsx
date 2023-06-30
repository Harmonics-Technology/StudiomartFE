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
            <VStack w="full" gap="5rem" spacing={0}>
              {bookings?.value?.map((x) => (
                <Grid
                  templateColumns={["repeat(3, 1fr)", "1fr 2fr"]}
                  w="full"
                  gap="3rem"
                  key={x.id}
                  py="2rem"
                  borderY="1px solid #e5e5e5"
                  display={{ base: "flex", lg: "grid" }}
                  flexDir="column"
                >
                  <Square
                    size={{ base: "3rem", lg: "100%" }}
                    overflow="hidden"
                    borderRadius="10px"
                    bgColor="red"
                    // display={{ base: "none", lg: "block" }}
                  >
                    <Image
                      src={x.service?.bannerImageURL || image}
                      w="full"
                      h="full"
                      objectFit="cover"
                      alt=""
                    />
                  </Square>
                  <Grid
                    templateColumns={["repeat(3, 1fr)", "repeat(2, 1fr)"]}
                    w="full"
                    gap="3rem"
                    pt={{ base: "1rem", lg: "0" }}
                    display={{ base: "flex", lg: "grid" }}
                    flexDir="column-reverse"
                    mt={{ base: "-5rem", lg: "0" }}
                  >
                    <Box
                      pt={{ base: "0rem", lg: "2.5rem" }}
                      borderRight="1px solid #e5e5e5"
                      w="full"
                    >
                      <InfoBox
                        title="Booking reference"
                        desc={x.bookingReference}
                      />
                      <HStack>
                        <Text
                          fontSize={[".7rem", "1.5rem"]}
                          noOfLines={1}
                          fontWeight="700"
                          mb="0"
                        >
                          {x.service?.name}
                        </Text>

                        <Text
                          fontSize={[".7rem", "1.5rem"]}
                          noOfLines={1}
                          fontWeight="700"
                          mb="0"
                        >
                          - {Naira(x.service?.price as number)}
                        </Text>
                      </HStack>
                      <Box>
                        {(x.additionalServices as any)?.length > 0 && (
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
                              {x?.additionalServices?.map((b) => (
                                <ListItem key={b.id}>
                                  <ListIcon as={ImRadioChecked2} />
                                  {b.name} - {Naira(b.price as number)}
                                </ListItem>
                              ))}
                            </List>
                          </>
                        )}
                      </Box>

                      <Box mt="2rem">
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
                      <HStack mb="1rem">
                        <Rating
                          value={
                            getReviewSummary(x.service?.reviewCounts)
                              .reviewStars
                          }
                        />
                        <Text mb="0">
                          {
                            getReviewSummary(x.service?.reviewCounts)
                              .reviewTotal
                          }{" "}
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
                          {x.service?.name}{" "}
                          {x.additionalServices?.length !== 0 && <>+ </>}
                          {x.additionalServices?.map((x) => x.name).join(",")} +
                          tax({Naira(x.tax as number)}) ={" "}
                          {Naira(x.totalAmount as number)}
                        </Text>
                      </Box>
                      <HStack w="full">
                        <Button
                          bgColor="brand.100"
                          color="white"
                          borderRadius="0"
                          isDisabled={x.status?.toLowerCase() !== "paid"}
                          isLoading={
                            loading?.status &&
                            loading.id == x.id &&
                            loading.type == "chat"
                          }
                          onClick={() =>
                            handleSelect(
                              {
                                uid: x.service?.user?.id,
                                displayName: x?.service?.user?.firstName,
                                photoURL: x.service?.user?.profilePicture,
                              },
                              x.id
                            )
                          }
                        >
                          <Icon as={AiFillWechat} mr=".5rem" />
                          Chat with vendor
                        </Button>
                        <Button
                          bgColor="gray.500"
                          color="white"
                          borderRadius="0"
                          // isDisabled={x.status?.toLowerCase() !== "completed"}
                          onClick={() => {
                            setReviewId(x.serviceId);
                            onOpen();
                          }}
                        >
                          <Icon as={AiFillWechat} mr=".5rem" />
                          Rate Service
                        </Button>
                        <Button
                          bgColor="yellow.500"
                          color="white"
                          borderRadius="0"
                        >
                          <Icon as={AiFillHeart} />
                        </Button>
                      </HStack>
                    </Box>
                    <Box
                      pl={{ base: "0", lg: "1.5rem" }}
                      mt={{ base: "0rem", lg: "2.5rem" }}
                      w="full"
                    >
                      <ResponseBox response={x.status?.toLowerCase()} />
                      <InfoBox
                        title="Studio Name"
                        desc={x.service?.studio?.name}
                      />
                      <InfoBox
                        title="Studio Address"
                        desc={
                          x.status?.toLowerCase() == "paid"
                            ? x.service?.studio?.address
                            : "***************"
                        }
                      />
                      <InfoBox
                        title="Studio Email"
                        desc={
                          x.status?.toLowerCase() == "paid"
                            ? x.service?.studio?.email
                            : "***************"
                        }
                      />
                      <InfoBox
                        title="Studio Phone"
                        desc={
                          x.status?.toLowerCase() == "paid"
                            ? x.service?.studio?.phone
                            : "***************"
                        }
                      />

                      <HStack
                        bgColor="gray.300"
                        w="full"
                        h="3rem"
                        mb="1rem"
                        px="2rem"
                        justify="space-between"
                        pointerEvents={
                          x.status?.toLowerCase() !== "paid" ? "none" : "unset"
                        }
                      >
                        <Link passHref href={`${x.service?.studio?.facebook}`}>
                          <HStack cursor="pointer">
                            <Icon
                              as={AiFillFacebook}
                              fontSize="1.5rem"
                              color="#3b5998"
                            />
                            <Text mb="0" fontSize=".8rem">
                              Facebook
                            </Text>
                          </HStack>
                        </Link>
                        <Link passHref href={`${x.service?.studio?.twitter}`}>
                          <HStack cursor="pointer">
                            <Icon
                              as={AiOutlineTwitter}
                              fontSize="1.5rem"
                              color="#00acee"
                            />
                            <Text mb="0" fontSize=".8rem">
                              Twitter
                            </Text>
                          </HStack>
                        </Link>
                        <Link passHref href={`${x.service?.studio?.instagram}`}>
                          <HStack cursor="pointer">
                            <Icon
                              as={AiFillInstagram}
                              fontSize="1.5rem"
                              color="#d62976 "
                            />
                            <Text mb="0" fontSize=".8rem">
                              Insta
                            </Text>
                          </HStack>
                        </Link>
                        <Link passHref href={`${x.service?.studio?.youTube}`}>
                          <HStack cursor="pointer">
                            <Icon
                              as={AiFillYoutube}
                              fontSize="1.5rem"
                              color="red"
                            />
                            <Text mb="0" fontSize=".8rem">
                              Youtube
                            </Text>
                          </HStack>
                        </Link>
                      </HStack>
                      <HStack
                        w="full"
                        h="2.8rem"
                        mt="1.55rem"
                        // display={response == "pending" ? "flex" : "none"}
                      >
                        <Button
                          variant="outline"
                          width="full"
                          bgColor="red"
                          color="white"
                          borderRadius="0"
                          h="full"
                          isDisabled={x.status?.toLowerCase() !== "pending"}
                          onClick={() => cancelBooking(x.id as string)}
                          isLoading={
                            loading.status &&
                            loading.type == "cancel" &&
                            loading.id == x.id
                          }
                        >
                          Cancel Booking
                        </Button>
                        <Button
                          variant="outline"
                          w="full"
                          bgColor="#1570FA"
                          color="white"
                          borderRadius="0"
                          h="full"
                          isDisabled={x.status?.toLowerCase() !== "approved"}
                          onClick={() => checkoutBooking(x.id as string)}
                          isLoading={
                            loading.status &&
                            loading.type == "pay" &&
                            loading.id == x.id
                          }
                        >
                          Make payment
                        </Button>
                      </HStack>
                    </Box>
                  </Grid>
                </Grid>
              ))}
            </VStack>
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
