/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MediaView } from './MediaView';

export type ServiceView = {
    name?: string | null;
    description?: string | null;
    price?: number;
    media?: Array<MediaView> | null;
};
