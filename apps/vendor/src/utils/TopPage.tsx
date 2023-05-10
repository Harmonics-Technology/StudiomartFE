import {
  Box,
  Flex,
  Text,
  Button,
  Circle,
  Icon,
  useDisclosure,
} from '@chakra-ui/react';
import { AiOutlinePlus } from 'react-icons/ai';
import React from 'react';
// import ModalWrapper from "ui/Components/utils/ModalWrapper";
import AddingOptionsModal from '@components/Modals/AddingOptionsModal';

interface TopPageProps {
  page: string;
  details: string;
  right: boolean;
  studios?: any;
}

function TopPage({ page, details, right, studios }: TopPageProps) {
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
          // <Button
          //   bgColor="brand.100"
          //   color="white"
          //   px="2rem"
          //   onClick={clickFunction}
          // >
          //   Add Services
          // </Button>
          <Flex gap={3}>
            <Button
              bgColor="#E5E5E5"
              color="brand.100"
              px="2rem"
              colorScheme="brand.100"
              variant="outline"
              onClick={onOpen}
            >
              Add Studio
            </Button>
            <Button
              bgColor="brand.100"
              color="white"
              px="2rem"
              onClick={onOpen}
            >
              Add Services
            </Button>
          </Flex>
          // <Circle
          //   size="3.75rem"
          //   bgColor="brand.100"
          //   color="white"
          //   onClick={onOpen}
          // >
          //   <Icon as={AiOutlinePlus} fontSize="2rem" />
          // </Circle>
        )}
        <AddingOptionsModal
          isOpen={isOpen}
          onClose={onClose}
          studios={studios}
        />
      </Flex>
    </Box>
  );
}

export default TopPage;
