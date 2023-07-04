/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BooleanStandardResponse } from '../models/BooleanStandardResponse';
import type { VoucherModel } from '../models/VoucherModel';
import type { VoucherStandardResponse } from '../models/VoucherStandardResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class VoucherService {

    /**
     * @returns VoucherStandardResponse Success
     * @throws ApiError
     */
    public static createVoucher({
device,
requestBody,
}: {
device?: any,
requestBody?: VoucherModel,
}): CancelablePromise<VoucherStandardResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Voucher/create',
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
     * @returns VoucherStandardResponse Success
     * @throws ApiError
     */
    public static getVoucher({
code,
device,
}: {
code: string,
device?: any,
}): CancelablePromise<VoucherStandardResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Voucher/{code}',
            path: {
                'code': code,
            },
            headers: {
                'device': device,
            },
        });
    }

    /**
     * @returns VoucherStandardResponse Success
     * @throws ApiError
     */
    public static updateVoucher({
code,
device,
requestBody,
}: {
code: string,
device?: any,
requestBody?: VoucherModel,
}): CancelablePromise<VoucherStandardResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Voucher/{code}',
            path: {
                'code': code,
            },
            headers: {
                'device': device,
            },
            body: requestBody,
            mediaType: 'application/json-patch+json',
        });
    }

    /**
     * @returns BooleanStandardResponse Success
     * @throws ApiError
     */
    public static pauseVoucher({
code,
device,
}: {
code: string,
device?: any,
}): CancelablePromise<BooleanStandardResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Voucher/{code}/pause',
            path: {
                'code': code,
            },
            headers: {
                'device': device,
            },
        });
    }

    /**
     * @returns BooleanStandardResponse Success
     * @throws ApiError
     */
    public static resumeVoucher({
code,
device,
}: {
code: string,
device?: any,
}): CancelablePromise<BooleanStandardResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Voucher/{code}/resume',
            path: {
                'code': code,
            },
            headers: {
                'device': device,
            },
        });
    }

    /**
     * @returns VoucherStandardResponse Success
     * @throws ApiError
     */
    public static listVouchers({
offset,
limit,
device,
}: {
offset?: number,
limit?: number,
device?: any,
}): CancelablePromise<VoucherStandardResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Voucher',
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
