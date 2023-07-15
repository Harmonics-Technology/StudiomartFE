import { withPageAuth } from "@components/utils/withPageAuth";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import React from "react";
import { BookingService } from "src/services";

const PaymentSummary = dynamic(
  () => import("@components/bookingSummary/PaymentSummary"),
  { ssr: false }
) as React.FC<any>;

const SingleBooking = ({ bookings }: any) => {
  return <PaymentSummary bookings={bookings} />;
};

export default SingleBooking;

export const getServerSideProps: GetServerSideProps = withPageAuth(
  async (ctx: any) => {
    const { id } = ctx.query;
    try {
      const bookings = await BookingService.getBooking({
        id,
      });

      return {
        props: {
          bookings: bookings.data,
        },
      };
    } catch (error: any) {
      return {
        props: {
          bookings: [],
        },
      };
    }
  }
);
