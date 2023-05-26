/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AdditionalServiceModel } from './AdditionalServiceModel';

export type ServiceModel = {
    name?: string | null;
    description?: string | null;
    price?: number;
    bannerImageURL?: string | null;
    mediaUrls?: Array<string> | null;
    additionalServices?: Array<AdditionalServiceModel> | null;
    studioId?: string;
    serviceTypeId?: string;
};

