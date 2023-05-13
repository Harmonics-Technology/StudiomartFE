import {
  Box,
  Flex,
  HStack,
  Square,
  Text,
  VStack,
  Image,
  Grid,
  Divider,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { BsExclamationCircleFill } from 'react-icons/bs';
import BookingText from 'src/utils/BookingText';
import RejectBooking from 'src/utils/RejectBooking';
import { Responses } from 'src/utils/Responses';
import { ModalWrapper } from 'ui';

interface DetailsProps {
  response: string;
  id: any;
  showAlert: any;
  closed: any;
  alertText: any;
}
function BookingDetails({
  response,
  id,
  showAlert,
  alertText,
  closed,
}: DetailsProps) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { isOpen: open, onClose: close, onOpen: onOpens } = useDisclosure();
  console.log({ id });
  const [loading, setLoading] = useState(false);

  response = 'pending';
  function acceptUserBooking(id: string) {
    setLoading(true);
    setTimeout(() => {
      closed();
      alertText(
        'You have successfully accept booking Folashade would be notify to make payment'
      );
      showAlert(true);
      setLoading(false);
    }, 3000);
  }

  // function rejectUserBooking() {
  //   setLoading(true);
  //   setTimeout(() => {
  //     closed();
  //     alertText('You have successfully rejected booking Folashade');
  //     showAlert(true);
  //     setLoading(false);
  //   }, 3000);
  // }
  return (
    <Box
      w="full"
      borderRadius="8px"
      bgColor="white"
      overflow="hidden"
      mb="2rem"
    >
      <Responses response={response} />
      <Box w="85%" mx="auto">
        <Flex justify="space-between" align="center" my="2rem">
          <Text fontSize="1.5rem">Booking Details</Text>
          <Box
            padding=".2rem 1rem"
            width="fit-content"
            h="fit-content"
            borderRadius="8px"
            cursor="pointer"
            bgColor={
              response == 'pending'
                ? '#FDF3CA'
                : response == 'accept'
                ? '#D5E2F9'
                : response == 'progress'
                ? '#FDF3CA'
                : response == 'cancel'
                ? '#FDC1C1'
                : 'white'
            }
            fontSize="10px"
          >
            {response == 'pending'
              ? 'Pending Confirmation'
              : response == 'accept'
              ? 'Awaiting payment'
              : response == 'progress'
              ? 'In progress'
              : 'Cancelled'}
          </Box>
        </Flex>
        <VStack gap="2rem">
          <Box w="full">
            <Text fontWeight="500" fontSize="18px" mb=".8rem">
              Client Details
            </Text>
            <Box
              borderRadius="12px"
              border="1px solid"
              borderColor="gray.400"
              p="2rem"
            >
              <VStack gap="1rem" align="left">
                <BookingText top="Client ID/Email" bottom="Jenny10@gmail.com" />
                <BookingText
                  top="Client Phone Number"
                  bottom="+2347031363759"
                />
              </VStack>
            </Box>
          </Box>
          <Box w="full">
            <Text fontWeight="500" fontSize="18px" mb=".8rem">
              Service Details
            </Text>
            <Box
              borderRadius="12px"
              border="1px solid"
              borderColor="gray.400"
              p="2rem"
            >
              <VStack gap="1rem" align="left">
                <BookingText top="Service Name" bottom="Bridal Make-over" />
                <Box>
                  <Text fontWeight="500" mb=".3rem">
                    Service Image
                  </Text>
                  <HStack flexWrap="wrap">
                    <Square
                      size="4.5rem"
                      borderRadius="8px"
                      bgColor="gray"
                      overflow="hidden"
                    >
                      <Image
                        src="/assets/Bride4.png"
                        width="full"
                        h="full"
                        objectFit="cover"
                        alt=""
                      />
                    </Square>
                    <Square
                      size="4.5rem"
                      borderRadius="8px"
                      bgColor="gray"
                      overflow="hidden"
                    >
                      <Image
                        src="/assets/Bride1.png"
                        width="full"
                        h="full"
                        objectFit="cover"
                        alt=""
                      />
                    </Square>
                    <Square
                      size="4.5rem"
                      borderRadius="8px"
                      bgColor="gray"
                      overflow="hidden"
                    >
                      <Image
                        src="/assets/Bride2.png"
                        width="full"
                        h="full"
                        objectFit="cover"
                        alt=""
                      />
                    </Square>
                    <Square
                      size="4.5rem"
                      borderRadius="8px"
                      bgColor="gray"
                      overflow="hidden"
                    >
                      <Image
                        src="/assets/Bride3.png"
                        width="full"
                        h="full"
                        objectFit="cover"
                        alt=""
                      />
                    </Square>
                  </HStack>
                </Box>
                <BookingText
                  top="Service Description"
                  bottom="Here at House of Ewa, we offer full bridal makeover to make you stand out on your big day at pocket friendly rate. You can be rest assured and trust us to do a very good job."
                />
              </VStack>
            </Box>
          </Box>
          <Box w="full">
            <Text fontWeight="500" fontSize="18px" mb=".8rem">
              Payment Details
            </Text>
            <Box
              borderRadius="12px"
              border="1px solid"
              borderColor="gray.400"
              p="2rem"
            >
              <VStack gap="1rem" align="left">
                <Grid templateColumns="60% auto">
                  <BookingText top="Service Cost" bottom="₦45,000" />
                  <BookingText top="Transaction Fee" bottom="₦1,500" />
                </Grid>
                <Divider />
                <Grid templateColumns="60% auto">
                  <BookingText
                    top="Sub-Total"
                    bottom="₦45,000 + ₦1,500 (Transaction Fee)"
                  />
                  <BookingText
                    top="Total Cost"
                    bottom="₦46,500"
                    color="#1570FA"
                  />
                </Grid>
              </VStack>
            </Box>
          </Box>
          <HStack
            w="full"
            h="3rem"
            gap="2rem"
            mb="1rem !important"
            display={response == 'pending' ? 'flex' : 'none'}
          >
            <Button
              variant="outline"
              width="full"
              border="2px solid"
              h="full"
              onClick={onOpen}
            >
              Reject Booking
            </Button>
            <Button
              variant="outline"
              w="full"
              bgColor="#1570FA"
              color="white"
              h="full"
              onClick={() => acceptUserBooking('2')}
              isLoading={loading}
            >
              Accept Booking
            </Button>
          </HStack>
        </VStack>
      </Box>
      <ModalWrapper isOpen={isOpen} onClose={onClose}>
        <RejectBooking id={id} onClose={onClose} />
      </ModalWrapper>
    </Box>
  );
}

export default BookingDetails;
