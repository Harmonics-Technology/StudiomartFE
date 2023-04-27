import {
  Box,
  Button,
  Text,
  Flex,
  Spacer,
  HStack,
  Select,
  Image,
  Grid,
  Hide,
  Textarea,
  Heading,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import DashboardBanner from "./DashboardBanner";
import TopPage from "src/utils/TopPage";
import React from "react";
import data from "./data.js";
import { ArrowBackIcon, ArrowForwardIcon, AddIcon } from "@chakra-ui/icons";
import ServicesCard from "./ServicesCard";
import OrdersTop from "./OrdersTop";
import PrimaryInput from "src/utils/PrimaryInput";
import SubHeading from "./SubHeading";

export const MainDashboard = () => {
  const size = ["xs"];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      <Modal
        size={size}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent fontFamily="DM Sans', sans-serif">
          <ModalHeader fontSize="20px" fontWeight="500">
            Add Services
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel fontSize="18px" fontWeight="400">
                Services Name
              </FormLabel>
              <Input
                ref={initialRef}
                fontSize="16px"
                fontWeight="400"
                placeholder="Bridal Make-up"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel fontSize="18px" fontWeight="400">
                Services Category
              </FormLabel>
              <Select placeholder="Select category">
                <option>Makeup studio</option>
                <option>Gele studio</option>
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel fontSize="18px" fontWeight="400">
                Services Price
              </FormLabel>
              <Input
                fontSize="16px"
                fontWeight="400"
                placeholder="Enter Price"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel fontSize="18px" fontWeight="400">
                Sevice Details
              </FormLabel>
              <Textarea h="10rem" />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel fontSize="18px" fontWeight="400">
                Upload images
              </FormLabel>
              <Grid templateColumns="repeat(4, 1fr)" gap={1}>
                <Box
                  w="100%"
                  h="10"
                  border="1px solid #AFAFAF"
                  borderRadius="md"
                >
                  <AddIcon mx="6" my="3" />
                </Box>
                <Box
                  w="100%"
                  h="10"
                  border="1px solid #AFAFAF"
                  borderRadius="md"
                >
                  <AddIcon mx="6" my="3" />
                </Box>
                <Box
                  w="100%"
                  h="10"
                  border="1px solid #AFAFAF"
                  borderRadius="md"
                >
                  <AddIcon mx="6" my="3" />
                </Box>
                <Box
                  w="100%"
                  h="10"
                  border="1px solid #AFAFAF"
                  borderRadius="md"
                >
                  <AddIcon mx="6" my="3" />
                </Box>
              </Grid>
            </FormControl>
            <Flex
              justifyContent="space-between"
              mt="2"
              fontSize="10px"
              fontWeight="500"
            >
              <Box>
                <Text>*First image will be set as service cover</Text>
              </Box>
              <Box>
                <Text color="brand.100">Add more</Text>
              </Box>
            </Flex>
          </ModalBody>

          <ModalFooter justifyContent="center" gap="3" mt="-6">
            <Button onClick={onClose} w="8rem" fontSize="14px" fontWeight="700">
              Cancel
            </Button>
            <Button
              bgColor="brand.100"
              color="white"
              fontSize="14px"
              fontWeight="700"
              w="8rem"
            >
              List Service
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box>
        <Box>
          <TopPage
            page={"Good Day Adebayo!"}
            details={"Welcome to your dashboard"}
            right={true}
            clickFunction={onOpen}
          />
        </Box>
        <DashboardBanner />

        <SubHeading />

        <OrdersTop />
        <ServicesCard />
      </Box>
    </>
  );
};
