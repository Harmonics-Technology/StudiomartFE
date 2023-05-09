/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BankAccountModel } from '../models/BankAccountModel';
import type { ServiceModel } from '../models/ServiceModel';
import type { ServiceViewStandardResponse } from '../models/ServiceViewStandardResponse';
import type { TransactionViewPagedCollectionStandardResponse } from '../models/TransactionViewPagedCollectionStandardResponse';
import type { WalletPinModel } from '../models/WalletPinModel';
import type { WalletViewStandardResponse } from '../models/WalletViewStandardResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class StudioService {

    /**
     * @returns ServiceViewStandardResponse Success
     * @throws ApiError
     */
    public static createService({
device,
requestBody,
}: {
device?: any,
requestBody?: ServiceModel,
}): CancelablePromise<ServiceViewStandardResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Studio/service/create',
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
     * @returns WalletViewStandardResponse Success
     * @throws ApiError
     */
    public static getWallet({
id,
device,
}: {
id: string,
device?: any,
}): CancelablePromise<WalletViewStandardResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Studio/{id}/wallet',
            path: {
                'id': id,
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

    /**
     * @returns WalletViewStandardResponse Success
     * @throws ApiError
     */
    public static createWalletPin({
device,
requestBody,
}: {
device?: any,
requestBody?: WalletPinModel,
}): CancelablePromise<WalletViewStandardResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Studio/wallet/pin/create',
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
     * @returns WalletViewStandardResponse Success
     * @throws ApiError
     */
    public static verifyPin({
device,
requestBody,
}: {
device?: any,
requestBody?: WalletPinModel,
}): CancelablePromise<WalletViewStandardResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Studio/wallet/pin/verify',
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
     * @returns WalletViewStandardResponse Success
     * @throws ApiError
     */
    public static addBankAccount({
device,
requestBody,
}: {
device?: any,
requestBody?: BankAccountModel,
}): CancelablePromise<WalletViewStandardResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Studio/accounts/add',
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
     * @returns WalletViewStandardResponse Success
     * @throws ApiError
     */
    public static getBankAccounts({
id,
device,
}: {
id: string,
device?: any,
}): CancelablePromise<WalletViewStandardResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Studio/{id}/accounts',
            path: {
                'id': id,
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

    /**
     * @returns TransactionViewPagedCollectionStandardResponse Success
     * @throws ApiError
     */
    public static listTransactions({
id,
offset,
limit,
device,
}: {
id: string,
offset?: number,
limit?: number,
device?: any,
}): CancelablePromise<TransactionViewPagedCollectionStandardResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Studio/{id}/transactions',
            path: {
                'id': id,
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
                500: `Server Error`,
            },
        });
    }

}
