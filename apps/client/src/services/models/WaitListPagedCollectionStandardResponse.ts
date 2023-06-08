/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { HttpStatusCode } from './HttpStatusCode';
import type { WaitListPagedCollection } from './WaitListPagedCollection';

export type WaitListPagedCollectionStandardResponse = {
    href?: string | null;
    relations?: Array<string> | null;
    method?: string | null;
    routeName?: string | null;
    routeValues?: any;
    status?: boolean;
    message?: string | null;
    data?: WaitListPagedCollection;
    statusCode?: HttpStatusCode;
    errors?: any;
};

