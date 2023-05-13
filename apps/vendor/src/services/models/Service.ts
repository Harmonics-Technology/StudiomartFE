/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AdditionalService } from './AdditionalService';
import type { Media } from './Media';
import type { Studio } from './Studio';
import type { User } from './User';

export type Service = {
    id?: string;
    dateCreated?: string;
    dateModified?: string;
    name?: string | null;
    description?: string | null;
    price?: number;
    bannerImageURL?: string | null;
    media?: Array<Media> | null;
    additionalServices?: Array<AdditionalService> | null;
    userId?: string;
    user?: User;
    studioId?: string;
    studio?: Studio;
};

