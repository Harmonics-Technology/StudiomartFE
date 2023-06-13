/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AdditionalServiceView } from './AdditionalServiceView';
import type { HttpStatusCode } from './HttpStatusCode';

export type AdditionalServiceViewStandardResponse = {
    href?: string | null;
    relations?: Array<string> | null;
    method?: string | null;
    routeName?: string | null;
    routeValues?: any;
    status?: boolean;
    message?: string | null;
    data?: AdditionalServiceView;
    statusCode?: HttpStatusCode;
    errors?: any;
};
