import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import AllServices from "./AllServices";
import StudioInfo from "./StudioInfo";

const SingleStudioPages = ({ allService, studio }: any) => {
  return (
    <Flex>
      <Box w="25%" h="90vh" overflow="hidden auto" bgColor="transparent">
        <StudioInfo singleStudio={studio} />
      </Box>
      <Box w="75%">
        <AllServices allService={allService} />
      </Box>
    </Flex>
  );
};

export default SingleStudioPages;
