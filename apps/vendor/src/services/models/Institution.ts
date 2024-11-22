/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Institution = {
    id?: string;
    dateCreated?: string;
    dateModified?: string;
    name?: string | null;
    alias?: string | null;
    logo?: string | null;
    address?: string | null;
    city?: string | null;
    state?: string | null;
    country?: string | null;
    longitude?: number | null;
    latitude?: number | null;
    isIntegrated?: boolean;
};
