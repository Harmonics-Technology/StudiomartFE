import React from "react";
import SecurityQuestion from "@components/accounts/securityQuestion";
import { GetServerSideProps } from "next";
import { withPageAuth } from "src/utils/withPageAuth";

interface SecurityQuestionProps {
  userId: string;
}

const SecurityQuestionPage = ({ userId }: SecurityQuestionProps) => {
  return <SecurityQuestion userId={userId} />;
};

export default SecurityQuestionPage;

export const getServerSideProps: GetServerSideProps = withPageAuth(
  async (ctx: any) => {
    const userId = JSON.parse(ctx.req.cookies.vendor).id;
    try {
      return {
        props: {
          userId,
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
