import { Box, Button } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { BookingService, BookingView } from "src/services";
import { PrimaryTextarea } from "ui";
import * as yup from "yup";

interface RejectBookingModel {
  reason: string;
}

const schema = yup.object().shape({
  reason: yup.string().required(),
});

function RejectReason({ data }: { data: BookingView }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<RejectBookingModel>({
    resolver: yupResolver(schema),
    mode: "all",
  });
  const router = useRouter();
  const onSubmit = async (value: RejectBookingModel) => {
    try {
      const result = await BookingService.rejectBooking({
        id: data.id as string,
        reason: value.reason,
      });
      if (result.status) {
        toast.success(
          `You have successfully rejected booking from ${data.user?.firstName}`
        );
        router.reload();
        return;
      }
      toast.error(result.message as string);
    } catch (error: any) {
      toast.error(error?.body?.message || error?.message, {
        className: "loginToast",
      });
    }
  };
  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <PrimaryTextarea<RejectBookingModel>
          name="reason"
          error={errors.reason}
          placeholder=""
          defaultValue=""
          register={register}
          h="8rem"
          label="Reject Reason"
        />
        <Button
          variant="solid"
          height="3rem"
          width="full"
          bgColor="brand.100"
          color="white"
          isDisabled={!isValid}
          mb="1rem"
          type="submit"
          isLoading={isSubmitting}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
}

export default RejectReason;
