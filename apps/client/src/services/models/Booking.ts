/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AdditionalService } from './AdditionalService';
import type { Service } from './Service';
import type { Status } from './Status';
import type { TimeOnly } from './TimeOnly';
import type { User } from './User';

export type Booking = {
    id?: string;
    dateCreated?: string;
    dateModified?: string;
    userId?: string;
    user?: User;
    serviceId?: string;
    bookingReference?: string | null;
    service?: Service;
    date?: string;
    time?: TimeOnly;
    amount?: number;
    tax?: number;
    totalAmount?: number;
    rejectionReason?: string | null;
    statusId?: number;
    status?: Status;
    additionalServices?: Array<AdditionalService> | null;
};

