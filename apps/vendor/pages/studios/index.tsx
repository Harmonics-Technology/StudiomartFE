import { Box } from '@chakra-ui/react';
import { MainStudio } from '@components/studio/MainStudio';

import { GetServerSideProps } from 'next';

import React from 'react';
import { StudioService } from 'src/services';
import { withPageAuth } from 'src/utils/withPageAuth';

interface StudioProps {
  studios: any;
}

function index({ studios }: StudioProps) {
  console.log({ studios });
  return (
    <Box>
      <MainStudio studios={studios} />
    </Box>
  );
}

export default index;

export const getServerSideProps: GetServerSideProps = withPageAuth(async () => {
  try {
    const studios = await StudioService.listUserStudios({
      offset: 0,
      limit: 10,
    });

    return {
      props: {
        studios,
      },
    };
  } catch (error: any) {
    return {
      props: {
        data: [],
      },
    };
  }
});
