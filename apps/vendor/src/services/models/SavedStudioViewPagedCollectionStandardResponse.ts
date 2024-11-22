/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { HttpStatusCode } from './HttpStatusCode';
import type { SavedStudioViewPagedCollection } from './SavedStudioViewPagedCollection';

export type SavedStudioViewPagedCollectionStandardResponse = {
    href?: string | null;
    relations?: Array<string> | null;
    method?: string | null;
    routeName?: string | null;
    routeValues?: any;
    status?: boolean;
    message?: string | null;
    data?: SavedStudioViewPagedCollection;
    statusCode?: HttpStatusCode;
    errors?: any;
};
