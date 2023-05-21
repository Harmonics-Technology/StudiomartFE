import { Stack, Flex, VStack, Box, Show, Image, Text } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { Carousel } from 'react-responsive-carousel';

import { PrimaryInput, SubmitButton } from 'ui';
import { InitiateResetModel, UserService } from 'src/services';

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

const InitiateReset = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<InitiateResetModel>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const router = useRouter();

  const onSubmit = async (data: InitiateResetModel) => {
    const logged = {
      email: data.email,
    };
    try {
      const result = await UserService.initiateReset({ requestBody: data });
      if (result.status) {
        toast.success(result.message as string, { className: 'loginToast' });
        return;
      }
      toast.error(result.message as string);
      return;
    } catch (error: any) {
      toast.error(error?.body?.message || error?.message);
    }
  };

  return (
    <>
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
              <Image
                src="/assets/007.jpg"
                alt="any"
                w="full"
                objectFit="cover"
              />
              <Image
                src="/assets/003.jpg"
                alt="any"
                w="full"
                objectFit="cover"
              />
              <Image
                src="/assets/004.jpg"
                alt="any"
                w="full"
                objectFit="cover"
              />
              <Image
                src="/assets/005.jpg"
                alt="any"
                w="full"
                objectFit="cover"
              />
              <Image
                src="/assets/001.jpg"
                alt="any"
                w="full"
                objectFit="cover"
              />
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
          <VStack spacing={3} w="100%">
            <Box w="50%">
              <Image src="/assets/studiomart.png" w="full" alt="logo" />
            </Box>
            <Text
              color="#54595E"
              fontSize="30px"
              lineHeight={1.5}
              fontWeight={700}
            >
              Reset Password
            </Text>
          </VStack>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
            <VStack gap="1rem">
              <PrimaryInput<InitiateResetModel>
                label="Email"
                name="email"
                error={errors.email}
                defaultValue=""
                register={register}
              />
              <SubmitButton textContent="Proceed" isLoading={isSubmitting} />
            </VStack>
          </form>
        </Stack>
      </Flex>
    </>
  );
};

export default InitiateReset;
