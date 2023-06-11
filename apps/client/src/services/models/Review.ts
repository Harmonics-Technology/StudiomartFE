/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Service } from './Service';
import type { User } from './User';

export type Review = {
    id?: string;
    dateCreated?: string;
    dateModified?: string;
    userId?: string;
    user?: User;
    serviceId?: string;
    service?: Service;
    reviewNote?: string | null;
    reviewCount?: number;
};

