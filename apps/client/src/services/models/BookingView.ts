/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ServiceView } from './ServiceView';

export type BookingView = {
    id?: string;
    serviceId?: string;
    service?: ServiceView;
    date?: string;
    time?: string;
    amount?: number;
    tax?: number;
    totalAmount?: number;
    status?: string | null;
};
