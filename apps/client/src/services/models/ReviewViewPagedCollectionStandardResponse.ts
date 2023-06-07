/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { HttpStatusCode } from './HttpStatusCode';
import type { ReviewViewPagedCollection } from './ReviewViewPagedCollection';

export type ReviewViewPagedCollectionStandardResponse = {
    href?: string | null;
    relations?: Array<string> | null;
    method?: string | null;
    routeName?: string | null;
    routeValues?: any;
    status?: boolean;
    message?: string | null;
    data?: ReviewViewPagedCollection;
    statusCode?: HttpStatusCode;
    errors?: any;
};

