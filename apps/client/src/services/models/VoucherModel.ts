/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type VoucherModel = {
    code?: string | null;
    startDate?: string;
    endDate?: string;
    discountPercentage?: number;
    maxDiscount?: number;
    minOrderValue?: number;
    maxDiscountTimes?: number;
    codePrefix?: string | null;
};
