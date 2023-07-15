import { Box } from "@chakra-ui/react";
import AllServices from "./AllServices";
import StudioInfo from "./StudioInfo";

const SingleStudioPages = ({ allService, studio }: any) => {
  return (
    <Box>
      <Box w="100%">
        <StudioInfo singleStudio={studio} />
      </Box>
      <Box w="100%">
        <AllServices allService={allService} />
      </Box>
    </Box>
  );
};

export default SingleStudioPages;
