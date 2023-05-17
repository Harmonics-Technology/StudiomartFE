import {
  Box,
  Flex,
  Text,
  Button,
  Circle,
  Icon,
  useDisclosure,
} from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
import React from "react";
// import ModalWrapper from "ui/Components/utils/ModalWrapper";
import AddingOptionsModal from "@components/Modals/AddingOptionsModal";
import { ServiceTypeViewListStandardResponse } from "src/services";

interface TopPageProps {
  page: string;
  details: string;
  right: boolean;
  serviceTypes?: ServiceTypeViewListStandardResponse;
}

function TopPage({ page, details, right, serviceTypes }: TopPageProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box bgColor="white">
      <Flex
        justify="space-between"
        align="center"
        w="100%"
        mx="auto"
        py=".7rem"
        px="2rem"
      >
        <Box fontFamily="BR Firma">
          <Text fontSize="1.5rem" fontWeight="600" mb=".2rem">
            {page}
          </Text>
          <Text>{details}</Text>
        </Box>
        {right && (
          <Button bgColor="brand.100" color="white" px="2rem" onClick={onOpen}>
            Add Services
          </Button>
        )}
        <AddingOptionsModal
          isOpen={isOpen}
          onClose={onClose}
          serviceTypes={serviceTypes}
        />
      </Flex>
    </Box>
  );
}

export default TopPage;
