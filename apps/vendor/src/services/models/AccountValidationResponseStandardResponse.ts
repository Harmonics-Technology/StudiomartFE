/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountValidationResponse } from './AccountValidationResponse';
import type { HttpStatusCode } from './HttpStatusCode';

export type AccountValidationResponseStandardResponse = {
    href?: string | null;
    relations?: Array<string> | null;
    method?: string | null;
    routeName?: string | null;
    routeValues?: any;
    status?: boolean;
    message?: string | null;
    data?: AccountValidationResponse;
    statusCode?: HttpStatusCode;
    errors?: any;
};
