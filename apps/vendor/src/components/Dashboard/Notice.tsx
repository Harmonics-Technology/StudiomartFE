import { Box, Button, Flex, Icon, Image, Text, VStack } from "@chakra-ui/react";
import { UserContext } from "@components/Context/UserContext";
import { useRouter } from "next/router";
import { useContext } from "react";
import { BsExclamationCircleFill } from "react-icons/bs";
import TopPage from "src/utils/TopPage";

const Notice = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  return (
    <div>
      <Box>
        <TopPage
          page={`${user?.lastName}!`}
          details={"Welcome to your dashboard"}
          right={false}
        />
      </Box>

      <Box w="93%" mx="auto" my="auto">
        <Flex
          bgColor="rgba(220, 38, 38, 0.1)"
          border="1px solid #DC2626"
          borderRadius="15px"
          padding="1.5rem"
          gap="1rem"
          my="2rem"
        >
          <Icon as={BsExclamationCircleFill} fontSize="30px" color="#DC2626" />
          <VStack align="flex-start" spacing={0} gap=".6rem">
            <Text fontSize="20px" fontWeight="500" mb="0">
              Notice!
            </Text>
            <Text fontSize="18px" fontWeight="400" mb="0">
              It is Mandatory that you complete your profile and add your bank
              details before you transact on this platform
            </Text>

            <Button
              bgColor="brand.100"
              color="white"
              h="2.8rem"
              onClick={() => router.push("/account/studio-kyc-information")}
            >
              Complete Profile
            </Button>
          </VStack>
        </Flex>
        <Flex
          bgColor="white"
          borderRadius="15px"
          overflow="hidden"
          minH="30rem"
          justify="center"
          align="center"
        >
          <Box>
            <Image
              w="full"
              objectFit="cover"
              src="/assets/board.png"
              alt="image"
              bgColor="white"
            />
          </Box>
        </Flex>
      </Box>
    </div>
  );
};

export default Notice;
