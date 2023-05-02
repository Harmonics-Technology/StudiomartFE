import React from "react";
import NoticePage from "src/utils/NoticePage";
import { Box, Button, Text, Flex, Image } from "@chakra-ui/react";

const notice = () => {
  return (
    <div>
      <Box>
        <NoticePage
          page={"Good Day H.O.E"}
          details={"Welcome to your dashboard"}
          right={true}
          clickFunction={undefined}
        />
      </Box>

      <Box w="90%" mx="auto" my="auto">
        <Flex
          bgColor="rgba(220, 38, 38, 0.1)"
          border="1px solid #DC2626"
          borderRadius="18px"
          mt="6"
        >
          <Box>
            <Image
              src="/assets/Vector.png"
              alt="image"
              h="30px"
              mt="4"
              ml="2"
            />
          </Box>
          <Box>
            <Text fontSize="20px" fontWeight="500" ml="2" mt="4">
              Notice!
            </Text>
            <Text fontSize="18px" fontWeight="400" mt="-3" ml="2">
              It is Mandatory that you complete your profile and add your bank
              details before you transact on this platform
            </Text>
            <Button bgColor="brand.100" color="white" ml="4" mb="4">
              Complete Profile
            </Button>
          </Box>
        </Flex>
        <Box>
          <Image
            mt="6"
            w="full"
            objectFit="cover"
            src="/assets/empty.png"
            alt="image"
            bgColor="white"
          />
        </Box>
      </Box>
    </div>
  );
};

export default notice;
