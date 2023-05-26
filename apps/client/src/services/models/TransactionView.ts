/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BookingView } from './BookingView';
import type { StudioView } from './StudioView';
import type { UserView } from './UserView';

export type TransactionView = {
    userId?: string;
    user?: UserView;
    reference?: string | null;
    paymentLogId?: number | null;
    status?: string | null;
    amount?: string | null;
    description?: string | null;
    title?: string | null;
    flutterwaveId?: number;
    channel?: string | null;
    provider?: string | null;
    bookingId?: string | null;
    booking?: BookingView;
    studioId?: string | null;
    studio?: StudioView;
};

