import {
  Box,
  Text,
  useDisclosure,
  Tr,
  Tfoot,
  Td,
  Tbody,
  Th,
  Thead,
  TableCaption,
  Table,
  TableContainer,
  Image,
  Button,
} from '@chakra-ui/react';
import {
  AlertBox,
  CustomTable,
  TableData,
  TableStatus,
  TableWithSub,
} from 'ui';
import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from '@components/Context/UserContext';
import TopPage from '../../utils/TopPage';
import {
  StudioView,
  StudioViewPagedCollectionStandardResponse,
} from 'src/services';

interface StudioProps {
  studios: StudioViewPagedCollectionStandardResponse;
}

export const MainStudio = ({ studios }: StudioProps) => {
  console.log({ studios });
  const size = ['xs'];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { user } = useContext(UserContext);
  // console.log({ user });

  return (
    <>
      <Box>
        <Box>
          <TopPage
            page={`${user?.lastName}!`}
            details={'Welcome to your dashboard'}
            right={false}
            studios={studios}
          />
        </Box>
        <Box px="2rem" my="2rem">
          {studios?.data?.value?.map((x: StudioView, i: any) => (
            <Box
              minH="14rem"
              w="23rem"
              bg="white"
              borderRadius="10px"
              key={i}
              overflow="hidden"
              // boxShadow="md"
            >
              <Image
                h="14rem "
                w="100%"
                objectFit="cover"
                src={x.coverPhoto || '/assets/007.jpg'}
                alt="image"
                bgColor="white"
              />
              <Box
                h="fit-content"
                w="100%"
                textAlign="left"
                p="1rem 1rem 1.5rem"
              >
                <Text
                  fontWeight="600"
                  fontSize="20px"
                  mb=".5rem"
                  fontFamily="BR Firma"
                >
                  {x.name}
                </Text>
                <Text fontSize="15px" fontWeight="400" fontFamily="BR Firma">
                  {x.description}
                </Text>

                <Button
                  onClick={() => router.push(`/studio/${x.id}`)}
                  w="100%"
                  bgColor="#AFAFAF"
                  cursor="default"
                  colorScheme="blue"
                  // onClick={() => deactivateService(x.id)}
                  fontFamily="BR Firma"
                >
                  View Studio
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};
