import { Box, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { BookingView } from "src/services";

export const BookingInfo = ({ bookings }: { bookings: BookingView }) => {
  const response = bookings?.status?.toLowerCase();
  return (
    <Box bgColor="#f2f2f2" p="2rem">
      <Text fontWeight="600">PS: Note</Text>
      <Text>
        {response == "pending"
          ? "Hey there!, The service you requested has been submitted to the studio manager and is awaiting approval, once accepted, you'll be prompted to make payment and then all studio informations will be visible to you. Please be patient"
          : response == "cancelled"
          ? "Hey there!, You have cancelled this service requested by you and no information about the studio can be visible to you. Kindly head back to our platform to book the service again"
          : response == "rejected"
          ? `Hey there!, The service you requested has been rejected by the studio manager and the reason for rejection is "${bookings?.rejectionReason}"`
          : response == "approved"
          ? "Hey there!, Studio Details such as Address, email, phone number, social media links e.t.c will only be visble to you when your payment has been made by you and confirmed. Kindly go ahead to Make Payment now"
          : response == "paid"
          ? "Hey there!, Your payment has been confirmed, kindly sit back and relax while we cook things up to satisfy your creative need. Necessary informations has been sent to your registered email address. Please contact support for futher questions. Thank your for choosing studiomart"
          : response == "completed"
          ? `Hey champ!, You're the best! We hope you enjoyed the service rendered to you at ${
              bookings.service?.studio?.name
            } in ${bookings?.service?.studio?.address} on ${dayjs(
              bookings.date
            ).format(
              "dddd DD MMMM, YYYY"
            )}, Kindly click the review button below to leave a review to help others find this service reliable or however you feel. We appreciate your loyality  `
          : "Hey there!, Sorry your booking status information is undefined and therefore we can not show you anything now, kindly check back later or contact support if persists"}
      </Text>
    </Box>
  );
};
