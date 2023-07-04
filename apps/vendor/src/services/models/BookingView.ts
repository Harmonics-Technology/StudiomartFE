/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AdditionalServiceView } from './AdditionalServiceView';
import type { ServiceView } from './ServiceView';
import type { TimeOnly } from './TimeOnly';
import type { UserView } from './UserView';
import type { Voucher } from './Voucher';

export type BookingView = {
    id?: string;
    userId?: string;
    user?: UserView;
    serviceId?: string;
    service?: ServiceView;
    bookingReference?: string | null;
    date?: string;
    time?: TimeOnly;
    amount?: number;
    tax?: number;
    totalAmount?: number;
    status?: string | null;
    voucher?: Voucher;
    rejectionReason?: string | null;
    additionalServices?: Array<AdditionalServiceView> | null;
};
