/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BookingStatus } from './BookingStatus';

export type BookingFilterOptions = {
    studioId?: string | null;
    serviceId?: string | null;
    status?: BookingStatus;
    filterBy?: number | null;
    search?: string | null;
    startDate?: string | null;
    endDate?: string | null;
};
