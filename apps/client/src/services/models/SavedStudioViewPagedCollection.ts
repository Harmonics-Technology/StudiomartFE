/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Link } from './Link';
import type { SavedStudioView } from './SavedStudioView';

export type SavedStudioViewPagedCollection = {
    offset?: number | null;
    limit?: number | null;
    size?: number;
    first?: Link;
    previous?: Link;
    next?: Link;
    last?: Link;
    self?: Link;
    value?: Array<SavedStudioView> | null;
};
