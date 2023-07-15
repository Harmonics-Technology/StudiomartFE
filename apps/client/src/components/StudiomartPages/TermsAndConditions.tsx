import { Box, Link, Text, VStack } from "@chakra-ui/react";
import { SingleText } from "./SingleText";

export const TermsAndConditions = () => {
  return (
    <Box
      w={{ base: "90%", lg: "80%" }}
      m="3rem auto 5rem"
      p={["1rem", "2rem 4rem 4rem 4rem"]}
      boxShadow="0px 8px 16px 0px rgba(190, 190, 190, 0.20)"
    >
      <Box>
        <Text
          fontSize={["1.5rem", "2rem"]}
          fontFamily="BR Firma"
          fontWeight="700"
        >
          Terms & Conditions
        </Text>
        <Text fontSize={["1.1rem"]} color="brand.100">
          Last updated: July 01, 2023
        </Text>
      </Box>
      <Text fontSize={["1.1rem"]} my="2.5rem">
        {
          'Please read these Terms and Conditions ("Terms") carefully before using StudioMart (the "Platform") provided by StudioMart Ltd. ("we," "us," or "our"). By accessing or using the Platform, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you may not use the Platform.'
        }
      </Text>
      <VStack spacing="2.5rem" align="flex-start" px={["0", "1rem"]}>
        <SingleText
          title="1. Acceptance of Terms"
          text="By accessing or using the Platform, you acknowledge that you have read, understood, and agree to be bound by these Terms, along with our Privacy Policy. If you do not agree with any of these terms, please refrain from using the Platform."
        />
        <SingleText
          title="2. Account Registration"
          text=" To access certain features of the Platform, you may be required to create an account. You must provide accurate and complete information during the registration process and promptly update any changes. You are solely responsible for maintaining the confidentiality of your account credentials and are liable for all activities conducted through your account."
        />
        <SingleText
          title="3. User Conduct"
          text="a. You agree to use the Platform solely for lawful purposes and in compliance with all applicable laws and regulations. <br/>b. You are responsible for any content you submit or share on the Platform. You must not engage in any activity that is harmful, offensive, or infringes upon the rights of others. <br/>c. You acknowledge that we may monitor, review, or remove any content that violates these Terms or is otherwise objectionable."
        />
        <SingleText
          title="4. Studio Listings and Bookings"
          text="a. The Platform facilitates the listing of studios by vendors. We do not endorse or guarantee the accuracy, quality, or availability of the listed studios. <br/>b. Any bookings made through the Platform are subject to the terms and conditions set by the vendors. We are not responsible for any disputes or issues arising from bookings or interactions between users and vendors."
        />
        <SingleText
          title="5. Intellectual Property"
          text="The Platform and its content, including text, graphics, logos, and software, are protected by intellectual property laws. You may not modify, copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer or sell any information, software, products, or services obtained from the Platform without our prior written consent."
        />
        <SingleText
          title="6. Limitation of Liability"
          text="a. The Platform is provided on an 'as is' and 'as available' basis. We make no warranties or representations of any kind, express or implied, regarding the Platform's operation, accuracy, reliability, or availability. <br/>b. In no event shall we be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of or in connection with your use of the Platform or any content available through the Platform."
        />
        <SingleText
          title="7. Modifications and Termination"
          text="a. We reserve the right to modify, suspend, or terminate the Platform, or any part thereof, at any time without prior notice. <br/>b. We may also update or modify these Terms from time to time. It is your responsibility to review the most current version of the Terms regularly. Continued use of the Platform after any modifications constitutes acceptance of the updated Terms."
        />
        <SingleText
          title="8. Governing Law and Jurisdiction"
          text="These Terms shall be governed by and construed in accordance with the laws of [Jurisdiction]. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of [Jurisdiction]."
        />
        <Text w="90%">
          If you have any questions or concerns regarding these Terms and
          Conditions, please contact us at{" "}
          <Link href="mailto:info@studiomart.io" color="brand.100">
            {" "}
            info@studiomart.io.
          </Link>
        </Text>
      </VStack>
    </Box>
  );
};
