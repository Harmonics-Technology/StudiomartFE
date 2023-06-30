/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BookingView } from './BookingView';
import type { Link } from './Link';

export type BookingViewPagedCollection = {
    offset?: number | null;
    limit?: number | null;
    size?: number;
    first?: Link;
    previous?: Link;
    next?: Link;
    last?: Link;
    self?: Link;
    value?: Array<BookingView> | null;
    nextOffset?: number | null;
    previousOffset?: number | null;
};
