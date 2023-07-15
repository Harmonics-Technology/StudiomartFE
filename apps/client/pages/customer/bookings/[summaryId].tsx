import BookingSummary from "@components/bookingSummary/BookingSummary";
import { withPageAuth } from "@components/utils/withPageAuth";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import React from "react";
import { ICustomerHome } from "src/models/schema";
import { StudioService, ReviewService } from "src/services";

const NewBookingSummary = dynamic(
  () => import("@components/bookingSummary/NewBookingSummary"),
  { ssr: false }
);

const summary = ({ singleService, id, addons }: ICustomerHome) => {
  return (
    <NewBookingSummary singleService={singleService} id={id} addons={addons} />
  );
};

export default summary;

export const getServerSideProps: GetServerSideProps = withPageAuth(
  async (ctx: any) => {
    const { summaryId } = ctx.query;
    let addons;
    const addonCookie = ctx.req.cookies.addons;
    if (addonCookie) {
      addons = JSON.parse(addonCookie);
    }
    try {
      const singleService = await StudioService.getServiceById({
        id: summaryId,
      });
      return {
        props: {
          singleService: singleService.data,
          id: summaryId,
          addons: addons || [],
        },
      };
    } catch (error: any) {
      return {
        props: {
          popularStudios: [],
        },
      };
    }
  }
);
