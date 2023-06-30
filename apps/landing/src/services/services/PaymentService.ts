/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BooleanStandardResponse } from '../models/BooleanStandardResponse';
import type { ObjectStandardResponse } from '../models/ObjectStandardResponse';
import type { WithdrawalModel } from '../models/WithdrawalModel';

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

    /**
     * Withdraw from wallet
     * @returns BooleanStandardResponse Success
     * @throws ApiError
     */
    public static withdrawFromWallet({
device,
requestBody,
}: {
device?: any,
requestBody?: WithdrawalModel,
}): CancelablePromise<BooleanStandardResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Payment/wallet/withdraw',
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

}
