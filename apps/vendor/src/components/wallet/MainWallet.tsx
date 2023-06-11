import {
  Box,
  HStack,
  Grid,
  VStack,
  Text,
  Heading,
  Checkbox,
  useDisclosure,
  Button,
  Image,
  Flex,
  Icon,
  FormLabel,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import NoticePage from 'src/utils/NoticePage';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { CurrencyField, Naira, Pagination, PrimaryInput } from 'ui';
import {
  BankAccount,
  Banks,
  PaymentService,
  TransactionView,
  TransactionViewPagedCollection,
  WalletView,
  WithdrawalModel,
} from 'src/services';
import RecentTransaction from './RecentTransaction';
import { WalletCard } from 'src/utils/WalletCard';
import { useRouter } from 'next/router';
import AddBankAccountModal from '@components/Modals/AddBankAccountModal';
import { TfiAngleDown } from 'react-icons/tfi';
import WithdrawalPin from '@components/Modals/WithdrawalPin';
import { UserContext } from '@components/Context/UserContext';
import toast from 'react-hot-toast';
import Notice from '@components/Dashboard/Notice';

interface WalletViewProps {
  banks: Banks[];
  bankAccounts: BankAccount[];
  userId: string;
  userQuestion: any;
  studioTransactions: TransactionViewPagedCollection;
  studioWallet: WalletView;
}
const validation = yup.object().shape({
  amount: yup.number().min(500, 'Minimum withdrawal amount is N500').required(),
  bankId: yup.string().required(),
  walletPin: yup.string().required(),
  securityQuestionAnswer: yup.string().required(),
  studioId: yup.string().required(),
});

const MainWallet = ({
  banks,
  bankAccounts,
  userId,
  userQuestion,
  studioTransactions,
  studioWallet,
}: WalletViewProps) => {
  const {
    handleSubmit,
    register,
    control,
    setValue,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<WithdrawalModel>({
    resolver: yupResolver(validation),
    mode: 'all',
  });

  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: opens, onOpen: open, onClose: closes } = useDisclosure();
  const [selectedBank, setSelectedBank] = useState<BankAccount>();
  const [showSelect, setShowSelect] = useState(false);
  const { currentStudioId } = useContext(UserContext);

  console.log({ banks });

  const selectBank = (value: BankAccount) => {
    setShowSelect((prev) => !prev);
    setSelectedBank(value);
    console.log({ value });
    setValue('bankId', value.id);
  };

  // console.log(watch("id"));

  const onSubmit = async (data: WithdrawalModel) => {
    // console.log({ data });
    try {
      const result = await PaymentService.withdrawFromWallet({
        requestBody: data,
      });
      if (result.status) {
        toast.success(
          'Your withdrawal is been proccessed, you will be notified once completed.'
        );
        router.reload();
        return;
      }
      toast.error(result.message as string);
      return;
    } catch (error: any) {
      toast.error(error?.body?.message || error?.message, {
        className: 'loginToast',
      });
    }
  };
  useEffect(() => {
    reset({
      studioId: currentStudioId,
    });
  }, []);
  return (
    <>
      {!userQuestion?.message ? (
        <Notice />
      ) : (
        <Box mb="3rem">
          <Box>
            <Box bgColor="white">
              <Flex
                flexDirection={{ base: 'column', md: 'row' }}
                justify="space-between"
                align={{ base: 'start', md: 'center' }}
                w="100%"
                mx="auto"
                py=".7rem"
                px="2.5rem"
              >
                <Box fontFamily="BR Firma">
                  <Text fontSize="1.5rem" fontWeight="600" mb=".2rem">
                    {'Wallet'}
                  </Text>
                  <Text>{'Here you see all your money transactions '}</Text>
                </Box>

                <Button
                  bgColor="brand.100"
                  color="white"
                  px="2rem"
                  onClick={open}
                >
                  Set up withdrawal pin
                </Button>
              </Flex>
            </Box>
          </Box>

          <Box mx="auto" mt="2rem" w="92%">
            <Grid
              templateColumns={{ base: '1fr', md: '1.8fr 1.1fr' }}
              gap="2rem"
            >
              <VStack align="flex-start" gap="2rem" spacing="0" minW="0">
                <HStack
                  w="full"
                  gap="1rem"
                  spacing="0"
                  overflowX={{ base: 'scroll', md: 'visible' }}
                  overflowY="hidden"
                  flexWrap="nowrap"
                  pb={{ base: '1rem', lg: '0' }}
                >
                  <WalletCard
                    title="Wallet Balance"
                    amount={Naira((studioWallet?.balance as number) || 0)}
                    image="/assets/wallettab.png"
                  />
                  <WalletCard
                    title="Total Income"
                    amount={Naira((studioWallet?.totalIncome as number) || 0)}
                    image="/assets/wallettab.png"
                  />
                  <WalletCard
                    title="On hold"
                    amount={Naira((studioWallet?.balanceOnHold as number) || 0)}
                    image="/assets/wallettab.png"
                  />
                </HStack>

                <Box
                  w="full"
                  borderRadius="8px"
                  p="2rem 1.5rem"
                  bgColor="white"
                  minW="0"
                  overflow="hidden"
                >
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Heading fontSize="20px" pb="1.5rem">
                      Withdrawal Information
                    </Heading>
                    <VStack align="flex-start" spacing={0} gap="1.2rem">
                      <CurrencyField<WithdrawalModel>
                        placeholder="₦0.00"
                        defaultValue={''}
                        register={register}
                        error={errors.amount}
                        name={'amount'}
                        control={control}
                        label="Enter amount to withdraw"
                      />
                      <Box w="full" pos="relative">
                        <Box pos="relative" zIndex="890">
                          <FormLabel
                            w="100%"
                            textTransform="capitalize"
                            mb="5px"
                            fontSize=".8rem"
                          >
                            Withdrawal destination
                          </FormLabel>
                          <Flex
                            border="1px solid"
                            borderColor="gray.400"
                            w="100%"
                            h="2.8rem"
                            borderRadius="4px"
                            px="1rem"
                            align="center"
                            cursor="pointer"
                            onClick={() => setShowSelect((prev) => !prev)}
                          >
                            {selectedBank ? (
                              <HStack
                                justify="space-between"
                                fontSize="15px"
                                w="full"
                              >
                                <Text mb="0">
                                  {`${selectedBank.bankName} - ${selectedBank.accountNumber}`}
                                </Text>
                                <Text mb="0">{selectedBank.accountName}</Text>
                              </HStack>
                            ) : (
                              <HStack justify="space-between" w="full">
                                <Text mb="0" fontSize="14px">
                                  Click here to select bank
                                </Text>
                                <Icon as={TfiAngleDown} fontSize=".8rem" />
                              </HStack>
                            )}
                          </Flex>
                        </Box>
                        {showSelect && (
                          <Box
                            w="full"
                            bgColor="white"
                            // borderRadius="8px"
                            boxShadow="md"
                            pos="absolute"
                            zIndex="888"
                            top="10%"
                          >
                            <Box p="4rem 0 0rem">
                              {bankAccounts.map((x: BankAccount) => (
                                <Flex
                                  key={x.id}
                                  px="1rem"
                                  cursor="pointer"
                                  h="2.8rem"
                                  align="center"
                                  w="full"
                                  onClick={() => selectBank(x)}
                                  _hover={{
                                    bgColor: 'brand.100',
                                    color: 'white',
                                  }}
                                >
                                  <HStack
                                    justify="space-between"
                                    fontSize="15px"
                                    w="full"
                                  >
                                    <Text mb="0">
                                      {`${x.bankName} - ${x.accountNumber}`}
                                    </Text>
                                    <Text mb="0">{x.accountName}</Text>
                                  </HStack>
                                </Flex>
                              ))}
                            </Box>
                          </Box>
                        )}
                        <Checkbox
                          size="md"
                          onChange={onOpen}
                          mt=".4rem"
                          fontSize=".8rem"
                          colorScheme="blue"
                        >
                          Withdraw to another account
                        </Checkbox>
                      </Box>
                      <PrimaryInput<WithdrawalModel>
                        label="Withdrawal pin"
                        placeholder="Enter your pin"
                        name="walletPin"
                        error={errors.walletPin}
                        register={register}
                      />
                      <PrimaryInput<WithdrawalModel>
                        label={`${userQuestion?.message}?`}
                        placeholder=" "
                        name="securityQuestionAnswer"
                        error={errors.securityQuestionAnswer}
                        register={register}
                      />
                      <HStack justifyContent="center" w="full">
                        <Button
                          isDisabled={!isValid}
                          bgColor="brand.100"
                          color="white"
                          width="100%"
                          type="submit"
                          h="3.2rem"
                          // onClick={onOpen}
                          isLoading={isSubmitting}
                        >
                          Withdraw
                        </Button>
                      </HStack>
                    </VStack>
                  </form>
                </Box>
              </VStack>
              <Box
                w="full"
                borderRadius="8px"
                p="2rem 1.5rem"
                bgColor="white"
                minW="0"
                overflow="hidden"
              >
                <Text fontWeight="600" fontSize="18px">
                  Recent Transactions
                </Text>
                <VStack h="full" justify="space-between" pb="3rem">
                  {studioTransactions?.value?.length == 0 ? (
                    <Flex w="70%" h="full" overflow="hidden" align="center">
                      <Image src="/assets/empty.png" alt="image" w="full" />
                    </Flex>
                  ) : (
                    <VStack
                      spacing={0}
                      gap="1.9rem"
                      w="full"
                      align="flex-start"
                    >
                      {studioTransactions?.value?.map(
                        (info: TransactionView) => (
                          <RecentTransaction
                            key={info.bookingId}
                            mode={info.title ? 'payment' : 'withdrawal'}
                            message={`${info.description} from ${info.user?.firstName}`}
                            amount={info.amount as unknown as number}
                            date={info.booking?.date}
                            time={info.booking?.time}
                          />
                        )
                      )}
                    </VStack>
                  )}
                  <HStack justifyContent="center" mt="2rem" w="full">
                    <Pagination data={studioTransactions} />
                  </HStack>
                </VStack>
              </Box>
            </Grid>
          </Box>
          <AddBankAccountModal
            banks={banks}
            close={onClose}
            open={isOpen}
            userId={userId}
          />
          <WithdrawalPin close={closes} open={opens} userId={userId} />
        </Box>
      )}
    </>
  );
};

export default MainWallet;
