import KycInformation from "@components/accounts/kycInformation";
import { GetServerSideProps } from "next";
import React from "react";
import { StudioService, StudioView } from "src/services";
import { withPageAuth } from "src/utils/withPageAuth";

interface StudioProps {
  singleStudio: StudioView;
}

const kycInformationPage = ({ singleStudio }: StudioProps) => {
  return <KycInformation singleStudio={singleStudio} />;
};

export default kycInformationPage;

export const getServerSideProps: GetServerSideProps = withPageAuth(
  async (ctx: any) => {
    const currentStudioId = ctx.req.cookies.currentStudioId;
    try {
      const singleStudio = await StudioService.getStudioById({
        id: currentStudioId,
      });
        console.log({ singleStudio });

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