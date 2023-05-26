import React from 'react';
import { GetServerSideProps } from 'next';
import { withPageAuth } from '@components/utils/withPageAuth';
import { StudioService } from 'src/services';
import Category from '@components/Category/Category';
import { ISingleCategory } from 'src/models/schema';

const singleStudioView = ({ singlecategory, categoryId }: ISingleCategory) => {
  return (
    <div>
      <Category singlecategory={singlecategory} categoryId={categoryId} />
    </div>
  );
};

export default singleStudioView;

export const getServerSideProps: GetServerSideProps = withPageAuth(
  async (ctx: any) => {
    const { categoryId } = ctx.query;
    try {
      const singlecategory = await StudioService.listServices({
        offset: 0,
        limit: 9,
        serviceTypeId: categoryId,
      });

      return {
        props: {
          singlecategory: singlecategory.data,
          categoryId,
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
