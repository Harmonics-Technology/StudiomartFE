/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BankResponse } from './BankResponse';
import type { HttpStatusCode } from './HttpStatusCode';

export type BankResponseIEnumerableStandardResponse = {
    href?: string | null;
    relations?: Array<string> | null;
    method?: string | null;
    routeName?: string | null;
    routeValues?: any;
    status?: boolean;
    message?: string | null;
    data?: Array<BankResponse> | null;
    statusCode?: HttpStatusCode;
    errors?: any;
};
