/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Service } from './Service';
import type { Studio } from './Studio';

export type Media = {
    id?: string;
    dateCreated?: string;
    dateModified?: string;
    url?: string | null;
    serviceId?: string | null;
    service?: Service;
    studioId?: string | null;
    studio?: Studio;
};

