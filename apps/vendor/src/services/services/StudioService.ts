/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdditionalServiceModel } from '../models/AdditionalServiceModel';
import type { AdditionalServiceViewStandardResponse } from '../models/AdditionalServiceViewStandardResponse';
import type { BankAccountModel } from '../models/BankAccountModel';
import type { BankAccountViewListStandardResponse } from '../models/BankAccountViewListStandardResponse';
import type { BankAccountViewStandardResponse } from '../models/BankAccountViewStandardResponse';
import type { BooleanStandardResponse } from '../models/BooleanStandardResponse';
import type { GlobalSearchResultViewPagedCollectionStandardResponse } from '../models/GlobalSearchResultViewPagedCollectionStandardResponse';
import type { MediaModel } from '../models/MediaModel';
import type { MediaUpdateModel } from '../models/MediaUpdateModel';
import type { MediaViewStandardResponse } from '../models/MediaViewStandardResponse';
import type { SavedServiceViewPagedCollectionStandardResponse } from '../models/SavedServiceViewPagedCollectionStandardResponse';
import type { SavedServiceViewStandardResponse } from '../models/SavedServiceViewStandardResponse';
import type { ServiceModel } from '../models/ServiceModel';
import type { ServiceTypeViewListStandardResponse } from '../models/ServiceTypeViewListStandardResponse';
import type { ServiceViewPagedCollectionStandardResponse } from '../models/ServiceViewPagedCollectionStandardResponse';
import type { ServiceViewStandardResponse } from '../models/ServiceViewStandardResponse';
import type { StudioKYCModel } from '../models/StudioKYCModel';
import type { StudioModel } from '../models/StudioModel';
import type { StudioViewPagedCollectionStandardResponse } from '../models/StudioViewPagedCollectionStandardResponse';
import type { StudioViewStandardResponse } from '../models/StudioViewStandardResponse';
import type { TransactionViewPagedCollectionStandardResponse } from '../models/TransactionViewPagedCollectionStandardResponse';
import type { UpdateServiceModel } from '../models/UpdateServiceModel';
import type { WalletPinModel } from '../models/WalletPinModel';
import type { WalletViewStandardResponse } from '../models/WalletViewStandardResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class StudioService {

    /**
     * Create a new studio
     * @returns StudioViewStandardResponse Success
     * @throws ApiError
     */
    public static createStudio({
device,
requestBody,
}: {
device?: any,
requestBody?: StudioModel,
}): CancelablePromise<StudioViewStandardResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Studio/create',
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
     * Get studio by id
     * @returns StudioViewStandardResponse Success
     * @throws ApiError
     */
    public static getStudioById({
id,
device,
}: {
id: string,
device?: any,
}): CancelablePromise<StudioViewStandardResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Studio/{id}',
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
     * update studio
     * @returns StudioViewStandardResponse Success
     * @throws ApiError
     */
    public static updateStudio({
device,
requestBody,
}: {
device?: any,
requestBody?: StudioModel,
}): CancelablePromise<StudioViewStandardResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Studio/update',
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
     * add studio kyc
     * @returns StudioViewStandardResponse Success
     * @throws ApiError
     */
    public static addOrUpdateKyc({
device,
requestBody,
}: {
device?: any,
requestBody?: StudioKYCModel,
}): CancelablePromise<StudioViewStandardResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Studio/kyc',
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
     * delete studio
     * @returns BooleanStandardResponse Success
     * @throws ApiError
     */
    public static deleteStudio({
id,
device,
}: {
id: string,
device?: any,
}): CancelablePromise<BooleanStandardResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Studio/delete/{id}',
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
     * Create a new service for a studio
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
     * Get service by id
     * @returns ServiceViewStandardResponse Success
     * @throws ApiError
     */
    public static getServiceById({
id,
device,
}: {
id: string,
device?: any,
}): CancelablePromise<ServiceViewStandardResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Studio/service/{id}',
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
     * Create a new additional service for a service
     * @returns AdditionalServiceViewStandardResponse Success
     * @throws ApiError
     */
    public static createAdditionalService({
device,
requestBody,
}: {
device?: any,
requestBody?: AdditionalServiceModel,
}): CancelablePromise<AdditionalServiceViewStandardResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Studio/additional-service/create',
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
     * Update service
     * @returns ServiceViewStandardResponse Success
     * @throws ApiError
     */
    public static updateService({
device,
requestBody,
}: {
device?: any,
requestBody?: UpdateServiceModel,
}): CancelablePromise<ServiceViewStandardResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Studio/service/update',
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
     * Update additional service
     * @returns AdditionalServiceViewStandardResponse Success
     * @throws ApiError
     */
    public static updateAAdditionalService({
device,
requestBody,
}: {
device?: any,
requestBody?: AdditionalServiceModel,
}): CancelablePromise<AdditionalServiceViewStandardResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Studio/additional-service/update',
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
     * Update service image
     * @returns MediaViewStandardResponse Success
     * @throws ApiError
     */
    public static updateMediaUrl({
device,
requestBody,
}: {
device?: any,
requestBody?: MediaUpdateModel,
}): CancelablePromise<MediaViewStandardResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Studio/image/update',
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
     * delete service
     * @returns BooleanStandardResponse Success
     * @throws ApiError
     */
    public static deleteService({
id,
device,
}: {
id: string,
device?: any,
}): CancelablePromise<BooleanStandardResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Studio/service/delete/{id}',
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
     * delete additional service
     * @returns BooleanStandardResponse Success
     * @throws ApiError
     */
    public static deleteAdditionalService({
id,
device,
}: {
id: string,
device?: any,
}): CancelablePromise<BooleanStandardResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Studio/additional-service/delete/{id}',
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
     * delete service image file
     * @returns BooleanStandardResponse Success
     * @throws ApiError
     */
    public static deleteServiceImage({
id,
device,
}: {
id: string,
device?: any,
}): CancelablePromise<BooleanStandardResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Studio/service-image/delete/{id}',
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
     * Get wallet details for a studio
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
     * Create pin for a studio wallet
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
     * Verify pin for a studio wallet
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
     * Add bank account for a studio
     * @returns BankAccountViewStandardResponse Success
     * @throws ApiError
     */
    public static addBankAccount({
device,
requestBody,
}: {
device?: any,
requestBody?: BankAccountModel,
}): CancelablePromise<BankAccountViewStandardResponse> {
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
     * delete bank account
     * @returns BooleanStandardResponse Success
     * @throws ApiError
     */
    public static deleteBankAccount({
id,
device,
}: {
id: string,
device?: any,
}): CancelablePromise<BooleanStandardResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Studio/accounts/delete/{id}',
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
     * Get bank accounts for a studio
     * @returns BankAccountViewListStandardResponse Success
     * @throws ApiError
     */
    public static getBankAccounts({
id,
device,
}: {
id: string,
device?: any,
}): CancelablePromise<BankAccountViewListStandardResponse> {
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
     * List transactions for a studio
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

    /**
     * List user studios
     * @returns StudioViewPagedCollectionStandardResponse Success
     * @throws ApiError
     */
    public static listUserStudios({
offset,
limit,
device,
}: {
offset?: number,
limit?: number,
device?: any,
}): CancelablePromise<StudioViewPagedCollectionStandardResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Studio/user/studios',
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

    /**
     * List all studios
     * @returns StudioViewPagedCollectionStandardResponse Success
     * @throws ApiError
     */
    public static listStudios({
offset,
limit,
search,
device,
}: {
offset?: number,
limit?: number,
search?: string,
device?: any,
}): CancelablePromise<StudioViewPagedCollectionStandardResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Studio/studios',
            headers: {
                'device': device,
            },
            query: {
                'Offset': offset,
                'Limit': limit,
                'search': search,
            },
            errors: {
                400: `Bad Request`,
                500: `Server Error`,
            },
        });
    }

    /**
     * List studio services
     * @returns StudioViewPagedCollectionStandardResponse Success
     * @throws ApiError
     */
    public static listStudioServices({
studioId,
offset,
limit,
device,
}: {
studioId: string,
offset?: number,
limit?: number,
device?: any,
}): CancelablePromise<StudioViewPagedCollectionStandardResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Studio/{studioId}/services',
            path: {
                'studioId': studioId,
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

    /**
     * List services
     * @returns ServiceViewPagedCollectionStandardResponse Success
     * @throws ApiError
     */
    public static listServices({
offset,
limit,
serviceTypeId,
minPrice,
maxPrice,
rating,
studioId,
city,
state,
device,
}: {
offset?: number,
limit?: number,
serviceTypeId?: string,
minPrice?: number,
maxPrice?: number,
rating?: number,
studioId?: string,
city?: string,
state?: string,
device?: any,
}): CancelablePromise<ServiceViewPagedCollectionStandardResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Studio/services',
            headers: {
                'device': device,
            },
            query: {
                'Offset': offset,
                'Limit': limit,
                'ServiceTypeId': serviceTypeId,
                'MinPrice': minPrice,
                'MaxPrice': maxPrice,
                'Rating': rating,
                'StudioId': studioId,
                'City': city,
                'State': state,
            },
            errors: {
                400: `Bad Request`,
                500: `Server Error`,
            },
        });
    }

    /**
     * Get list of service types
     * @returns ServiceTypeViewListStandardResponse Success
     * @throws ApiError
     */
    public static getServiceTypes({
device,
}: {
device?: any,
}): CancelablePromise<ServiceTypeViewListStandardResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Studio/service-types',
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
     * Add service image
     * @returns MediaViewStandardResponse Success
     * @throws ApiError
     */
    public static addMediaUrl({
device,
requestBody,
}: {
device?: any,
requestBody?: MediaModel,
}): CancelablePromise<MediaViewStandardResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Studio/service/add-image',
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
     * delete service image
     * @returns BooleanStandardResponse Success
     * @throws ApiError
     */
    public static deleteMediaUrl({
id,
device,
}: {
id: string,
device?: any,
}): CancelablePromise<BooleanStandardResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Studio/service/delete-image/{id}',
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
     * save service
     * @returns SavedServiceViewStandardResponse Success
     * @throws ApiError
     */
    public static saveService({
studioId,
device,
}: {
studioId?: string,
device?: any,
}): CancelablePromise<SavedServiceViewStandardResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Studio/save-service',
            headers: {
                'device': device,
            },
            query: {
                'studioId': studioId,
            },
            errors: {
                400: `Bad Request`,
                500: `Server Error`,
            },
        });
    }

    /**
     * remove from saved service
     * @returns BooleanStandardResponse Success
     * @throws ApiError
     */
    public static removeSavedService({
id,
device,
}: {
id: string,
device?: any,
}): CancelablePromise<BooleanStandardResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Studio/save-service/delete/{id}',
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
     * List saved service
     * @returns SavedServiceViewPagedCollectionStandardResponse Success
     * @throws ApiError
     */
    public static listSavedServices({
offset,
limit,
search,
device,
}: {
offset?: number,
limit?: number,
search?: string,
device?: any,
}): CancelablePromise<SavedServiceViewPagedCollectionStandardResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Studio/saved-services',
            headers: {
                'device': device,
            },
            query: {
                'Offset': offset,
                'Limit': limit,
                'search': search,
            },
            errors: {
                400: `Bad Request`,
                500: `Server Error`,
            },
        });
    }

    /**
     * Perform global search on studios, services and users
     * @returns GlobalSearchResultViewPagedCollectionStandardResponse Success
     * @throws ApiError
     */
    public static search({
offset,
limit,
search,
device,
}: {
offset?: number,
limit?: number,
search?: string,
device?: any,
}): CancelablePromise<GlobalSearchResultViewPagedCollectionStandardResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Studio/search',
            headers: {
                'device': device,
            },
            query: {
                'Offset': offset,
                'Limit': limit,
                'search': search,
            },
            errors: {
                400: `Bad Request`,
                500: `Server Error`,
            },
        });
    }

}
