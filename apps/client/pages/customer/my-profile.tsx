import CustomerProfile from "@components/customerProfile/CustomerProfile";
import { withPageAuth } from "@components/utils/withPageAuth";
import { GetServerSideProps } from "next";
import React from "react";
import { IProfileProps } from "src/models/schema";
import { UserService } from "src/services";

const profile = ({ user }: IProfileProps) => {
  return <CustomerProfile user={user} />;
};

export default profile;

export const getServerSideProps: GetServerSideProps = withPageAuth(
  async (ctx: any) => {
    const id = JSON.parse(ctx.req.cookies.customer).id;
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
