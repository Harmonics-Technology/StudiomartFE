import React from "react";
import { GetServerSideProps } from "next";
import { withPageAuth } from "@components/utils/withPageAuth";
import { OpenAPI, RecentlyViewedService, StudioService } from "src/services";
import { ISingleCategory } from "src/models/schema";
import { FilterPagingOptions } from "ui";
import { toast } from "react-hot-toast";
import dynamic from "next/dynamic";

const Category = dynamic(() => import("@components/Category/Category"), {
  ssr: false,
});

const singleStudioView = ({
  singlecategory,
  categoryId,
  recentlyViewed,
  category,
}: ISingleCategory) => {
  return (
    <div>
      <Category
        singlecategory={singlecategory}
        categoryId={categoryId}
        recentlyViewed={recentlyViewed}
        category={category}
      />
    </div>
  );
};

export default singleStudioView;

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  OpenAPI.BASE = process.env.NEXT_PUBLIC_API_BASEURL as string;
  OpenAPI.TOKEN = ctx.req.cookies.customerToken;
  const pagingOptions = FilterPagingOptions(ctx);
  const { categoryId } = ctx.query;
  try {
    const singlecategory = await StudioService.listServices({
      offset: pagingOptions.offset,
      limit: pagingOptions.limit || 9,
      serviceTypeId: categoryId,
    });
    let recentlyViewed;
    if (OpenAPI.TOKEN !== undefined) {
      recentlyViewed = await RecentlyViewedService.getRecentlyViewedItems({
        type: "service",
      });
    }
    const category = await StudioService.getServiceTypes({});
    return {
      props: {
        singlecategory: singlecategory.data,
        recentlyViewed: recentlyViewed?.data || [],
        categoryId,
        category: category.data,
      },
    };
  } catch (error: any) {
    // if (error.status == 401) {
    //   toast.error("error?.statusText");
    //   return;
    // }
    return {
      props: {
        singlecategory: [],
      },
    };
  }
};
