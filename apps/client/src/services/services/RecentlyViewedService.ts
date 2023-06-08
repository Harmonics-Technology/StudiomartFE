/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RecentlyViewedModel } from '../models/RecentlyViewedModel';
import type { RecentlyViewedViewIEnumerableStandardResponse } from '../models/RecentlyViewedViewIEnumerableStandardResponse';
import type { RecentlyViewedViewStandardResponse } from '../models/RecentlyViewedViewStandardResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class RecentlyViewedService {

    /**
     * Create a new recently viewed item
     * @returns RecentlyViewedViewStandardResponse Success
     * @throws ApiError
     */
    public static createRecentlyViewed({
        device,
        requestBody,
    }: {
        device?: any,
        requestBody?: RecentlyViewedModel,
    }): CancelablePromise<RecentlyViewedViewStandardResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/RecentlyViewed/create',
            headers: {
                'device': device,
            },
            body: requestBody,
            mediaType: 'application/json-patch+json',
            errors: {
                400: `Bad Request`,
                500: `Server Error`,
            },
        });
    }

    /**
     * Get recently viewed items
     * @returns RecentlyViewedViewIEnumerableStandardResponse Success
     * @throws ApiError
     */
    public static getRecentlyViewedItems({
        type,
        device,
    }: {
        type: string,
        device?: any,
    }): CancelablePromise<RecentlyViewedViewIEnumerableStandardResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/RecentlyViewed/get/{type}',
            path: {
                'type': type,
            },
            headers: {
                'device': device,
            },
            errors: {
                400: `Bad Request`,
                500: `Server Error`,
            },
        });
    }

}
