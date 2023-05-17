/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Studio } from './Studio';

export type BankAccount = {
    id?: string;
    dateCreated?: string;
    dateModified?: string;
    studioId?: string | null;
    studio?: Studio;
    accountName?: string | null;
    accountNumber?: string | null;
    bankCode?: string | null;
    bankName?: string | null;
};
