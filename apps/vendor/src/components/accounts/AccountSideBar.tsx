
import { Box, Link, VStack } from '@chakra-ui/react'

import React from 'react'

const AccountSideBar = () => {
  return (
    <Box w="25%">
    <VStack align="stretch" spacing={4} fontFamily='"DM Sans", sans-serif'>
      <Link href="/vendor/account/basic-information">Basic Information </Link>
      <Link href="//vendor/account/kyc-information"> KYC Information</Link>
      <Link href="/vendor/account/bank-details">Bank Details</Link>
      <Link href="/vendor/account/update-security-question">  2FA: Update Security Question</Link>
      <Link href="/vendor/account/notifications"> Notification</Link>
      <Link href="vendor/account/password-setting"> Password setting</Link>
    </VStack>
    </Box>
  )
}

export default AccountSideBar

