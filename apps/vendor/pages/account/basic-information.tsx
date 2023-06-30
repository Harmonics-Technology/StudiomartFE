import BasicInformation from "@components/accounts/BasicInformation";
import { GetServerSideProps } from "next";
import React from "react";
import { UserService, UserView } from "src/services";
import { withPageAuth } from "src/utils/withPageAuth";

const basicInformationPage = ({ user }: { user: UserView }) => {
  return <BasicInformation user={user} />;
};

export default basicInformationPage;

export const getServerSideProps: GetServerSideProps = withPageAuth(
  async (ctx: any) => {
    const id = JSON.parse(ctx.req.cookies.vendor).id;
    try {
      const user = await UserService.getUserById({
        userId: id,
      });

      return {
        props: {
          //@ts-ignore
          user: user?.result?.data,
        },
      };
    } catch (error: any) {
      return {
        props: {
          data: [],
          dashboardMetrics: [],
        },
      };
    }
  }
);
