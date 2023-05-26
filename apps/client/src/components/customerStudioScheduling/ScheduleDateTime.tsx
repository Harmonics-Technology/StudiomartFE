import {
  Box,
  Button,
  Checkbox,
  Grid,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { BookingService, LookupModel } from 'src/services';
import { BackToPage, PrimaryDate, SubmitButton } from 'ui';

const ScheduleDateTime = () => {
  const router = useRouter();
  const [bookingStatus, setBookingStatus] = useState(null);

  const onBook = async (data: LookupModel) => {
    // try {
    //   const result = await BookingService.dateTimeLookup ({ requestBody: data });
    //   console.log({ result });
    //   if (result.status)
    //     return;
    //   }
    //   toast.error(result.message as string);
    //   return;
    // } catch (error: any) {
    //   toast.error(error?.body?.message || error?.message);
    // }
  };
  return (
    <Box w=" 100%" minH="100vh" border="2px hidden red" py="30px">
      <Box border="2px hidden blue" w={['90%', '60%']} mx="auto">
        <BackToPage name="Back to home page" />

        <Box border="2px hidden green" w="100%" pt="40px">
          <Box w=" 100%" bg="rgba(21, 112, 250, 0.1)" py="30px">
            <form>
              <VStack w="100%" spacing={0.5}>
                <Heading
                  w="100%"
                  lineHeight={1.5}
                  textTransform="capitalize"
                  textAlign="center"
                  color="brand.100"
                  fontWeight={600}
                >
                  studio scheduling
                </Heading>
                <Text
                  w="100%"
                  textAlign="center"
                  sx={{
                    '::first-letter': {
                      textTransform: 'capitalize',
                    },
                  }}
                  fontSize="14px"
                  fontWeight={500}
                >
                  kindly select date and time for booking
                </Text>
              </VStack>

              <Box
                w={['90%', '70%']}
                mx="auto"
                // border="2px solid green"
              >
                <PrimaryDate
                  label="date"
                  type="date"
                  fontWeight={600}
                  borderColor="rgba(21, 112, 250, 1)"
                />

                <Grid
                  templateColumns={['repeat(1,1fr)', 'repeat(2,1fr)']}
                  columnGap={[0, '20px']}
                >
                  <PrimaryDate
                    label="start time"
                    type="time"
                    fontWeight={600}
                  />

                  <PrimaryDate label="end time" type="time" fontWeight={600} />
                </Grid>

                <VStack w="100%" alignItems="flex-start" mt="20px" spacing={2}>
                  <Text
                    fontWeight={600}
                    fontSize="18px"
                    sx={{
                      '::first-letter': {
                        textTransform: 'uppercase',
                      },
                    }}
                  >
                    additional services
                  </Text>

                  <Checkbox textTransform="capitalize">
                    studio engineer -{' '}
                    <span style={{ fontWeight: 600 }}>1000 NGN</span>
                  </Checkbox>

                  <Checkbox textTransform="capitalize">
                    sound mixer -{' '}
                    <span style={{ fontWeight: 600 }}>1000 NGN</span>
                  </Checkbox>
                </VStack>
              </Box>

              <Box
                border="2px solid rgba(21, 112, 250, 1)"
                w="160px"
                h="50px"
                mx="auto"
                mt={['30px', '50px']}
                backgroundColor="rgba(21, 112, 250, 1)"
                borderRadius="4px"
                transition="0.5s linear"
                _hover={{
                  backgroundColor: 'transparent',
                }}
              >
                {/* <Button
                  type="submit"
                  w="100%"
                  h="100%"
                  color="white"
                  backgroundColor="transparent"
                  transition="0.5s linear"
                  _hover={{
                    color: 'rgba(21, 112, 250, 1)',
                    backgroundColor: 'transparent',
                  }}
                >
                  Proceed
                </Button> */}
                <SubmitButton isLoading={undefined} textContent="  Proceed" />
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ScheduleDateTime;
