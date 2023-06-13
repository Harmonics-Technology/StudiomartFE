/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BankAccountView } from './BankAccountView';
import type { HttpStatusCode } from './HttpStatusCode';

export type BankAccountViewStandardResponse = {
    href?: string | null;
    relations?: Array<string> | null;
    method?: string | null;
    routeName?: string | null;
    routeValues?: any;
    status?: boolean;
    message?: string | null;
    data?: BankAccountView;
    statusCode?: HttpStatusCode;
    errors?: any;
};
