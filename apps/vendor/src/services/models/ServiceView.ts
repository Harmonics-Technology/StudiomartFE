/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MediaView } from './MediaView';

export type ServiceView = {
    id?: string;
    name?: string | null;
    description?: string | null;
    price?: number;
    media?: Array<MediaView> | null;
};
