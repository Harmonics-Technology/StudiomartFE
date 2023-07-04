import React from "react";
import { GetServerSideProps } from "next";
import { withPageAuth } from "@components/utils/withPageAuth";
import { StudioService } from "src/services";

import { IStudios } from "src/models/schema";
import { FilterPagingOptions } from "ui";
import axios from "axios";
import dynamic from "next/dynamic";
const SavedStudiosComponent = dynamic(
  () => import("@components/Home/SavedStudiosComponent"),
  {
    ssr: false,
  }
);

const savedStudiosComponent = ({ savedStudios }: IStudios) => {
  return <SavedStudiosComponent savedStudios={savedStudios} />;
};

export default savedStudiosComponent;

export const getServerSideProps: GetServerSideProps = withPageAuth(
  async (ctx: any) => {
    const pagingOptions = FilterPagingOptions(ctx);
    try {
      const savedStudios = await StudioService.listSavedServices({
        offset: pagingOptions.offset,
        limit: pagingOptions.limit || 9,
        search: pagingOptions.search,
      });

      return {
        props: {
          savedStudios: savedStudios.data,
        },
      };
    } catch (error: any) {
      return {
        props: {
          singlecategory: [],
        },
      };
    }
  }
);
