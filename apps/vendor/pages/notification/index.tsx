import React from "react";
import { Box } from "@chakra-ui/react";
import Notification from "@components/Notification/Notification";
import {
  NotificationService,
  NotificationViewPagedCollection,
} from "src/services";
import { FilterPagingOptions } from "ui";
import { GetServerSideProps } from "next";
import { withPageAuth } from "src/utils/withPageAuth";

interface notificationProps {
  notifications: NotificationViewPagedCollection;
}
function index({ notifications }: notificationProps) {
  return <Notification notifications={notifications} />;
}

export default index;

export const getServerSideProps: GetServerSideProps = withPageAuth(
  async (ctx: any) => {
    const pagingOptions = FilterPagingOptions(ctx);
    const userId = JSON.parse(ctx.req.cookies.vendor).id;
    try {
      const notifications = await NotificationService.getUserNotification({
        userId,
        offset: pagingOptions.offset,
        limit: pagingOptions.limit,
      });

      return {
        props: {
          notifications: notifications.data,
        },
      };
    } catch (error: any) {
      return {
        props: {
          notifications: [],
        },
      };
    }
  }
);
