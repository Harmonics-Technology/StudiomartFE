/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GiftRecipientModel } from './GiftRecipientModel';
import type { TimeOnlyModel } from './TimeOnlyModel';

export type BookingModel = {
    serviceId?: string;
    date?: string;
    inputTime?: TimeOnlyModel;
    additionalServices?: Array<string> | null;
    voucherId?: string | null;
    isGift?: boolean;
    recipient?: GiftRecipientModel;
};
