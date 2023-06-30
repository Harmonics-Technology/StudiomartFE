import React from 'react';
import { GetServerSideProps } from 'next';
import { CompleteReset } from '@components/Authentication/CompleteReset';

const forgotPassword = ({ code }: { code: string }) => {
  return <CompleteReset code={code} />;
};

export default forgotPassword;

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  const { id } = ctx.query;

  return {
    props: {
      code: id,
    },
  };
};
