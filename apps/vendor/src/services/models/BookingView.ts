/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ServiceView } from './ServiceView';
import type { UserView } from './UserView';

export type BookingView = {
    id?: string;
    userId?: string;
    user?: UserView;
    serviceId?: string;
    service?: ServiceView;
    date?: string;
    time?: string;
    amount?: number;
    tax?: number;
    totalAmount?: number;
    status?: string | null;
};

