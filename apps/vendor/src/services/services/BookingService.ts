/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BookingModel } from '../models/BookingModel';
import type { BookingStatus } from '../models/BookingStatus';
import type { BookingViewPagedCollectionStandardResponse } from '../models/BookingViewPagedCollectionStandardResponse';
import type { BookingViewStandardResponse } from '../models/BookingViewStandardResponse';
import type { BooleanStandardResponse } from '../models/BooleanStandardResponse';
import type { LookupModel } from '../models/LookupModel';
import type { StringStandardResponse } from '../models/StringStandardResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class BookingService {

    /**
     * Lookup for a date and time to see if it is available
     * @returns BooleanStandardResponse Success
     * @throws ApiError
     */
    public static dateTimeLookup({
device,
requestBody,
}: {
device?: any,
requestBody?: LookupModel,
}): CancelablePromise<BooleanStandardResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Booking/lookup',
            headers: {
                'device': device,
            },
            body: requestBody,
            mediaType: 'application/json-patch+json',
            errors: {
                400: `Bad Request`,
            },
        });
    }

    /**
     * Create a new booking
     * @returns BookingViewStandardResponse Success
     * @throws ApiError
     */
    public static createBooking({
device,
requestBody,
}: {
device?: any,
requestBody?: BookingModel,
}): CancelablePromise<BookingViewStandardResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Booking/create',
            headers: {
                'device': device,
            },
            body: requestBody,
            mediaType: 'application/json-patch+json',
            errors: {
                400: `Bad Request`,
            },
        });
    }

    /**
     * Get a booking by it's id
     * @returns BookingViewStandardResponse Success
     * @throws ApiError
     */
    public static getBooking({
id,
device,
}: {
id: string,
device?: any,
}): CancelablePromise<BookingViewStandardResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Booking/{id}',
            path: {
                'id': id,
            },
            headers: {
                'device': device,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }

    /**
     * Cancel a booking by id
     * @returns BookingViewStandardResponse Success
     * @throws ApiError
     */
    public static cancelBookings({
id,
device,
}: {
id: string,
device?: any,
}): CancelablePromise<BookingViewStandardResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Booking/cancel/{id}',
            path: {
                'id': id,
            },
            headers: {
                'device': device,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }

    /**
     * Accept a booking by id
     * @returns BookingViewStandardResponse Success
     * @throws ApiError
     */
    public static acceptBooking({
id,
device,
}: {
id: string,
device?: any,
}): CancelablePromise<BookingViewStandardResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Booking/accept/{id}',
            path: {
                'id': id,
            },
            headers: {
                'device': device,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }

    /**
     * Reject a booking by id
     * @returns BookingViewStandardResponse Success
     * @throws ApiError
     */
    public static rejectBooking({
id,
reason,
device,
}: {
id: string,
reason?: string,
device?: any,
}): CancelablePromise<BookingViewStandardResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Booking/reject/{id}',
            path: {
                'id': id,
            },
            headers: {
                'device': device,
            },
            query: {
                'reason': reason,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }

    /**
     * Check in a booking by id, this returns a payment link
     * @returns StringStandardResponse Success
     * @throws ApiError
     */
    public static checkout({
id,
device,
}: {
id: string,
device?: any,
}): CancelablePromise<StringStandardResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Booking/checkout/{id}',
            path: {
                'id': id,
            },
            headers: {
                'device': device,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }

    /**
     * Get all service bookings
     * @returns BookingViewPagedCollectionStandardResponse Success
     * @throws ApiError
     */
    public static getBookingsByServiceId({
offset,
limit,
studioId,
serviceId,
status,
filterBy,
search,
startDate,
endDate,
device,
}: {
offset?: number,
limit?: number,
studioId?: string,
serviceId?: string,
status?: BookingStatus,
filterBy?: number,
search?: string,
startDate?: string,
endDate?: string,
device?: any,
}): CancelablePromise<BookingViewPagedCollectionStandardResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Booking/bookings',
            headers: {
                'device': device,
            },
            query: {
                'Offset': offset,
                'Limit': limit,
                'StudioId': studioId,
                'ServiceId': serviceId,
                'Status': status,
                'FilterBy': filterBy,
                'Search': search,
                'StartDate': startDate,
                'EndDate': endDate,
            },
            errors: {
                400: `Bad Request`,
                500: `Server Error`,
            },
        });
    }

    /**
     * Get all bookings for a user
     * @returns BookingViewPagedCollectionStandardResponse Success
     * @throws ApiError
     */
    public static getBookingsByUser({
offset,
limit,
studioId,
serviceId,
status,
filterBy,
search,
startDate,
endDate,
device,
}: {
offset?: number,
limit?: number,
studioId?: string,
serviceId?: string,
status?: BookingStatus,
filterBy?: number,
search?: string,
startDate?: string,
endDate?: string,
device?: any,
}): CancelablePromise<BookingViewPagedCollectionStandardResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Booking/bookings/user',
            headers: {
                'device': device,
            },
            query: {
                'Offset': offset,
                'Limit': limit,
                'StudioId': studioId,
                'ServiceId': serviceId,
                'Status': status,
                'FilterBy': filterBy,
                'Search': search,
                'StartDate': startDate,
                'EndDate': endDate,
            },
            errors: {
                400: `Bad Request`,
                500: `Server Error`,
            },
        });
    }

}
