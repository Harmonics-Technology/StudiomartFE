import {
  Box,
  Flex,
  Text,
  Show,
  VStack,
  Image,
  Heading,
  Stack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import { DisabledInput, PrimaryInput, SubmitButton } from 'ui';
import { PasswordReset, UserService } from 'src/services';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { Carousel } from 'react-responsive-carousel';

const schema = yup.object().shape({
  newPassword: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('New password is required'),
});

const CompleteReset = ({ code }: { code: string }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<PasswordReset>({
    resolver: yupResolver(schema),
    defaultValues: { code },
    mode: 'all',
  });

  const [retypePassword, setretypePassword] = useState<boolean>(false);
  const [confirmpassword, setConfirmPassword] = useState<string>();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const changeInputType = () => {
    setPasswordVisible(!passwordVisible);
  };
  const onSubmit = async (data: PasswordReset) => {
    if (data.newPassword != confirmpassword) {
      toast.error('Password do not match', { className: 'loginToast' });
      return;
    }
    try {
      const result = await UserService.completeReset({ requestBody: data });
      if (result.status) {
        toast.success(
          'Password reset successful, you will be redirected to login',
          { className: 'loginToast' }
        );
        router.push('/login');
        return;
      }
      toast.error(result.message as string, { className: 'loginToast' });
    } catch (error: any) {
      toast.error(error.message || error.body.message, {
        className: 'loginToast',
      });
    }
  };

  return (
    <Flex
      direction={['column', 'row']}
      justify="space-between"
      align="center"
      minHeight="100vh"
    >
      <Show above="md">
        <Box w={['100%', '55%']} h={['40vh', '100vh']} overflow="hidden">
          <Carousel
            showStatus={false}
            autoPlay
            infiniteLoop
            animationHandler="fade"
            useKeyboardArrows
            showArrows={false}
            showThumbs={false}
            showIndicators={false}
            stopOnHover={false}
            interval={5000}
          >
            <Image src="/assets/007.jpg" alt="any" w="full" objectFit="cover" />
            <Image src="/assets/003.jpg" alt="any" w="full" objectFit="cover" />
            <Image src="/assets/004.jpg" alt="any" w="full" objectFit="cover" />
            <Image src="/assets/005.jpg" alt="any" w="full" objectFit="cover" />
            <Image src="/assets/001.jpg" alt="any" w="full" objectFit="cover" />
          </Carousel>
          <Image src="/assets/007.jpg" alt="any" w="full" objectFit="cover" />
        </Box>
      </Show>

      <Stack
        spacing={4}
        my={['10rem', 'unset']}
        mx="auto"
        w={['80%', '30%']}
        p={5}
      >
        {' '}
        <VStack spacing={3} w="100%">
          <Box w="50%">
            <Image src="/assets/studiomart.png" w="full" alt="logo" />
          </Box>
          <Text
            color="#54595E"
            lineHeight={1.5}
            fontSize="30px"
            fontWeight={700}
          >
            Reset Password
          </Text>
        </VStack>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack gap="1rem">
            <PrimaryInput<PasswordReset>
              label="New Password"
              name="newPassword"
              error={errors.newPassword}
              register={register}
              placeholder="Enter your password"
              type={passwordVisible ? 'text' : 'password'}
              icon={true}
              passwordVisible={passwordVisible}
              changeVisibility={changeInputType}
            />

            <DisabledInput<any>
              label="Confirm Password"
              type={retypePassword ? 'text' : 'password'}
              icon={true}
              passwordVisible={retypePassword}
              changeVisibility={() => setretypePassword((prev) => !prev)}
              placeholder="Enter your new password"
              defaultValue={''}
              onChange={(e: any) => setConfirmPassword(e.target.value)}
            />
            <SubmitButton
              textContent="Change Password"
              isLoading={isSubmitting}
            />
          </VStack>
        </form>
      </Stack>
    </Flex>
  );
};

export default CompleteReset;
