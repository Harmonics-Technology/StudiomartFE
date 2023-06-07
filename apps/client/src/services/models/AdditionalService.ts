/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Booking } from './Booking';
import type { Service } from './Service';

export type AdditionalService = {
    id?: string;
    dateCreated?: string;
    dateModified?: string;
    name?: string | null;
    price?: number;
    serviceId?: string;
    service?: Service;
    bookingId?: string | null;
    booking?: Booking;
};

