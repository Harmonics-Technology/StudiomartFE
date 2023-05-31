import {
  Box,
  Button,
  Checkbox,
  Grid,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { DateObject } from "react-multi-date-picker";
import { ICustomerHome } from "src/models/schema";
import { BookingService, LookupModel } from "src/services";
import { BackToPage, Naira, PrimaryDate, SubmitButton } from "ui";

const ScheduleDateTime = ({ singleService, id }: ICustomerHome) => {
  const router = useRouter();

  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LookupModel>({
    mode: "all",
    defaultValues: {
      serviceId: id,
    },
  });

  // console.log(dayjs(watch("time")).format("HH"));

  const ChekDateAvailability = async (data: LookupModel) => {
    data.time = {
      hour: dayjs(data.time as string).format("H") as unknown as number,
      minute: dayjs(data.time as string).format("mm") as unknown as number,
    };
    console.log({ data });
    try {
      const result = await BookingService.dateTimeLookup({ requestBody: data });
      console.log({ result });
      if (result.status) {
        toast.success(result.message as string);
        router.push(
          `/customer/bookings/${id}?date=${data.date}&time=${data.time}`
        );
        return;
      }
      toast.error(result.message as string);
      return;
    } catch (error: any) {
      toast.error(error?.body?.message || error?.message, {
        className: "loginToast",
      });
    }
  };
  return (
    <Box w=" 100%" minH="100vh" border="2px hidden red" py="30px">
      <Box border="2px hidden blue" w={["90%", "60%"]} mx="auto">
        <BackToPage name="Back to home page" />

        <Box border="2px hidden green" w="100%" pt="40px">
          <Box w=" 100%" bg="#F5F5F5" py="30px">
            <form onSubmit={handleSubmit(ChekDateAvailability)}>
              <VStack w="100%" spacing={0.5}>
                <Heading
                  w="100%"
                  lineHeight={1.5}
                  textTransform="capitalize"
                  textAlign="center"
                  color="brand.100"
                  fontWeight={600}
                  fontFamily="BR Firma"
                >
                  studio scheduling
                </Heading>
                <Text
                  w="100%"
                  textAlign="center"
                  sx={{
                    "::first-letter": {
                      textTransform: "capitalize",
                    },
                  }}
                  fontSize="14px"
                  fontWeight={500}
                >
                  kindly select date and time for booking
                </Text>
              </VStack>

              <VStack
                w={["90%", "70%"]}
                mx="auto"
                gap="1rem"
                mt="2rem"
                // border="2px solid green"
              >
                <PrimaryDate<LookupModel>
                  control={control}
                  name="date"
                  label="Date"
                  error={errors.date}
                  placeholder="Enter Date"
                  min={new DateObject()}
                  format="ddd D MMMM, YYYY"
                />
                <PrimaryDate<LookupModel>
                  control={control}
                  name="time"
                  label="Time"
                  error={errors.time?.hour}
                  min={watch("date")}
                  format="hh:mm A"
                  isTime
                  placeholder="Enter Time"
                  defaultValue={watch("date")}
                />

                <VStack
                  w="100%"
                  alignItems="flex-start"
                  mt="20px"
                  spacing={2}
                  display="none"
                >
                  <Text
                    fontWeight={600}
                    fontSize="18px"
                    sx={{
                      "::first-letter": {
                        textTransform: "uppercase",
                      },
                    }}
                  >
                    additional services
                  </Text>

                  {singleService?.additionalServices?.map((x) => (
                    <Checkbox textTransform="capitalize" key={x.id}>
                      {x.name} -{" "}
                      <span style={{ fontWeight: 600 }}>
                        {Naira(x.price as number)} NGN
                      </span>
                    </Checkbox>
                  ))}

                  {/* <Checkbox textTransform="capitalize">
                    sound mixer -{" "}
                    <span style={{ fontWeight: 600 }}>1000 NGN</span>
                  </Checkbox> */}
                </VStack>
              </VStack>

              <Box w="40%" mx="auto" mt="2rem" h="50px">
                <SubmitButton
                  isLoading={isSubmitting}
                  textContent="Proceed"
                  isValid={isValid}
                />
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ScheduleDateTime;
