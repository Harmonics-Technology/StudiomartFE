import {
  Box,
  Flex,
  Grid,
  Heading,
  Text,
  Image,
  Stack,
  VStack,
  Input,
} from "@chakra-ui/react";
import { HeroBanner } from "@components/homeandcategory/Component/HeroBanner";
import { ProcedureCard } from "ui";
import { WaitBtn } from "@components/homeandcategory/Component/WaitBtn";
import { WaitFeatures } from "@components/homeandcategory/Component/WaitFeatures";
import React, { useState } from "react";

interface IWaitListProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: any;
  setData: any;
}

export const Waitlist = ({
  isOpen,
  onClose,
  onOpen,
  setData,
}: IWaitListProps) => {
  const prefillForm = ({
    email,
    userType,
  }: {
    email?: any;
    userType?: any;
  }) => {
    onOpen();
    setData({ email, userType });
  };
  const [userEmail, setUserEmail] = useState();
  return (
    <Box>
      <Box w="full">
        <HeroBanner onOpen={onOpen} />
      </Box>
      <Box w="80%" mx="auto">
        <Flex justify="center" m={["3rem 0 1rem", "3rem 0"]}>
          <Heading
            fontSize={["30px", "40px"]}
            fontWeight="700"
            color="#171717"
            letterSpacing="-0.02em"
            fontFamily="Work Sans"
            textAlign="center"
          >
            About Studiomart
          </Heading>
        </Flex>
        <Grid
          templateColumns={{
            base: "repeat(1,1fr)",
            md: "repeat(1,1fr)",
            lg: "repeat(2,1fr)",
          }}
          gap={["2rem", "5rem"]}
          w="full"
          alignItems="center"
          mb="3rem"
        >
          <VStack
            w="full"
            minW="0"
            spacing="1rem"
            order={{ base: 2, md: 2, lg: 0 }}
          >
            <Text
              fontSize={["16px", "18px"]}
              lineHeight="27px"
              textAlign="justify"
            >
              At StudioMart, we understand the challenges faced by studio owners
              in reaching out to their target audience and maximizing their
              studio&apos;s potential. That&apos;s why we&apos;ve created a
              convenient and user-friendly platform that allows studio owners to
              list their studios, showcase their unique offerings, and connect
              with eager customers.
            </Text>
            <Text
              fontSize={["16px", "18px"]}
              lineHeight="27px"
              textAlign="justify"
            >
              Our mission is to empower studio owners by providing them with a
              centralized hub to effectively promote their spaces and attract a
              diverse range of customers. Whether you own a photography studio,
              dance studio, music recording studio, or any other creative space,
              StudioMart is here to support you. We strive to create a seamless
              experience for both studio owners and customers alike.
            </Text>
          </VStack>
          <Box w="full">
            <Image src="/abt.png" alt="image" w="full" h="auto" />
          </Box>
        </Grid>
        <Stack align="center" direction="column" m={["5rem 0 0rem", "5rem 0"]}>
          <Heading
            fontSize={["30px", "40px"]}
            fontWeight="700"
            color="#171717"
            letterSpacing="-0.02em"
            fontFamily="Work Sans"
            textAlign="center"
          >
            Why Studiomart?
          </Heading>
          <Text
            fontSize={["16px", "18px"]}
            fontWeight="500"
            opacity="0.7"
            textAlign="center"
          >
            An online marketplace for vendors and customers to connect.
          </Text>
        </Stack>

        <Grid
          templateColumns={{
            base: "repeat(1,1fr)",
            md: "repeat(2,1fr)",
            lg: "repeat(4,1fr)",
          }}
          gap={{ base: "2rem", md: "2rem", lg: "1rem" }}
          w="full"
          alignItems="center"
          my="3rem"
        >
          <WaitFeatures
            note="Save time and effort; easily browse and book services from different studios in one place"
            title="Easy Studio Access"
            img="/r1.png"
          />
          <WaitFeatures
            note="Committed to providing excellent service, solving your queries with speed and expertise."
            title="Customer Support"
            img="/r2.png"
          />
          <WaitFeatures
            note="Connect, share, and engage like never before, empowering your team to achieve more."
            title="Seamless Communication"
            img="/r3.png"
          />
          <WaitFeatures
            note="Ensuring peace of mind; enjoy seamless, fast, and reliable payments."
            title="Secure Payment System"
            img="/r4.png"
          />
        </Grid>

        <Box>
          <Stack
            align="center"
            direction="column"
            m={["5rem 0 0rem", "5rem 0"]}
          >
            <Heading
              fontSize={["30px", "40px"]}
              fontWeight="700"
              color="#171717"
              letterSpacing="-0.02em"
              fontFamily="Work Sans"
              textAlign="center"
            >
              <span style={{ color: "#1570FA" }}>Explore Studios</span> in 3
              Easy Steps.
            </Heading>
            <Text
              fontSize={["16px", "18px"]}
              fontWeight="500"
              opacity="0.7"
              textAlign="center"
            >
              An online marketplace for vendors and customers to connect.
            </Text>
          </Stack>

          <Flex
            justify="space-between"
            align="center"
            gap="2rem"
            my="4rem"
            flexDir={{ base: "column", md: "row" }}
          >
            <ProcedureCard
              num="01"
              title="Create an Account"
              note="Create an account by completing  the registration process."
            />
            <Image src="/line.png" alt="line" w="80px" mx={["auto", "0"]} />
            <ProcedureCard
              num="02"
              title="View Studios"
              note="Search and view correct details of the studios you need."
            />
            <Image src="/line.png" alt="line" w="80px" mx={["auto", "0"]} />
            <ProcedureCard
              num="03"
              title="Contact Vendor"
              note="Contact vendors and book their services conveniently."
            />
          </Flex>

          <Flex
            justify="center"
            my="3rem"
            w={{ base: "80%", md: "80%", lg: "30%" }}
            mx="auto"
          >
            <WaitBtn
              text="Become a Customer"
              onOpen={() => prefillForm({ userType: "Customer" })}
            />
          </Flex>
        </Box>
        <Box>
          <Stack
            align="center"
            direction="column"
            m={["5rem 0 0rem", "5rem 0"]}
          >
            <Heading
              fontSize={["30px", "40px"]}
              fontWeight="700"
              color="#171717"
              letterSpacing="-0.02em"
              fontFamily="Work Sans"
              textAlign="center"
            >
              <span style={{ color: "#1570FA" }}>List your studio </span> in 3
              Easy Steps.
            </Heading>
            <Text
              fontSize={["16px", "18px"]}
              fontWeight="500"
              opacity="0.7"
              textAlign="center"
            >
              Our platform makes connecting with customers easy with these
              simple steps.
            </Text>
          </Stack>

          <Flex
            justify="space-between"
            align="center"
            gap="2rem"
            my="4rem"
            flexDir={{ base: "column", md: "row" }}
          >
            <ProcedureCard
              num="01"
              title="Create an Account"
              note="Create an account by completing  the registration process."
            />
            <Image src="/line.png" alt="line" w="80px" mx={["auto", "0"]} />
            <ProcedureCard
              num="02"
              title="List Your Services"
              note="Upload correct details of your  studio and services you offer."
            />
            <Image src="/line.png" alt="line" w="80px" mx={["auto", "0"]} />
            <ProcedureCard
              num="03"
              title="Get Notified"
              note="Connect with customers and get  notified when your services are needed."
            />
          </Flex>

          <Flex
            justify="center"
            my="3rem"
            w={{ base: "80%", md: "80%", lg: "30%" }}
            mx="auto"
          >
            <WaitBtn
              text="Become a Vendor"
              onOpen={() => prefillForm({ userType: "Vendor" })}
            />
          </Flex>
        </Box>
      </Box>
      <Box bgColor="rgba(165, 166, 246, 0.1)" py="5rem" w="full">
        <Flex
          w="85%"
          mx="auto"
          justify="space-between"
          gap="6rem"
          align="center"
          flexWrap={{ base: "wrap-reverse", md: "wrap", lg: "nowrap" }}
        >
          <Box w={{ base: "full", md: "100%", lg: "65%" }}>
            <Image src="/banner.png" w="full" h="auto" alt="banner" />
          </Box>
          <Box w={{ base: "full", md: "100%", lg: "30%" }}>
            <Stack direction="column" gap="1.5rem">
              <Heading
                fontSize={["30px", "40px"]}
                fontWeight="700"
                color="#171717"
                letterSpacing="-0.02em"
                fontFamily="Work Sans"
                textAlign={{ base: "center", lg: "left" }}
              >
                <span style={{ color: "#1570FA" }}>Studio-specific </span>
                one-stop shop
              </Heading>
              <Text
                fontSize={["16px", "18px"]}
                fontWeight="500"
                opacity="0.7"
                textAlign={{ base: "justify", md: "center", lg: "justify" }}
              >
                Whether you&apos;re a studio owner looking to increase bookings
                or a customer in search of the perfect creative space,
                StudioMart is here to bridge the gap and create a thriving
                community of studio enthusiasts.
              </Text>
              <Input
                w="full"
                borderRadius="4px"
                border="1px solid #e7e7e7"
                placeholder="Enter your email address"
                h="3rem"
                onChange={(e: any) => setUserEmail(e.target.value)}
              />
              <Flex w={{ base: "full", md: "100%", lg: "80%" }}>
                <WaitBtn onOpen={() => prefillForm({ email: userEmail })} />
              </Flex>
            </Stack>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};
