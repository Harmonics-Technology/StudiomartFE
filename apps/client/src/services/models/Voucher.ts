/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Booking } from './Booking';

export type Voucher = {
    id?: string;
    dateCreated?: string;
    dateModified?: string;
    code?: string | null;
    startDate?: string;
    endDate?: string;
    discountPercentage?: number;
    maxDiscount?: number;
    minOrderValue?: number;
    maxDiscountTimes?: number;
    usageCount?: number;
    paused?: boolean;
    bookings?: Array<Booking> | null;
};
