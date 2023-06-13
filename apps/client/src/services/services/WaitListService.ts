/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { WaitList } from '../models/WaitList';
import type { WaitListPagedCollectionStandardResponse } from '../models/WaitListPagedCollectionStandardResponse';
import type { WaitListStandardResponse } from '../models/WaitListStandardResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class WaitListService {

    /**
     * Create a new studio
     * @returns WaitListStandardResponse Success
     * @throws ApiError
     */
    public static createWaitList({
device,
requestBody,
}: {
device?: any,
requestBody?: WaitList,
}): CancelablePromise<WaitListStandardResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/WaitList/create',
            headers: {
                'device': device,
            },
            body: requestBody,
            mediaType: 'application/json-patch+json',
        });
    }

    /**
     * Get a list of waitLists
     * @returns WaitListPagedCollectionStandardResponse Success
     * @throws ApiError
     */
    public static list({
offset,
limit,
device,
}: {
offset?: number,
limit?: number,
device?: any,
}): CancelablePromise<WaitListPagedCollectionStandardResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/WaitList/list-waitlist',
            headers: {
                'device': device,
            },
            query: {
                'Offset': offset,
                'Limit': limit,
            },
        });
    }

}
