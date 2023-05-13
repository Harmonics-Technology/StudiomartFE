/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VendorDashboardViewStandardResponse } from '../models/VendorDashboardViewStandardResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DashboardService {

    /**
     * Get a vendor dashboard metrics
     * @returns VendorDashboardViewStandardResponse Success
     * @throws ApiError
     */
    public static vendoDashboardMetrics({
        device,
    }: {
        device?: any,
    }): CancelablePromise<VendorDashboardViewStandardResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Dashboard/vendor-dashboard',
            headers: {
                'device': device,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }

    /**
     * Get a vendor studio dashboard metrics
     * <param name="studioId"></param>
     * @returns VendorDashboardViewStandardResponse Success
     * @throws ApiError
     */
    public static vendorStudioDashboardMetrics({
        studioId,
        device,
    }: {
        studioId: string,
        device?: any,
    }): CancelablePromise<VendorDashboardViewStandardResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Dashboard/vendor-dashboard/{studioId}',
            path: {
                'studioId': studioId,
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
