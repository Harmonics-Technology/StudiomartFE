/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Service } from './Service';

export type AdditionalService = {
    id?: string;
    dateCreated?: string;
    dateModified?: string;
    name?: string | null;
    price?: number;
    serviceId?: string;
    service?: Service;
};

