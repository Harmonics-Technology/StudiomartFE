/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GlobalSearchResultView } from './GlobalSearchResultView';
import type { Link } from './Link';

export type GlobalSearchResultViewPagedCollection = {
    offset?: number | null;
    limit?: number | null;
    size?: number;
    first?: Link;
    previous?: Link;
    next?: Link;
    last?: Link;
    self?: Link;
    value?: Array<GlobalSearchResultView> | null;
    nextOffset?: number | null;
    previousOffset?: number | null;
};
