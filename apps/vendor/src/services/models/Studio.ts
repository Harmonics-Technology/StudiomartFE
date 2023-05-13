/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BankAccount } from './BankAccount';
import type { Service } from './Service';
import type { User } from './User';

export type Studio = {
    id?: string;
    dateCreated?: string;
    dateModified?: string;
    name?: string | null;
    description?: string | null;
    address?: string | null;
    city?: string | null;
    state?: string | null;
    country?: string | null;
    zipCode?: string | null;
    phone?: string | null;
    email?: string | null;
    website?: string | null;
    logo?: string | null;
    coverPhoto?: string | null;
    officeAddress?: string | null;
    studioCapacity?: string | null;
    cacDocumentReference?: string | null;
    meansOfIdentification?: string | null;
    facebook?: string | null;
    instagram?: string | null;
    twitter?: string | null;
    linkedIn?: string | null;
    youTube?: string | null;
    userId?: string;
    user?: User;
    services?: Array<Service> | null;
    bankAccounts?: Array<BankAccount> | null;
};

