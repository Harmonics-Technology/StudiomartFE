import { withPageAuth } from "@components/utils/withPageAuth";
import { GetServerSideProps } from "next";
import React from "react";
import { BookingService } from "src/services";
import { FilterPagingOptions } from "ui";
import dynamic from "next/dynamic";
import { IBookingsProps } from "src/models/schema";

const BookingHistory = dynamic(
  () => import("@components/bookingSummary/BookingHistory"),
  { ssr: false }
) as React.FC<any>;

const history = ({ bookings }: IBookingsProps) => {
  return <BookingHistory bookings={bookings} />;
};

export default history;

export const getServerSideProps: GetServerSideProps = withPageAuth(
  async (ctx: any) => {
    const pagingOptions = FilterPagingOptions(ctx);
    try {
      const bookings = await BookingService.getBookingsByUser({
        offset: pagingOptions.offset,
        limit: pagingOptions.limit || 9,
        search: pagingOptions.search,
        status: pagingOptions.filters as number,
        filterBy: pagingOptions.order,
        startDate: pagingOptions.from,
        endDate: pagingOptions.to,
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
