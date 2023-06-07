/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AdditionalServiceView } from './AdditionalServiceView';
import type { MediaView } from './MediaView';
import type { ReviewCountView } from './ReviewCountView';
import type { ServiceTypeView } from './ServiceTypeView';
import type { StudioView } from './StudioView';
import type { UserView } from './UserView';

export type ServiceView = {
    id?: string;
    name?: string | null;
    description?: string | null;
    price?: number;
    bannerImageURL?: string | null;
    studio?: StudioView;
    media?: Array<MediaView> | null;
    additionalServices?: Array<AdditionalServiceView> | null;
    serviceTypeId?: string;
    serviceType?: ServiceTypeView;
    reviewCounts?: ReviewCountView;
    user?: UserView;
    totalReviewCount?: number;
    averageRating?: number;
};

