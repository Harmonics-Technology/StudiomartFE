import { Box, Stack, Flex, HStack, Text } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import AccountSideBar from "./AccountSideBar";
import TopPage from "../../utils/TopPage";
import { BankCard } from "src/utils/BankCard";

const AccountContainer = ({
  children,
  bankAccounts,
}: {
  children: ReactNode;
  bankAccounts?: any;
}) => {
  return (
    <Box w="full">
      <TopPage
        page={"Account"}
        details={
          "Kindly complete your profile with this form to gain access to your dashboard, ensure you go through all the steps"
        }
        right={false}
      />
      <Flex
        bgColor="white"
        align="center"
        minH="60vh"
        w="90%"
        mx="auto"
        my="3rem"
      >
        <Box w="full">
          {bankAccounts?.length > 0 && (
            <Box p="2rem">
              <Text fontWeight="600">Saved Banks</Text>
              <HStack gap="1rem">
                {bankAccounts?.map((x: any) => (
                  <BankCard
                    key={x.id}
                    bankName={x.bankName}
                    accountNumber={x.accountNumber}
                    accountName={x.accountName}
                    id={x.id}
                  />
                ))}
              </HStack>
            </Box>
          )}
          <Stack
            direction={{ base: "column", lg: "row" }}
            spacing={0}
            gap="2rem"
            width="90%"
            ml={{ base: "1rem", lg: "5rem" }}
            py="5rem"
          >
            <AccountSideBar />
            <Box
              w={{ base: "full", lg: "45%" }}
              fontFamily='"DM Sans", sans-serif'
            >
              {children}
            </Box>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};

export default AccountContainer;
