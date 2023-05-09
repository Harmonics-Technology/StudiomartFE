/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BookingView } from './BookingView';
import type { TopServiceView } from './TopServiceView';

export type VendorDashboardView = {
    totalOrders?: number;
    activeOrders?: number;
    inProgressOrders?: number;
    cancelledOrders?: number;
    topServices?: Array<TopServiceView> | null;
    recentBookings?: Array<BookingView> | null;
};
