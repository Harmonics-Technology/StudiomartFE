import BankDetails from "@components/accounts/bankDetails";
import axios from "axios";
import { GetServerSideProps } from "next";
import React from "react";
import { Banks, StudioService, UtilityService } from "src/services";
import { withPageAuth } from "src/utils/withPageAuth";

interface bankProps {
  banks: Banks[];
  bankAccounts: any;
  userId: string;
}
const bankDetailsPage = ({ banks, bankAccounts, userId }: bankProps) => {
  return (
    <BankDetails banks={banks} bankAccounts={bankAccounts} userId={userId} />
  );
};

export default bankDetailsPage;

export const getServerSideProps: GetServerSideProps = withPageAuth(
  async (ctx: any) => {
    const currentStudioId = ctx.req.cookies.currentStudioId;
    const userId = JSON.parse(ctx.req.cookies.vendor).id;
    try {
      const banks = await UtilityService.getApiUtilityBanks({});
      // const banks = await axios.get(
      //   "https://maylancer.org/api/nuban/banklist.php"
      // );
      const bankAccounts = await StudioService.getBankAccounts({
        id: currentStudioId,
      });

      return {
        props: {
          banks: banks.data,
          bankAccounts: bankAccounts.data,
          userId,
        },
      };
    } catch (error: any) {
      return {
        props: {
          banks: [],
          bankAccounts: [],
        },
      };
    }
  }
);
