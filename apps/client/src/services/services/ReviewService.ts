/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ReviewModel } from '../models/ReviewModel';
import type { ReviewViewPagedCollectionStandardResponse } from '../models/ReviewViewPagedCollectionStandardResponse';
import type { ReviewViewStandardResponse } from '../models/ReviewViewStandardResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ReviewService {

    /**
     * Review a service
     * @returns ReviewViewStandardResponse Success
     * @throws ApiError
     */
    public static createReview({
        device,
        requestBody,
    }: {
        device?: any,
        requestBody?: ReviewModel,
    }): CancelablePromise<ReviewViewStandardResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Review/create',
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
     * Get all reviews
     * @returns ReviewViewPagedCollectionStandardResponse Success
     * @throws ApiError
     */
    public static getReviews({
        offset,
        limit,
        studioId,
        serviceId,
        device,
    }: {
        offset?: number,
        limit?: number,
        studioId?: string,
        serviceId?: string,
        device?: any,
    }): CancelablePromise<ReviewViewPagedCollectionStandardResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Review/reviews',
            headers: {
                'device': device,
            },
            query: {
                'Offset': offset,
                'Limit': limit,
                'studioId': studioId,
                'serviceId': serviceId,
            },
            errors: {
                400: `Bad Request`,
                500: `Server Error`,
            },
        });
    }

}
