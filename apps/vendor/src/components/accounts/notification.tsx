import React, { useState } from "react";
import { Flex, Box, Button, Text, Stack, HStack, Radio, Checkbox } from "@chakra-ui/react";
import AccountSideBar from "@components/accounts/AccountSideBar";

export default function Notifications() {
  const Notification = () => {
    const [updatesetting, setUpdateSetting] = useState(true);
  };

  return (
    <Stack direction="row" spacing={6} width='80%' my='3rem' mx='3rem' bgColor='white' p='5rem'>
      <AccountSideBar />
      <Box w="55%" fontFamily='"DM Sans", sans-serif'>
        <form>
          <Stack spacing={3}>
            <Text>
              Spam is something that everyone despises. This kind that is sent
              by email. We do not need to make sure you get the vital
              information, and you might enjoy the cool information as well.
            </Text>
            <Text>
              Don't worry, you'll be able to go back and make changes later.
            </Text>
            <Text>
              How should we notify you about your account activity? Not to
              worry, you can edit this later
            </Text>
            <HStack spacing="24px">
                <Checkbox >SMS</Checkbox>
                <Checkbox >EMAIL</Checkbox>
                <Checkbox >SMS and EMAIL</Checkbox>
            </HStack>
            <Text fontWeight='200' fontSize='16px'>Activate push notifications? </Text>
            <Text>For important updates and account notifications</Text>
            <Checkbox >Yes please do</Checkbox>
            <HStack spacing="24px">
              <Button
                width="50%"
                type="submit"
                backgroundColor="brand.100"
                color="white"
              >
                Update Settings
              </Button>
              {
                  <Button
                    bgColor="brand.100"
                    color="white"
                    width="50%"
                    type="submit"
                  >
                    Save
                  </Button>
                }
            </HStack>
          </Stack>
        </form>
      </Box>
    </Stack>
  );
}

//   return (
//     <Flex width="full" align="center" justifyContent="center">
//       <AccountSideBar/>
//       <Box p={2}>
//         <Box my={4} textAlign="left">
//         <Box p={8} maxWidth="500px" >
//           <Text>
//              Spam is something that everyone despises. This kind that is sent by email.
//              We do not need to make sure you get the vital information, and you might enjoy
//              the cool information as well.
//           </Text>
//           <Text>
//              Don't worry, you'll be able to go back and make changes later.
//           </Text>
//           <Text>
//              How should we notify you about your account activity?
//              Not to worry, you can edit this later
//           </Text>
//         <Button width="50%" type="submit" backgroundColor="blue" color="white" >
//              Update Settings
//         </Button>
//         </Box>
//         </Box>
//       </Box>
//     </Flex>
//   );}
