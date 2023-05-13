/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AdditionalServiceView } from './AdditionalServiceView';
import type { MediaView } from './MediaView';

export type ServiceView = {
    id?: string;
    name?: string | null;
    description?: string | null;
    price?: number;
    bannerImageURL?: string | null;
    media?: Array<MediaView> | null;
    additionalServices?: Array<AdditionalServiceView> | null;
};

