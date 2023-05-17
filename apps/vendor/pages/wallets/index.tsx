import React from 'react';
import MainWallet from '@components/wallet/MainWallet';
import { GetServerSideProps } from 'next';
import { WalletView, WalletViewStandardResponse } from 'src/services';
import { withPageAuth } from 'src/utils/withPageAuth';

interface WalletViewProps {
  walletdMetrics: WalletViewStandardResponse;
}
const index = () => {
  return (
    <div>
      <MainWallet />
    </div>
  );
};

export default index;
