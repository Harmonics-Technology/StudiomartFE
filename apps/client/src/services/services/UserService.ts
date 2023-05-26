/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BooleanStandardResponse } from '../models/BooleanStandardResponse';
import type { InitiateResetModel } from '../models/InitiateResetModel';
import type { LoginModel } from '../models/LoginModel';
import type { PasswordReset } from '../models/PasswordReset';
import type { PasswordVerificationModel } from '../models/PasswordVerificationModel';
import type { RegisterModel } from '../models/RegisterModel';
import type { SecurityQuestionModel } from '../models/SecurityQuestionModel';
import type { StringStandardResponse } from '../models/StringStandardResponse';
import type { UpdateUserModel } from '../models/UpdateUserModel';
import type { UserProfileViewStandardResponse } from '../models/UserProfileViewStandardResponse';
import type { UserViewStandardResponse } from '../models/UserViewStandardResponse';
import type { VendorRegisterModel } from '../models/VendorRegisterModel';
import type { VendorUpgradeModel } from '../models/VendorUpgradeModel';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserService {

    /**
     * Create a new user
     * @returns UserViewStandardResponse Success
     * @throws ApiError
     */
    public static create({
        device,
        requestBody,
    }: {
        device?: any,
        requestBody?: RegisterModel,
    }): CancelablePromise<UserViewStandardResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/User/register',
            headers: {
                'device': device,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Login a user
     * @returns UserViewStandardResponse Success
     * @throws ApiError
     */
    public static loginUser({
        device,
        requestBody,
    }: {
        device?: any,
        requestBody?: LoginModel,
    }): CancelablePromise<UserViewStandardResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/User/login',
            headers: {
                'device': device,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Verify a user
     * @returns UserViewStandardResponse Success
     * @throws ApiError
     */
    public static verify({
        token,
        device,
    }: {
        token: string,
        device?: any,
    }): CancelablePromise<UserViewStandardResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/User/verifyUser/{token}',
            path: {
                'token': token,
            },
            headers: {
                'device': device,
            },
        });
    }

    /**
     * Initiate password reset
     * @returns UserViewStandardResponse Success
     * @throws ApiError
     */
    public static initiateReset({
        redirectUrl,
        device,
        requestBody,
    }: {
        redirectUrl?: string,
        device?: any,
        requestBody?: InitiateResetModel,
    }): CancelablePromise<UserViewStandardResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/User/reset/initiate',
            headers: {
                'device': device,
            },
            query: {
                'redirectUrl': redirectUrl,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Complete password reset
     * @returns UserViewStandardResponse Success
     * @throws ApiError
     */
    public static completeReset({
        device,
        requestBody,
    }: {
        device?: any,
        requestBody?: PasswordReset,
    }): CancelablePromise<UserViewStandardResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/User/reset/complete',
            headers: {
                'device': device,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Update a user
     * @returns UserViewStandardResponse Success
     * @throws ApiError
     */
    public static updateUser({
        device,
        requestBody,
    }: {
        device?: any,
        requestBody?: UpdateUserModel,
    }): CancelablePromise<UserViewStandardResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/User/update',
            headers: {
                'device': device,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Update   users password
     * @returns UserViewStandardResponse Success
     * @throws ApiError
     */
    public static updatePassword({
        oldPassword,
        newPassword,
        device,
    }: {
        oldPassword?: string,
        newPassword?: string,
        device?: any,
    }): CancelablePromise<UserViewStandardResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/User/change_password',
            headers: {
                'device': device,
            },
            query: {
                'OldPassword': oldPassword,
                'NewPassword': newPassword,
            },
        });
    }

    /**
     * Get a user profile
     * @returns UserProfileViewStandardResponse Success
     * @throws ApiError
     */
    public static userProfile({
        userId,
        device,
    }: {
        userId: string,
        device?: any,
    }): CancelablePromise<UserProfileViewStandardResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/User/user-profile/{userId}',
            path: {
                'userId': userId,
            },
            headers: {
                'device': device,
            },
        });
    }

    /**
     * Get a user by id
     * @returns UserViewStandardResponse Success
     * @throws ApiError
     */
    public static getUserById({
        userId,
        device,
    }: {
        userId: string,
        device?: any,
    }): CancelablePromise<UserViewStandardResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/User/{userId}',
            path: {
                'userId': userId,
            },
            headers: {
                'device': device,
            },
        });
    }

    /**
     * Validate a token
     * @returns UserViewStandardResponse Success
     * @throws ApiError
     */
    public static validateToken({
        device,
    }: {
        device?: any,
    }): CancelablePromise<UserViewStandardResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/User/validate-token',
            headers: {
                'device': device,
            },
            errors: {
                401: `Unauthorized`,
            },
        });
    }

    /**
     * Upgrade a user from customer to vendor
     * @returns UserViewStandardResponse Success
     * @throws ApiError
     */
    public static becomeVendor({
        device,
        requestBody,
    }: {
        device?: any,
        requestBody?: VendorUpgradeModel,
    }): CancelablePromise<UserViewStandardResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/User/become-vendor',
            headers: {
                'device': device,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Create a vendor user
     * @returns UserViewStandardResponse Success
     * @throws ApiError
     */
    public static createVendor({
        device,
        requestBody,
    }: {
        device?: any,
        requestBody?: VendorRegisterModel,
    }): CancelablePromise<UserViewStandardResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/User/create-vendor',
            headers: {
                'device': device,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Get otp
     * @returns UserViewStandardResponse Success
     * @throws ApiError
     */
    public static getOtp({
        device,
    }: {
        device?: any,
    }): CancelablePromise<UserViewStandardResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/User/get-otp',
            headers: {
                'device': device,
            },
        });
    }

    /**
     * Create or update security question
     * @returns BooleanStandardResponse Success
     * @throws ApiError
     */
    public static createSecurityQuestion({
        device,
        requestBody,
    }: {
        device?: any,
        requestBody?: SecurityQuestionModel,
    }): CancelablePromise<BooleanStandardResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/User/security-question/create-or-update',
            headers: {
                'device': device,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }

    /**
     * verify answer
     * @returns BooleanStandardResponse Success
     * @throws ApiError
     */
    public static verifySecurityQuestionAnswer({
        answer,
        device,
    }: {
        answer?: string,
        device?: any,
    }): CancelablePromise<BooleanStandardResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/User/security-question/verify-answer',
            headers: {
                'device': device,
            },
            query: {
                'answer': answer,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }

    /**
     * Get user question
     * @returns StringStandardResponse Success
     * @throws ApiError
     */
    public static getUserSecurityQuestion({
        device,
    }: {
        device?: any,
    }): CancelablePromise<StringStandardResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/User/security-question/question',
            headers: {
                'device': device,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }

    /**
     * Verify user password
     * @returns BooleanStandardResponse Success
     * @throws ApiError
     */
    public static verifyPassword({
        device,
        requestBody,
    }: {
        device?: any,
        requestBody?: PasswordVerificationModel,
    }): CancelablePromise<BooleanStandardResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/User/verify-user-password',
            headers: {
                'device': device,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }

}
