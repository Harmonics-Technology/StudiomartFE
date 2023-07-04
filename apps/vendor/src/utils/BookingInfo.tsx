import { Box, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import React from "react";
import { BookingView } from "src/services";
import { Naira } from "ui";

export const BookingInfo = ({ bookings }: { bookings: BookingView }) => {
  const response = bookings?.status?.toLowerCase();
  const user = bookings?.user?.fullName;
  return (
    <Box bgColor="#f2f2f2" p="2rem">
      <Text fontWeight="600">PS: Note</Text>
      <Text>
        {response == "pending"
          ? `Hey there!, ${user} has requested to use your service on ${dayjs(
              bookings.date
            )}. Kindly approve this booking to confirm your availability`
          : response == "cancelled"
          ? `Hey there!, Due to some unforseen circumstances, this booking has been cancelled by ${user}. We will reach out to find out why`
          : response == "rejected"
          ? `Hey there!, You have rejected this service because of the reason ${bookings?.rejectionReason}`
          : response == "approved"
          ? `Hey there!, a notification has been sent to ${user} and will be prompted to make payment immediately, look out for an update via mail`
          : response == "paid"
          ? `Hey there!, ${user} has made payment and ${Naira(
              (bookings?.amount as number) + (bookings?.tax as number)
            )} has been added to your balance on hold in your wallet and will be disbursed to your withdrawable balance upon completing the service`
          : response == "completed"
          ? `Hey champ!, You're the best! Thank you for rendering such an amazing service to ${user}, if there was any issue during the course of the service, kindly contact support  `
          : "Hey there!, Sorry your booking status information is undefined and therefore we can not show you anything now, kindly check back later or contact support if persists"}
      </Text>
    </Box>
  );
};
