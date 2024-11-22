/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Booking } from './Booking';

export type GiftRecipient = {
    id?: string;
    dateCreated?: string;
    dateModified?: string;
    name?: string | null;
    email?: string | null;
    phoneNumber?: string | null;
    senderName?: string | null;
    message?: string | null;
    bookingId?: string;
    booking?: Booking;
};
