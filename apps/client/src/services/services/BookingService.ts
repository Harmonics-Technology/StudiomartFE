/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BookingModel } from '../models/BookingModel';
import type { BookingViewStandardResponse } from '../models/BookingViewStandardResponse';
import type { BooleanStandardResponse } from '../models/BooleanStandardResponse';
import type { LookupModel } from '../models/LookupModel';
import type { StringStandardResponse } from '../models/StringStandardResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class BookingService {

    /**
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
            method: 'DELETE',
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

}
