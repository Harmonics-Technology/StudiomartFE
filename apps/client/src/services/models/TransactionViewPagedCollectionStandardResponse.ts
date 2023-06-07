/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { HttpStatusCode } from './HttpStatusCode';
import type { TransactionViewPagedCollection } from './TransactionViewPagedCollection';

export type TransactionViewPagedCollectionStandardResponse = {
    href?: string | null;
    relations?: Array<string> | null;
    method?: string | null;
    routeName?: string | null;
    routeValues?: any;
    status?: boolean;
    message?: string | null;
    data?: TransactionViewPagedCollection;
    statusCode?: HttpStatusCode;
    errors?: any;
};

