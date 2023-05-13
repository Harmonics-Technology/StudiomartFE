/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { HttpStatusCode } from './HttpStatusCode';
import type { VendorDashboardView } from './VendorDashboardView';

export type VendorDashboardViewStandardResponse = {
    href?: string | null;
    relations?: Array<string> | null;
    method?: string | null;
    routeName?: string | null;
    routeValues?: any;
    status?: boolean;
    message?: string | null;
    data?: VendorDashboardView;
    statusCode?: HttpStatusCode;
    errors?: any;
};

