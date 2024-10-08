/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { HttpStatusCode } from './HttpStatusCode';
import type { RecentlyViewedView } from './RecentlyViewedView';

export type RecentlyViewedViewIEnumerableStandardResponse = {
    href?: string | null;
    relations?: Array<string> | null;
    method?: string | null;
    routeName?: string | null;
    routeValues?: any;
    status?: boolean;
    message?: string | null;
    data?: Array<RecentlyViewedView> | null;
    statusCode?: HttpStatusCode;
    errors?: any;
};
