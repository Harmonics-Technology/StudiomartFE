/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { HttpStatusCode } from './HttpStatusCode';
import type { ServiceViewPagedCollection } from './ServiceViewPagedCollection';

export type ServiceViewPagedCollectionStandardResponse = {
    href?: string | null;
    relations?: Array<string> | null;
    method?: string | null;
    routeName?: string | null;
    routeValues?: any;
    status?: boolean;
    message?: string | null;
    data?: ServiceViewPagedCollection;
    statusCode?: HttpStatusCode;
    errors?: any;
};

