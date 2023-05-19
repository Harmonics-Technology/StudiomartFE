import {
  Box,
  Flex,
  HStack,
  Square,
  Text,
  VStack,
  Image,
  Grid,
  Divider,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { BsExclamationCircleFill } from "react-icons/bs";
import { BookingService, BookingView, MediaView } from "src/services";
import BookingText from "src/utils/BookingText";
import RejectBooking from "src/utils/RejectBooking";
import { Responses } from "src/utils/Responses";
import { ModalWrapper, Naira } from "ui";

interface DetailsProps {
  data: BookingView;
  closed: any;
}
function BookingDetails({ data, closed }: DetailsProps) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const response = data.status?.toLowerCase();
  const id = data.id;
  const router = useRouter();
  async function acceptUserBooking(id: string) {
    setLoading(true);
    try {
      const result = await BookingService.acceptBooking({
        id,
      });
      if (result.status) {
        setLoading(false);
        closed();
        toast.success(
          `You have successfully accept booking, ${data.user?.firstName} would be notify to make payment`
        );
        router.reload();
        return;
      }
      setLoading(false);
      toast.error(result.message as string);
      return;
    } catch (error: any) {
      setLoading(false);
      toast.error(error?.body?.message || error?.message, {
        className: "loginToast",
      });
    }
  }

  return (
    <Box
      w="full"
      borderRadius="8px"
      bgColor="white"
      overflow="hidden"
      mb="2rem"
    >
      <Responses response={response} />
      <Box w="85%" mx="auto">
        <Flex justify="space-between" align="center" my="2rem">
          <Text fontSize="1.4rem" mb="0">
            Booking Details
          </Text>
          <Box
            padding=".2rem 1rem"
            width="fit-content"
            h="fit-content"
            borderRadius="8px"
            cursor="pointer"
            bgColor={
              response == "pending"
                ? "#FDF3CA"
                : response == "approved"
                ? "#D5E2F9"
                : response == "in-progress"
                ? "#FDF3CA"
                : response == "cancelled" || response == "rejected"
                ? "#FDC1C1"
                : "white"
            }
            fontSize="10px"
          >
            {response == "pending"
              ? "Pending Confirmation"
              : response == "approved"
              ? "Awaiting payment"
              : response == "in-progress"
              ? "In progress"
              : response == "rejected"
              ? "Rejected"
              : "Cancelled"}
          </Box>
        </Flex>
        <VStack gap="2rem">
          <Box w="full">
            <Text fontWeight="500" fontSize="16px" mb=".8rem">
              Client Details
            </Text>
            <Box
              borderRadius="12px"
              border="1px solid"
              borderColor="gray.400"
              p="2rem 1.5rem"
            >
              <VStack gap="1rem" align="left">
                <BookingText top="Client ID/Email" bottom={data?.user?.email} />
                <BookingText
                  top="Client Phone Number"
                  bottom={data?.user?.phoneNumber}
                />
              </VStack>
            </Box>
          </Box>
          <Box w="full">
            <Text fontWeight="500" fontSize="16px" mb=".8rem">
              Service Details
            </Text>
            <Box
              borderRadius="12px"
              border="1px solid"
              borderColor="gray.400"
              p="2rem"
            >
              <VStack gap="1rem" align="left">
                <BookingText top="Service Name" bottom={data.service?.name} />
                <Box>
                  <Text fontWeight="500" mb=".3rem">
                    Service Image
                  </Text>
                  <HStack flexWrap="wrap">
                    {data?.service?.media?.map((x: MediaView) => (
                      <Square
                        size="4.5rem"
                        borderRadius="8px"
                        bgColor="gray"
                        overflow="hidden"
                        key={x.id}
                      >
                        <Image
                          src={x.url as string}
                          width="full"
                          h="full"
                          objectFit="cover"
                          alt=""
                        />
                      </Square>
                    ))}
                  </HStack>
                </Box>
                <BookingText
                  top="Service Description"
                  bottom={data?.service?.description}
                />
              </VStack>
            </Box>
          </Box>
          <Box w="full">
            <Text fontWeight="500" fontSize="16px" mb=".8rem">
              Payment Details
            </Text>
            <Box
              borderRadius="12px"
              border="1px solid"
              borderColor="gray.400"
              p="2rem"
            >
              <VStack gap="1rem" align="left">
                <Grid templateColumns="60% auto">
                  <BookingText
                    top="Service Cost"
                    bottom={Naira(data?.amount as number)}
                  />
                  <BookingText
                    top="Transaction Fee"
                    bottom={Naira(data.tax as number)}
                  />
                </Grid>
                <Divider />
                <Grid templateColumns="60% auto">
                  <BookingText
                    top="Sub-Total"
                    bottom={`${Naira(data?.amount as number)} + ${Naira(
                      data?.tax as number
                    )} (Transaction Fee)`}
                  />
                  <BookingText
                    top="Total Cost"
                    bottom={Naira(data.totalAmount as number)}
                    color="#1570FA"
                  />
                </Grid>
              </VStack>
            </Box>
          </Box>
          <HStack
            w="full"
            h="3rem"
            gap="2rem"
            mb="1rem !important"
            display={response == "pending" ? "flex" : "none"}
          >
            <Button
              variant="outline"
              width="full"
              border="2px solid"
              h="full"
              onClick={onOpen}
            >
              Reject Booking
            </Button>
            <Button
              variant="outline"
              w="full"
              bgColor="#1570FA"
              color="white"
              h="full"
              onClick={() => acceptUserBooking(data.id as string)}
              isLoading={loading}
            >
              Accept Booking
            </Button>
          </HStack>
        </VStack>
      </Box>
      <ModalWrapper isOpen={isOpen} onClose={onClose}>
        <RejectBooking data={data} onClose={onClose} />
      </ModalWrapper>
    </Box>
  );
}

export default BookingDetails;
