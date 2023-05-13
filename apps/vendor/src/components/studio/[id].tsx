import React from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { Box } from '@chakra-ui/react';
import { DataAccess } from 'src/utils/DataAccess';
import { withPageAuth } from 'src/utils/withPageAuth';
import { StudioService } from 'src/services';

interface StudioProps {
  date: string;
  data: string;
}

const index = ({ data, date }: StudioProps) => {
  return (
    <Box mt="30px" py="1rem">
      {/* <SingleStudio data={data} date={date} /> */}
    </Box>
  );
};

export default index;

export const getServerSideProps: GetServerSideProps = withPageAuth(async (ctx : any) => {
  const { id } = ctx.query;

  try {
    // const data = (await StudioService.

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    return {
      props: {
        data: [],
      },
    };
  }
};
