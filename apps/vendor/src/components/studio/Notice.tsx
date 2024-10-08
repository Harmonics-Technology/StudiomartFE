import React, { useContext } from 'react';
import NoticePage from 'src/utils/NoticePage';
import { Box, Button, Text, Flex, Image } from '@chakra-ui/react';
import Link from 'next/link';
import { UserContext } from '@components/Context/UserContext';

const Notice = () => {
  const { user } = useContext(UserContext);
  return (
    <div>
      <Box>
        <NoticePage
          page={`${user?.lastName}!`}
          details={'Welcome to your dashboard'}
          right={false}
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
            <Link href="/account/basic-information">
              <Button bgColor="brand.100" color="white" ml="4" mb="4">
                Complete Profile
              </Button>
            </Link>
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

export default Notice;
