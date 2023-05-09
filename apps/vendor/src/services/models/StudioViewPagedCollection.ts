/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Link } from './Link';
import type { StudioView } from './StudioView';

export type StudioViewPagedCollection = {
    offset?: number | null;
    limit?: number | null;
    size?: number;
    first?: Link;
    previous?: Link;
    next?: Link;
    last?: Link;
    self?: Link;
    value?: Array<StudioView> | null;
};
