/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AdditionalService } from './AdditionalService';
import type { BookingTransfer } from './BookingTransfer';
import type { GiftRecipient } from './GiftRecipient';
import type { Service } from './Service';
import type { Status } from './Status';
import type { TimeOnly } from './TimeOnly';
import type { User } from './User';
import type { Voucher } from './Voucher';

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
    status?: Status;
    statusId?: number;
    amountBeforeDiscount?: number;
    isGift?: boolean;
    giftRecipientId?: string | null;
    giftRecipient?: GiftRecipient;
    voucherId?: string | null;
    voucher?: Voucher;
    additionalServices?: Array<AdditionalService> | null;
    bookingTransferId?: string | null;
    bookingTransfer?: BookingTransfer;
};
