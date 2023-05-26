/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BookingView } from './BookingView';
import type { HttpStatusCode } from './HttpStatusCode';

export type BookingViewStandardResponse = {
    href?: string | null;
    relations?: Array<string> | null;
    method?: string | null;
    routeName?: string | null;
    routeValues?: any;
    status?: boolean;
    message?: string | null;
    data?: BookingView;
    statusCode?: HttpStatusCode;
    errors?: any;
};

