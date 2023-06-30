/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UpdateUserModel = {
    id?: string;
    phoneNumber?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    profileURl?: string | null;
    allowSmsNotification?: boolean;
    allowEmailNotification?: boolean;
    allowPushNotification?: boolean;
};
