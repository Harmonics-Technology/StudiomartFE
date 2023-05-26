/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BanksIEnumerableStandardResponse } from '../models/BanksIEnumerableStandardResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UtilityService {

    /**
     * Get a list of banks
     * @returns BanksIEnumerableStandardResponse Success
     * @throws ApiError
     */
    public static getApiUtilityBanks({
        device,
    }: {
        device?: any,
    }): CancelablePromise<BanksIEnumerableStandardResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Utility/banks',
            headers: {
                'device': device,
            },
        });
    }

}
