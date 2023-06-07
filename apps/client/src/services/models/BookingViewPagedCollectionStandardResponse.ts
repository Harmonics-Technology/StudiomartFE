/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BookingViewPagedCollection } from './BookingViewPagedCollection';
import type { HttpStatusCode } from './HttpStatusCode';

export type BookingViewPagedCollectionStandardResponse = {
    href?: string | null;
    relations?: Array<string> | null;
    method?: string | null;
    routeName?: string | null;
    routeValues?: any;
    status?: boolean;
    message?: string | null;
    data?: BookingViewPagedCollection;
    statusCode?: HttpStatusCode;
    errors?: any;
};

