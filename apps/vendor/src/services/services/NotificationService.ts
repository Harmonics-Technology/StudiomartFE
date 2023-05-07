/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BooleanStandardResponse } from '../models/BooleanStandardResponse';
import type { NotificationViewStandardResponse } from '../models/NotificationViewStandardResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class NotificationService {

    /**
     * Get a notifications by it's userId
     * @returns NotificationViewStandardResponse Success
     * @throws ApiError
     */
    public static getUserNotification({
userId,
offset,
limit,
device,
}: {
userId: string,
offset?: number,
limit?: number,
device?: any,
}): CancelablePromise<NotificationViewStandardResponse> {
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

}
