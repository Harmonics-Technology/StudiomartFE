import { SingleStudioPage } from "@components/studio/SingleStudioPage";
import { GetServerSideProps } from "next";
import React from "react";
import { StudioService, DashboardService, StudioView } from "src/services";
import { withPageAuth } from "src/utils/withPageAuth";

interface StudioProps {
  singleStudio: StudioView;
}

const singleStudio = ({ singleStudio }: StudioProps) => {
  return <SingleStudioPage singleStudio={singleStudio} />;
};

export default singleStudio;

export const getServerSideProps: GetServerSideProps = withPageAuth(
  async (ctx: any) => {
    const currentStudioId = ctx.req.cookies.currentStudioId;
    try {
      const singleStudio = await StudioService.getStudioById({
        id: currentStudioId,
      });
      // console.log({ singleStudio });

      return {
        props: {
          singleStudio: singleStudio.data,
        },
      };
    } catch (error: any) {
      return {
        props: {
          singleStudio: [],
        },
      };
    }
  }
);
