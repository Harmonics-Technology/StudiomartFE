import { VoucherService } from "src/services";

export default function VoucherCoupon({
  setCouponError,
  setCouponApplied,
  setIsLoading,
  couponInput,
}: any) {
  const applyCoupon = async () => {
    setCouponError("");
    setCouponApplied({});
    setIsLoading(true);
    try {
      const data = await VoucherService.getVoucher({ code: couponInput });
      if (data.status) {
        setIsLoading(false);
        setCouponApplied({
          discount: data.data?.discountPercentage,
          type: "percent",
          valid:
            data.data?.usageCount != data.data?.maxDiscountTimes ? true : false,
          maxDiscount: data.data?.maxDiscount,
          id: data.data?.id,
        });
        return;
      }
      setCouponError(data.message);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      setCouponError(error.body.message || error.message);
    }
  };

  applyCoupon();
}
