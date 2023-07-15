import {
  Box, Button, Flex,
  Text, useDisclosure
} from "@chakra-ui/react";
import { useContext } from "react";
// import ModalWrapper from "ui/Components/utils/ModalWrapper";
import { UserContext } from "@components/Context/UserContext";
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
  const { device } = useContext(UserContext);
  //
  return (
    <Box bgColor="white">
      <Flex
        justify="space-between"
        align={{ base: "start", md: "center" }}
        w="100%"
        mx="auto"
        py=".7rem"
        px={{ base: "1.5rem", md: "2.5rem" }}
        flexDirection={{ base: "column", md: "row" }}
      >
        <Box fontFamily="BR Firma">
          <Text fontSize="1.5rem" fontWeight="600" mb=".2rem">
            {page}
          </Text>
          <Text>{details}</Text>
        </Box>
        {right && (
          <Button
            bgColor="brand.100"
            color="white"
            p={{ base: "1.5rem", md: "0 2rem" }}
            w={{ base: "2rem", md: "fit-content" }}
            minW={{ base: "0", md: "inherit" }}
            h={{ base: "2rem", md: "3rem" }}
            borderRadius={{ base: "50%", md: "5px" }}
            onClick={onOpen}
          >
            {device == "Mobile device" ? "+" : "Add Services"}
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
