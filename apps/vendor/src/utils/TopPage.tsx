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
import React, { useContext } from "react";
// import ModalWrapper from "ui/Components/utils/ModalWrapper";
import AddingOptionsModal from "@components/Modals/AddingOptionsModal";
import { ServiceTypeViewListStandardResponse } from "src/services";
import { UserContext } from "@components/Context/UserContext";

interface TopPageProps {
  page: string;
  details: string;
  right: boolean;
  serviceTypes?: ServiceTypeViewListStandardResponse;
}

function TopPage({ page, details, right, serviceTypes }: TopPageProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const{device} = useContext(UserContext)
  console.log(device)
  return (
    <Box bgColor="white">
      <Flex
        justify="space-between"
        align="center"
        w="100%"
        mx="auto"
        py=".7rem"
        px="2.5rem"
        // flexDirection={{ base: 'column', lg: 'row'}}
      >
        <Box fontFamily="BR Firma">
          <Text fontSize="1.5rem" fontWeight="600" mb=".2rem">
            {page}
          </Text>
          <Text>{details}</Text>
        </Box>
        {right && (
          <Button bgColor="brand.100" color="white" p={{base: "1.5rem", lg:"0 2rem"}} w={{base:'2rem', lg:'fit-content'}} minW={{base:'0', lg:'inherit'}} h={{base:'2rem', lg:'3rem'}} borderRadius={{base:'50%', lg:'5px'}} onClick={onOpen} >
            {device == 'Mobile device' ? '+' : 'Add Services'}
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
