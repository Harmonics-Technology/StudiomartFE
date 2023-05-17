import BookingsHome from "@components/pages/BookingsHome";
import { GetServerSideProps } from "next";
import React from "react";
import { BookingService, BookingViewStandardResponse } from "src/services";
import { withPageAuth } from "src/utils/withPageAuth";
import { FilterPagingOptions } from "ui";

interface BookingProps {
  allBookings: BookingViewStandardResponse;
}

function index({ allBookings }: BookingProps) {
  return <BookingsHome allBookings={allBookings} />;
}

export default index;

export const getServerSideProps: GetServerSideProps = withPageAuth(
  async (ctx: any) => {
    const currentStudioId = ctx.req.cookies.currentStudioId;
    const pagingOptions = FilterPagingOptions(ctx);
    try {
      const allBookings = await BookingService.getBookingsByServiceId({
        offset: pagingOptions.offset,
        limit: pagingOptions.limit,
        studioId: currentStudioId,
      });
      // console.log({ allBookings });

      return {
        props: {
          allBookings: allBookings.data,
        },
      };
    } catch (error: any) {
      return {
        props: {
          allBookings: [],
        },
      };
    }
  }
);
