/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Banks } from './Banks';
import type { HttpStatusCode } from './HttpStatusCode';

export type BanksIEnumerableStandardResponse = {
    href?: string | null;
    relations?: Array<string> | null;
    method?: string | null;
    routeName?: string | null;
    routeValues?: any;
    status?: boolean;
    message?: string | null;
    data?: Array<Banks> | null;
    statusCode?: HttpStatusCode;
    errors?: any;
};
