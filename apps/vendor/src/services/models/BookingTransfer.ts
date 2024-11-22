/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Booking } from './Booking';

export type BookingTransfer = {
    id?: string;
    dateCreated?: string;
    dateModified?: string;
    from?: string;
    to?: number;
    date?: string;
    bokkings?: Array<Booking> | null;
};
