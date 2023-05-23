import React from "react";
import SecurityQuestion from "@components/accounts/securityQuestion";
import { GetServerSideProps } from "next";
import { withPageAuth } from "src/utils/withPageAuth";
import { UserService } from "src/services";

interface SecurityQuestionProps {
  userId: string;
  userQuestion: any;
}

const SecurityQuestionPage = ({ userId, userQuestion }: SecurityQuestionProps) => {
  return <SecurityQuestion userId={userId} userQuestion={userQuestion} />;
};

export default SecurityQuestionPage;

export const getServerSideProps: GetServerSideProps = withPageAuth(
  async (ctx: any) => {
    const userId = JSON.parse(ctx.req.cookies.vendor).id;
    try {
      const userQuestion = await UserService.getUserSecurityQuestion({});
      return {
        props: {
          userId,
          userQuestion,
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
