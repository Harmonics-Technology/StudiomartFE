/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BooleanStandardResponse } from '../models/BooleanStandardResponse';
import type { NotificationViewPagedCollectionStandardResponse } from '../models/NotificationViewPagedCollectionStandardResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class NotificationService {

    /**
     * Get a notifications by it's userId
     * @returns NotificationViewPagedCollectionStandardResponse Success
     * @throws ApiError
     */
    public static getUserNotification({
userId,
offset,
limit,
isRead,
device,
}: {
userId: string,
offset?: number,
limit?: number,
isRead?: boolean,
device?: any,
}): CancelablePromise<NotificationViewPagedCollectionStandardResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Notification/{userId}',
            path: {
                'userId': userId,
            },
            headers: {
                'device': device,
            },
            query: {
                'Offset': offset,
                'Limit': limit,
                'isRead': isRead,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }

    /**
     * Get users booking notifications
     * @returns NotificationViewPagedCollectionStandardResponse Success
     * @throws ApiError
     */
    public static getUserBookingNotification({
userId,
offset,
limit,
isRead,
device,
}: {
userId: string,
offset?: number,
limit?: number,
isRead?: boolean,
device?: any,
}): CancelablePromise<NotificationViewPagedCollectionStandardResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Notification/bookings/{userId}',
            path: {
                'userId': userId,
            },
            headers: {
                'device': device,
            },
            query: {
                'Offset': offset,
                'Limit': limit,
                'isRead': isRead,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }

    /**
     * Mark notification as read
     * @returns BooleanStandardResponse Success
     * @throws ApiError
     */
    public static markAsRead({
id,
device,
}: {
id: string,
device?: any,
}): CancelablePromise<BooleanStandardResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Notification/read/{id}',
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
     * Delete notification
     * @returns BooleanStandardResponse Success
     * @throws ApiError
     */
    public static deleteNotification({
id,
device,
}: {
id: string,
device?: any,
}): CancelablePromise<BooleanStandardResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Notification/delete/{id}',
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
     * @returns BooleanStandardResponse Success
     * @throws ApiError
     */
    public static sendNotification({
device,
requestBody,
}: {
device?: any,
requestBody?: any,
}): CancelablePromise<BooleanStandardResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Notification/send',
            headers: {
                'device': device,
            },
            body: requestBody,
            mediaType: 'application/json-patch+json',
        });
    }

}
