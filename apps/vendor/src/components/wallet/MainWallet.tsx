import {
  Box,
  HStack,
  Grid,
  GridItem,
  VStack,
  Flex,
  Image,
  Text,
  SimpleGrid,
  Spacer,
  Avatar,
} from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import NoticePage from 'src/utils/NoticePage';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { PrimaryInput } from 'ui';
import { WalletView } from 'src/services';
import RecentTransaction from './RecentTransaction';
import walletdata from './studiodata';
import WalletCard from './WalletCard';
import studiodata from './studiodata';

interface WalletViewProps {
  walletdMetrics: WalletView;
}
// const validation = yup.object().shape({
//   email: yup.string().email().required(),
//   password: yup.string().password(),
// });

// const {
//   handleSubmit,
//   handleSubmit: VendorSubmit,
//   register,
//   formState: { errors, isSubmitting },
// } = useForm<LoginModel>({
//   resolver: yupResolver(validation),
//   mode: 'all',
// });
const MainWallet = () => {
  return (
    <div>
      <Box>
        <NoticePage
          page={`Wallet`}
          details={'Here you see all your money transactions '}
          right={false}
          clickFunction={undefined}
        />
      </Box>

      <Box ml="3rem" mt="2rem">
        <Grid templateColumns="repeat(4, 1fr)" gap="6">
          <GridItem as="main" h="20rem">
            {/* {studiodata.TransactionCard.map((info) => { */}
            <HStack my="auto" gap="4" ml="3">
              <Flex bgColor="white" borderRadius="8px" w="18rem">
                <Box ml="2" alignSelf="center" my="4">
                  <Image
                    src="/assets/wallettab.png"
                    alt="image"
                    h="60px"
                    w="60px"
                    ml="4"
                  />
                </Box>
                <VStack spacing={-5} align="start" ml="" mt="4px" w="10rem">
                  <Text
                    pl="4"
                    pt="4"
                    fontSize="16px"
                    fontWeight="400"
                    mt="-1.5"
                  >
                    Wallet Balance
                  </Text>

                  <Text fontSize="32px" w="700" pl="4" mt="-2.5">
                    ₦0.00
                  </Text>
                </VStack>
              </Flex>
              <Flex bgColor="white" borderRadius="8px" w="18rem">
                <Box ml="2" alignSelf="center" my="4">
                  <Image
                    src="/assets/wallettab.png"
                    alt="image"
                    h="60px"
                    w="60px"
                    ml="4"
                  />
                </Box>
                <VStack spacing={-5} align="start" ml="" mt="4px" w="10rem">
                  <Text
                    pl="4"
                    pt="4"
                    fontSize="16px"
                    fontWeight="400"
                    mt="-1.5"
                  >
                    Total Income
                  </Text>

                  <Text fontSize="32px" w="700" pl="4" mt="-2.5">
                    ₦0.00
                  </Text>
                </VStack>
              </Flex>

              {/* <WalletCard
                key={info.id}
                title={info.title}
                amount={info.amount}
              /> */}
            </HStack>
            
            <form>
              <Text pl="1rem" mt="3rem">Withdrawal Information</Text>
              {/* <PrimaryInput
                label="Enter amount to withdraw"
                type="text"
                placeholder="Enter your lastname"
                name="lastName"
                error={errors.lastName}
                register={register}
                // defaultValue={newUser?.lastName}
              /> */}
            </form>
          </GridItem>
          <GridItem as="aside" w="22rem" borderRadius="8px" bgColor="white">
            <Box bgColor="white">
              <Text ml="5" mt="5">
                Recent Transactions
              </Text>
              {walletdata.Transactions.map((info) => (
                <RecentTransaction
                  key={info.id}
                  mode={info.mode}
                  message={info.message}
                  amount={info.amount}
                  date={info.date}
                  time={info.time}
                />
              ))}
              <Text
                fontWeight="500"
                fontSize="12px"
                color="brand.100"
                textAlign="center"
                py="2"
              >
                VIEW MORE TRANSACTIONS
              </Text>
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </div>
  );
};

export default MainWallet;
