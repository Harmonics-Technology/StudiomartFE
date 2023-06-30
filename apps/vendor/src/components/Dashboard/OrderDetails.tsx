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
} from "@chakra-ui/react";
import React from "react";
import { BsExclamationCircleFill } from "react-icons/bs";
import {BookingText, ModalWrapper} from "ui";

interface DetailsProps {
  response: string;
  id: any;
}
function OrderDetails({ response, id }: DetailsProps) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  console.log({ id });
  return (
    <Box
      w="full"
      borderRadius="8px"
      bgColor="white"
      overflow="hidden"
      mb="2rem"
    >
      {response == "pending" ? (
        <Flex align="center" bgColor="#FDF3CA" justify="center" py=".8rem">
          <BsExclamationCircleFill color="#FACC15" fontSize="2rem" />
          <Text ml="1rem" mb="0">
            Booking Pending Confirmation
          </Text>
        </Flex>
      ) : null}
      <Box w="85%" mx="auto">
        <Flex justify="space-between" align="center" my="2rem">
          <Text fontSize="1.5rem">Booking Details</Text>
          <Box
            padding=".2rem 1rem"
            width="fit-content"
            h="fit-content"
            borderRadius="8px"
            cursor="pointer"
            bgColor="#FDF3CA"
            fontSize="10px"
          >
            Pending Confirmation
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
                <BookingText top="Client ID/Email" bottom="Jenny10@gmail.com" />
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
                <BookingText top="Client ID/Email" bottom="Jenny10@gmail.com" />
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
                      <Image width="full" h="full" objectFit="cover" alt="" />
                    </Square>
                    <Square
                      size="4.5rem"
                      borderRadius="8px"
                      bgColor="gray"
                      overflow="hidden"
                    >
                      <Image width="full" h="full" objectFit="cover" alt="" />
                    </Square>
                  </HStack>
                </Box>
                <BookingText
                  top="Client ID/Email"
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
                  <BookingText
                    top="Client ID/Email"
                    bottom="Jenny10@gmail.com"
                  />
                  <BookingText
                    top="Client ID/Email"
                    bottom="Jenny10@gmail.com"
                  />
                </Grid>
                <Divider />
                <Grid templateColumns="60% auto">
                  <BookingText
                    top="Client ID/Email"
                    bottom="₦45,000 + ₦1,500 (Transcation Fee)"
                  />
                  <BookingText top="Client ID/Email" bottom="₦46,500" />
                </Grid>
              </VStack>
            </Box>
          </Box>
          <HStack w="full" h="3rem" gap="2rem" mb="1rem !important">
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
              bgColor="brand.100"
              color="white"
              h="full"
            >
              Accept Booking
            </Button>
          </HStack>
        </VStack>
      </Box>
      <ModalWrapper isOpen={isOpen} onClose={onClose}>
        {/* <RejectBooking onClose={onClose} /> */}
      </ModalWrapper>
    </Box>
  );
}

export default OrderDetails;
