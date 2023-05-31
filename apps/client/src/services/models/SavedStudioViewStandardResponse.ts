/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { HttpStatusCode } from './HttpStatusCode';
import type { SavedStudioView } from './SavedStudioView';

export type SavedStudioViewStandardResponse = {
    href?: string | null;
    relations?: Array<string> | null;
    method?: string | null;
    routeName?: string | null;
    routeValues?: any;
    status?: boolean;
    message?: string | null;
    data?: SavedStudioView;
    statusCode?: HttpStatusCode;
    errors?: any;
};
