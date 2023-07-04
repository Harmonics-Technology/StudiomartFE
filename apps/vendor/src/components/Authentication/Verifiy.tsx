import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  Image,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Slider from "react-slick";
import { sliderSets } from "ui";
import { UserService, UserView } from "src/services";
import { BeatLoader } from "react-spinners";

export const Verify = ({ code }: { code: string }) => {
  const router = useRouter();
  const [success, setSuccess] = useState<any>({
    status: false,
    data: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      setLoading(true);
      try {
        const data = await UserService.verify({
          token: code,
        });
        if (data.status) {
          setLoading(false);
          setSuccess({ status: true, data: data.data });
          return;
        }
        setLoading(false);
        setSuccess({ status: false, data: data.message });
      } catch (error: any) {
        setLoading(false);
        setSuccess({
          status: false,
          data: error?.message || error?.body?.message,
        });
      }
    };
    verifyUser();
  }, [code]);
  return (
    <Flex
      border="2px hidden red"
      w="100%"
      minH={{ base: "60vh", lg: "100vh" }}
      justify="space-between"
      align="center"
      // bgColor="#e0edff"
    >
      <Box
        w="55%"
        h="100vh"
        overflow="hidden"
        display={{ base: "none", lg: "block" }}
      >
        <Slider {...sliderSets}>
          <Image src="/assets/007.jpg" alt="any" w="full" objectFit="cover" />
          <Image src="/assets/003.jpg" alt="any" w="full" objectFit="cover" />
          <Image src="/assets/004.jpg" alt="any" w="full" objectFit="cover" />
          <Image src="/assets/005.jpg" alt="any" w="full" objectFit="cover" />
          <Image src="/assets/001.jpg" alt="any" w="full" objectFit="cover" />
          <Image src="/assets/007.jpg" alt="any" w="full" objectFit="cover" />
        </Slider>
      </Box>
      <Flex
        w={{ base: "full", lg: "50%" }}
        pos="relative"
        h="full"
        align="center"
      >
        <Box
          w="full"
          bgColor="white"
          // borderRadius="30px"
          px="4rem"
          mt=".5rem"
          py="1rem"
          // boxShadow="0px 20px 26px rgba(186, 182, 182, 0.16)"
        >
          <Flex w="10%" justify="center" mx="auto" mb="2rem">
            <Image src="/logofav.png" w="full" alt="logo" />
          </Flex>
          <VStack spacing={0} gap="1.5rem" w="100%" mb="10px">
            <Heading
              fontWeight={700}
              fontSize="30px"
              // lineHeight={"44px"}
              color="black"
              textTransform="capitalize"
              textAlign="center"
              mx="auto"
              w="80%"
            >
              Account Verfication!
            </Heading>
          </VStack>
          <Box
            w="100%"
            h={["100%", "100%", "100%"]}
            // border="2px hidden green"
            overflow="auto"
            py="15px"
            pr="3px"
          >
            {loading ? (
              <VStack>
                <BeatLoader color="brand.100" size={15} />
                <Text fontWeight="600" fontSize="1.1rem">
                  Loading verification, please wait
                </Text>
              </VStack>
            ) : (
              <VStack>
                <Text textAlign="center">
                  {success.status
                    ? `Hi ${success.firstName}! Your account verification process was successful, you can now proceed to login to enjoy all our amazing features on studiomart`
                    : success.data}
                </Text>
                <Button
                  w="50%"
                  mx="auto"
                  h="3rem"
                  bgColor="brand.100"
                  color="white"
                  onClick={() =>
                    success.status ? router.push("/login") : router.reload()
                  }
                >
                  {success.status ? "Login" : "Retry"}
                </Button>
              </VStack>
            )}

            <Text
              fontSize={["14px", "14px"]}
              display={["block", "block", "block"]}
              textAlign="center"
              mt="1rem"
              color="#3e3e3e"
              fontWeight="500"
            >
              &copy; StudioMart 2022. All Rights Reserved.
            </Text>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};
