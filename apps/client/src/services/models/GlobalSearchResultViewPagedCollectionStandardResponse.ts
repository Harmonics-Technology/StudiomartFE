/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GlobalSearchResultViewPagedCollection } from './GlobalSearchResultViewPagedCollection';
import type { HttpStatusCode } from './HttpStatusCode';

export type GlobalSearchResultViewPagedCollectionStandardResponse = {
    href?: string | null;
    relations?: Array<string> | null;
    method?: string | null;
    routeName?: string | null;
    routeValues?: any;
    status?: boolean;
    message?: string | null;
    data?: GlobalSearchResultViewPagedCollection;
    statusCode?: HttpStatusCode;
    errors?: any;
};

