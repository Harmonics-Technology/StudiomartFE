import {
  Link,
  Box,
  VStack,
  Heading,
  Image,
  Text,
  Stack,
  Divider,
  Flex,
  HStack,
} from "@chakra-ui/react";

import NextLink from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { getUrlRoute } from "ui";
import { AiFillMail } from "react-icons/ai";
import { ServiceTypeView } from "src/services";

type Props = {
  name: string;
  path: string;
};

const NavLink = ({ name, path }: Props) => {
  return (
    <NextLink href={path} passHref>
      <Link
        fontSize={["14px", "16px"]}
        color="whiteAlpha.700"
        cursor="pointer"
        _hover={{ color: "white" }}
      >
        {name}
      </Link>
    </NextLink>
  );
};

export const Footer = ({
  category,
}: {
  category: ServiceTypeView[] | null | undefined;
}) => {
  return (
    <Box bg="black" pt={[10, 16]} pb={["10", "5"]}>
      <Box w="85%" mx="auto">
        <Stack
          direction={["column", "row"]}
          justify="space-between"
          align="start"
          flexWrap="wrap"
          mb={["16", "10"]}
          spacing={["8", "unset"]}
        >
          <VStack align="flex-start">
            <HStack>
              <Box w="13rem" pl=".5rem" cursor="pointer">
                <Image src="/assets/logowhite.png" w="full" alt="logo" />
              </Box>
            </HStack>
            <VStack spacing="4" pt={["8", "3"]} align="flex-start">
              <NavLink path="/all-studios" name="Rent a studio" />
              <NavLink
                path={`${getUrlRoute().vendorUrl}/login`}
                name="Add a studio"
              />
              <Box pt="8">
                <Image
                  w={["130px", "170px"]}
                  src="/assets/googlePlay.png"
                  alt="Download on Google Play"
                />
              </Box>
            </VStack>
          </VStack>
          <VStack align="flex-start">
            <Text
              color="whiteAlpha.900"
              fontSize={["1rem", "1.3rem"]}
              fontWeight="500"
            >
              Studio Category
            </Text>
            <VStack spacing="5" align="flex-start">
              <NavLink
                path={`category/${
                  category?.find((x: any) => x.name?.toLowerCase() == "music")
                    ?.id
                }`}
                name="Music Studio"
              />
              <NavLink
                path={`category/${
                  category?.find((x: any) => x.name?.toLowerCase() == "photo")
                    ?.id
                }`}
                name="Photo Studio"
              />
              <NavLink
                path={`category/${
                  category?.find((x: any) => x.name?.toLowerCase() == "makeup")
                    ?.id
                }`}
                name="Make Up Studio"
              />
              <NavLink
                path={`category/${
                  category?.find((x: any) => x.name?.toLowerCase() == "hair")
                    ?.id
                }`}
                name="Hair Studio"
              />
              <NavLink
                path={`category/${
                  category?.find((x: any) => x.name?.toLowerCase() == "video")
                    ?.id
                }`}
                name="Video Studio"
              />
            </VStack>
          </VStack>
          <VStack align="flex-start">
            <Text
              color="whiteAlpha.900"
              fontSize={["1rem", "1.3rem"]}
              fontWeight="500"
            >
              Company
            </Text>
            <VStack spacing="5" align="flex-start">
              <NavLink path="/about" name="About Us" />
              <NavLink path="/contact" name="Contact" />
            </VStack>
          </VStack>
          <VStack align="flex-start">
            <Text
              color="whiteAlpha.900"
              fontSize={["1rem", "1.3rem"]}
              fontWeight="500"
            >
              Support
            </Text>
            <VStack spacing="5" align="flex-start">
              {/* <NavLink path="/" name="Studio Fee" /> */}
              <NavLink path="/terms" name="Terms & Conditions" />
              <NavLink path="/privacy-policy" name="Privacy Policy" />
            </VStack>
          </VStack>
        </Stack>
        <Divider />
        <Flex
          mt="8"
          gap={["8", "unset"]}
          color="whiteAlpha.700"
          justifyContent="space-between"
          flexDir={["column-reverse", "row"]}
        >
          <Text fontSize={["14px", "16px"]}>
            &copy; StudioMart 2022. All Rights Reserved.
          </Text>
          <HStack spacing={["4", "2"]}>
            <Link href="https://instagram.com/studiomart.io" target="_blank">
              <FaInstagram />
            </Link>
            <Link href="https://twitter.com/studiomart_io" target="_blank">
              <FaTwitter />
            </Link>
            <Link
              href="https://www.linkedin.com/company/studiomart.io/"
              target="_blank"
            >
              <FaLinkedinIn />
            </Link>
            <Link href="mailto:hello@studiomart.io" target="_blank">
              <AiFillMail />
            </Link>
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
};
