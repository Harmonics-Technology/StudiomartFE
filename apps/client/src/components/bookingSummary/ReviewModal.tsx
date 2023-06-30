import { Button, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ReviewModel, ReviewService } from "src/services";
import { ModalWrapper, PrimaryInput, PrimaryTextarea } from "ui";
import * as yup from "yup";
import { Star, Rating } from "@smastrom/react-rating";
import { useRouter } from "next/router";

const schema = yup.object().shape({
  reviewNote: yup.string().required(),
});

export const ReviewModal = ({ id, isOpen, onClose }: any) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ReviewModel>({
    resolver: yupResolver(schema),
    mode: "all",
  });
  const router = useRouter();

  const [rating, setRating] = useState(0);

  const myStyles = {
    itemShapes: Star,
    activeFillColor: "#facc15",
    inactiveStrokeColor: "#facc15",
    itemStrokeWidth: 2,
    activeStrokeColor: "transparent",
  };

  const processRating = async (data: ReviewModel) => {
    data.serviceId = id;
    data.reviewCount = rating;
    try {
      const result = await ReviewService.createReview({
        requestBody: data,
      });
      if (result.status) {
        toast.success(`Review submitted successfully`);
        onClose();
        router.reload();
        return;
      }
      toast.error(result.message as string);
      return;
    } catch (err: any) {
      toast.error(err?.body?.message || err?.message, {
        className: "loginToast",
      });
    }
  };
  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="How was your experience?"
      w="30%"
    >
      <form onSubmit={handleSubmit(processRating)}>
        <VStack gap="1rem">
          <Rating value={rating} onChange={setRating} itemStyles={myStyles} />
          <PrimaryTextarea<ReviewModel>
            label="Note"
            type="text"
            placeholder="Enter a short note about your experience"
            name="reviewNote"
            error={errors.reviewNote}
            register={register}
            defaultValue={""}
          />
          <Button
            isDisabled={!isValid}
            bgColor="brand.100"
            color="white"
            width="100%"
            h="3rem"
            type="submit"
            isLoading={isSubmitting}
          >
            Proceed
          </Button>
        </VStack>
      </form>
    </ModalWrapper>
  );
};
