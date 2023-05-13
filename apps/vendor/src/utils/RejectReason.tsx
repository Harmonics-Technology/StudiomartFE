import { Box, Button, Text } from '@chakra-ui/react';
import React from 'react';
import { PrimaryTextarea } from 'ui';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { BookingService } from 'src/services';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';

interface RejectBookingModel {
  reason: string;
}

const schema = yup.object().shape({
  numberOfBedrooms: yup.string().required(),
});

function RejectReason({ id }: { id: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<RejectBookingModel>({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const router = useRouter();
  const onSubmit = async (data: RejectBookingModel) => {
    try {
      const result = await BookingService.rejectBooking({
        id,
        reason: data.reason,
      });
      if (result.status) {
        toast.success('Booking rejected succesfully');
        router.reload();
        return;
      }
      toast.error(result.message as string);
    } catch (error: any) {
      toast.error(error.body.message || error.message);
    }
  };
  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Text fontWeight="600" fontSize="24px" mb="0">
          Reason
        </Text>
        <PrimaryTextarea<RejectBookingModel>
          name="reason"
          error={errors.reason}
          placeholder=""
          defaultValue=""
          register={register}
          h="10rem"
        />
        <Button
          variant="solid"
          height="3rem"
          width="full"
          bgColor="brand.100"
          color="white"
          disabled={!isValid}
          mb="1rem"
          isLoading={isSubmitting}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
}

export default RejectReason;
