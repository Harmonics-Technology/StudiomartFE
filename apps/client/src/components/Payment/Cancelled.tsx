import { Box, Button, Image, Link, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";

export const Cancelled = () => {
  const router = useRouter();
  return (
    <Box bgColor="#eff1f3" minH="80vh">
      <VStack>
        <Box w="20%" pt="2rem">
          <Image src="/assets/failed.gif" alt="no image" />
        </Box>
        <Text
          as="h2"
          fontFamily="Nunito"
          fontSize="21px"
          fontWeight="400"
          mb="0"
          color="#151723"
          textTransform="uppercase"
        >
          Oops! Payment Failed
        </Text>
        <Text
          as="p"
          fontFamily="Nunito"
          mb="1rem"
          color="#999fa5"
          textAlign="center"
          w="30%"
        >
          The payment was unsuccesful due to an abnormality as a result of you
          cancelling the payment. Please try again later or use another payment
          method
        </Text>
        <Button
          onClick={() => router.push("/customer/history")}
          bgColor="brand.100"
          color="white"
          w="30%"
          h="3rem"
        >
          Go back
        </Button>
        <Link
          href="/contact"
          fontWeight="700"
          borderRadius="40px"
          textDecoration="none"
          fontFamily="Nunito"
          color="brand.100"
        >
          Need help?
        </Link>
      </VStack>
    </Box>
  );
};
