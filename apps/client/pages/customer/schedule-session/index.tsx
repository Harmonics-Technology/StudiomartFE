import { Box } from '@chakra-ui/react';
import ScheduleDateTime from '@components/customerStudioScheduling/ScheduleDateTime';
import React from 'react';
import { GetServerSideProps } from 'next';
import { withPageAuth } from '@components/utils/withPageAuth';
import { BookingService, LookupModel } from 'src/services';

const index = ({}: LookupModel) => {
  return (
    <>
      <ScheduleDateTime />
    </>
  );
};

export default index;

// export const getServerSideProps: GetServerSideProps = withPageAuth(
//   async (ctx: any) => {
//     // const { userId } = ctx.query;
//     try {
//       const bookingService = await BookingService.dateTimeLookup({});

//       return {
//         props: {
//           bookingService: bookingService.data,
//         },
//       };
//     } catch (error: any) {
//       return {
//         props: {
//           bookingService: [],
//         },
//       };
//     }
//   }
// );
