/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { HttpStatusCode } from './HttpStatusCode';
import type { ServiceTypeView } from './ServiceTypeView';

export type ServiceTypeViewListStandardResponse = {
    href?: string | null;
    relations?: Array<string> | null;
    method?: string | null;
    routeName?: string | null;
    routeValues?: any;
    status?: boolean;
    message?: string | null;
    data?: Array<ServiceTypeView> | null;
    statusCode?: HttpStatusCode;
    errors?: any;
};

