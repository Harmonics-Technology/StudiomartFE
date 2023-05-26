import Empty from '@components/Category/Empty';
import React from 'react';
import { GetServerSideProps } from 'next';
import { withPageAuth } from '@components/utils/withPageAuth';
import { StudioService } from 'src/services';

import { IStudios } from 'src/models/schema';

const empty = ({ singlecategory }: IStudios) => {
  return (
    <div>
      <Empty singlecategory={singlecategory} />
    </div>
  );
};

export default empty;

export const getServerSideProps: GetServerSideProps = withPageAuth(
  async (ctx: any) => {
    const { categoryId } = ctx.query;
    try {
      const singlecategory = await StudioService.listServices({
        offset: 0,
        limit: 6,
      });

      return {
        props: {
          singlecategory: singlecategory.data,
        },
      };
    } catch (error: any) {
      return {
        props: {
          singlecategory: [],
        },
      };
    }
  }
);
