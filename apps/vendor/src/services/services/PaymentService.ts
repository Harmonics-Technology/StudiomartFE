/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ObjectStandardResponse } from '../models/ObjectStandardResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PaymentService {

    /**
     * Verify payment using the transaction reference and transaction id
     * @returns ObjectStandardResponse Success
     * @throws ApiError
     */
    public static verifyPayment({
        transactionReference,
        transactionId,
        device,
    }: {
        transactionReference: string,
        transactionId: number,
        device?: any,
    }): CancelablePromise<ObjectStandardResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Payment/verify/{transactionReference}/{transactionId}',
            path: {
                'transactionReference': transactionReference,
                'transactionId': transactionId,
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
