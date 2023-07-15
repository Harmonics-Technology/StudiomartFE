import { SingleServicePage } from "@components/studio/SingleServicePage";

import { GetServerSideProps } from "next";

import React from "react";
import {
  ReviewService,
  ReviewViewPagedCollection,
  ServiceTypeViewListStandardResponse,
  ServiceView,
  StudioService,
} from "src/services";
import { withPageAuth } from "src/utils/withPageAuth";
import { FilterPagingOptions } from "ui";

interface StudioProps {
  service: ServiceView;
  reviews: ReviewViewPagedCollection;
  serviceTypes: ServiceTypeViewListStandardResponse;
}

function index({ service, reviews, serviceTypes }: StudioProps) {
  //
  return (
    <SingleServicePage
      service={service}
      reviews={reviews}
      serviceTypes={serviceTypes}
    />
  );
}

export default index;

export const getServerSideProps: GetServerSideProps = withPageAuth(
  async (ctx: any) => {
    const { id } = ctx.query;
    const pagingOptions = FilterPagingOptions(ctx);
    const currentStudioId = ctx.req.cookies.currentStudioId;
    try {
      const services = await StudioService.getServiceById({
        id,
      });
      const reviews = await ReviewService.getReviews({
        offset: pagingOptions.offset,
        limit: pagingOptions.limit || 10,
        serviceId: services.data?.id,
        studioId: currentStudioId,
      });
      const serviceTypes = await StudioService.getServiceTypes({});

      //

      return {
        props: {
          service: services.data,
          reviews: reviews.data,
          serviceTypes,
        },
      };
    } catch (error: any) {
      return {
        props: {
          data: [],
          review: [],
        },
      };
    }
  }
);
