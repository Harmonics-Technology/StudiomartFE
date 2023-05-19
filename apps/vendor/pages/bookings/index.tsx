import BookingsHome from "@components/pages/BookingsHome";
import { GetServerSideProps } from "next";
import React from "react";
import { BookingService, BookingView } from "src/services";
import { withPageAuth } from "src/utils/withPageAuth";
import { FilterPagingOptions } from "ui";

interface BookingProps {
  allBookings: BookingView[];
}

function index({ allBookings }: BookingProps) {
  return <BookingsHome allBookings={allBookings} />;
}

export default index;

export const getServerSideProps: GetServerSideProps = withPageAuth(
  async (ctx: any) => {
    const currentStudioId = ctx.req.cookies.currentStudioId;
    const pagingOptions = FilterPagingOptions(ctx);
    // console.log({ currentStudioId });
    try {
      const allBookings = await BookingService.getBookingsByServiceId({
        offset: pagingOptions.offset,
        limit: pagingOptions.limit,
        requestBody: {
          studioId: currentStudioId,
          search: pagingOptions.search,
          status: pagingOptions.filters,
          filterBy: pagingOptions.order,
          startDate: pagingOptions.from,
          endDate: pagingOptions.to,
        },
      });
      // console.log({ allBookings });

      return {
        props: {
          allBookings: allBookings.data?.value,
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
