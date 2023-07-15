import {
  Box, Button, Divider, Flex, Grid, HStack, Image, Square,
  Text, useDisclosure, VStack
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { BookingService, BookingView, MediaView } from "src/services";
import BookingText from "src/utils/BookingText";
import RejectBooking from "src/utils/RejectBooking";
import { Responses } from "src/utils/Responses";
import { ModalWrapper, Naira, ResponseBox } from "ui";

interface DetailsProps {
  data: BookingView;
  closed: any;
}
function BookingDetails({ data, closed }: DetailsProps) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [loading, setLoading] = useState<any>({ status: false });

  const response = data.status?.toLowerCase();
  const id = data.id;
  const router = useRouter();
  async function acceptUserBooking(id: string) {
    setLoading({ status: true, type: "accept" });
    try {
      const result = await BookingService.acceptBooking({
        id,
      });
      if (result.status) {
        setLoading({ status: false });
        closed();
        toast.success(
          `You have successfully accept booking, ${data.user?.firstName} would be notify to make payment`
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
    setLoading({ status: true, type: "complete" });
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
          <ResponseBox response={data.status?.toLowerCase()} />
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
              p={{ base: ".8rem", lg: "2rem 1.5rem" }}
            >
              <VStack gap="1rem" align="left">
                <BookingText
                  top="Client Full Name"
                  bottom={data?.user?.fullName}
                />
                <BookingText
                  top="Client ID/Email"
                  bottom={response != "paid" ? "*********" : data?.user?.email}
                />
                <BookingText
                  top="Client Phone Number"
                  bottom={
                    response != "paid" ? "*********" : data?.user?.phoneNumber
                  }
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
              p={{ base: ".8rem", lg: "2rem 1.5rem" }}
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
                {(data.additionalServices as any)?.length > 0 && (
                  <>
                    <Text fontWeight="500" mb="0">
                      Additional Services
                    </Text>
                    <HStack>
                      {data?.additionalServices?.map((b) => (
                        <Text key={b.id} mb="0" fontSize="1rem" noOfLines={1}>
                          {b.name}
                        </Text>
                      ))}
                    </HStack>
                  </>
                )}
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
              p={{ base: ".8rem", lg: "2rem 1.5rem" }}
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
                    bottom={Naira(
                      (data.amount as number) + (data.tax as number)
                    )}
                    color="#1570FA"
                  />
                </Grid>
              </VStack>
            </Box>
          </Box>
          <HStack
            w="full"
            h="fit-content"
            spacing={0}
            gap={{ base: "1rem", lg: "2rem" }}
            flexDir={{ base: "column", lg: "row" }}
          >
            <Button
              variant="outline"
              width="full"
              border="2px solid"
              h="3rem"
              onClick={onOpen}
              isDisabled={response !== "pending"}
            >
              Reject Booking
            </Button>
            <Button
              variant="outline"
              w="full"
              bgColor="#1570FA"
              color="white"
              h="3rem"
              onClick={() => acceptUserBooking(data.id as string)}
              isLoading={loading.status && loading.type == "accept"}
              isDisabled={response !== "pending"}
            >
              Accept Booking
            </Button>
          </HStack>
          <Button
            variant="outline"
            w="full"
            bgColor="green.500"
            color="white"
            h="3rem"
            mb="1rem !important"
            onClick={() => markAsCompleted(data.id as string)}
            isLoading={loading.status && loading.type == "complete"}
            isDisabled={response != "paid"}
          >
            Mark as completed
          </Button>
        </VStack>
      </Box>
      {isOpen && (
        <ModalWrapper isOpen={isOpen} onClose={onClose}>
          <RejectBooking data={data} onClose={onClose} />
        </ModalWrapper>
      )}
    </Box>
  );
}

export default BookingDetails;
