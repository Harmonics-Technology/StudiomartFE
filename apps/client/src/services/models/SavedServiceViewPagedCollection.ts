/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Link } from './Link';
import type { SavedServiceView } from './SavedServiceView';

export type SavedServiceViewPagedCollection = {
    offset?: number | null;
    limit?: number | null;
    size?: number;
    first?: Link;
    previous?: Link;
    next?: Link;
    last?: Link;
    self?: Link;
    value?: Array<SavedServiceView> | null;
    nextOffset?: number | null;
    previousOffset?: number | null;
};

