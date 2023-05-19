import React from "react";
import MainWallet from "@components/wallet/MainWallet";
import { GetServerSideProps } from "next";
import {
  BankAccount,
  Banks,
  StudioService,
  TransactionViewPagedCollection,
  UserService,
  UtilityService,
  WalletView,
  WalletViewStandardResponse,
} from "src/services";
import { withPageAuth } from "src/utils/withPageAuth";
import { FilterPagingOptions } from "ui";
import axios from "axios";

interface WalletViewProps {
  banks: Banks[];
  bankAccounts: BankAccount[];
  userId: string;
  userQuestion: any;
  studioTransactions: TransactionViewPagedCollection;
  studioWallet: WalletView;
}
const index = ({
  banks,
  bankAccounts,
  userId,
  userQuestion,
  studioTransactions,
  studioWallet,
}: WalletViewProps) => {
  return (
    <MainWallet
      banks={banks}
      bankAccounts={bankAccounts}
      userId={userId}
      userQuestion={userQuestion}
      studioTransactions={studioTransactions}
      studioWallet={studioWallet}
    />
  );
};

export default index;

export const getServerSideProps: GetServerSideProps = withPageAuth(
  async (ctx: any) => {
    const currentStudioId = ctx.req.cookies.currentStudioId;
    const userId = JSON.parse(ctx.req.cookies.vendor).id;
    const pagingOption = FilterPagingOptions(ctx);
    try {
      const banks = await UtilityService.getApiUtilityBanks({});
      // const banks = await axios.get(
      //   "https://maylancer.org/api/nuban/banklist.php"
      // );
      const bankAccounts = await StudioService.getBankAccounts({
        id: currentStudioId,
      });
      const userQuestion = await UserService.getUserSecurityQuestion({});
      const studioTransactions = await StudioService.listTransactions({
        id: currentStudioId,
        limit: pagingOption.limit,
        offset: pagingOption.offset,
      });
      const studioWallet = await StudioService.getWallet({
        id: currentStudioId,
      });

      console.log({
        studioWallet,
        bankAccounts,
        banks,
        userQuestion,
        studioTransactions,
      });

      return {
        props: {
          banks: banks.data,
          bankAccounts: bankAccounts.data,
          userId,
          userQuestion,
          studioTransactions: studioTransactions.data,
          studioWallet: studioWallet.data,
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
