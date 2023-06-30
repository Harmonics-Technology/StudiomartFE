import { Box, Text, VStack, Link } from "@chakra-ui/react";
import React from "react";
import { SingleText } from "./SingleText";

export const Privacy = () => {
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
          Privacy Policy
        </Text>
        <Text fontSize={["1.1rem"]} color="brand.100">
          Last updated: July 01, 2023
        </Text>
      </Box>
      <Text fontSize={["1.1rem"]} my="2.5rem">
        {
          'This Privacy Policy ("Policy") explains how StudioMart Ltd. ("we," "us," or "our") collects, uses, shares, and protects your personal information when you use the StudioMart platform (the "Platform"). We are committed to protecting your privacy and ensuring the security of your personal information. By using the Platform, you consent to the collection and use of your personal information as outlined in this Policy.'
        }
      </Text>
      <VStack spacing="2.5rem" align="flex-start" px={["0", "1rem"]}>
        <SingleText
          title="1. Information"
          text="We Collect <br/>a. Personal Information: When you register an account, make a booking, or interact with the Platform, we may collect personal information such as your name, email address, phone number, and payment details. <br/>b. Usage Information: We automatically collect certain information about your use of the Platform, including IP address, device information, and browsing activity. 
          <br/>c. Cookies: We may use cookies and similar tracking technologies to enhance your experience on the Platform and collect information about your preferences and usage patterns."
        />
        <SingleText
          title="2. Use of Information"
          text="a. We use your personal information to provide and improve the Platform, process bookings, communicate with you, and personalize your experience. 
          <br/>b. We may use your information to send you promotional emails or newsletters, but you can opt out of receiving such communications at any time. 
          <br/>c. We do not sell, rent, or lease your personal information to third parties. However, we may share your information with trusted service providers who assist us in operating the Platform and delivering services to you."
        />
        <SingleText
          title="3. Data Retention and Security"
          text="a. We retain your personal information for as long as necessary to fulfill the purposes outlined in this Policy, unless a longer retention period is required or permitted by law. 
          <br/>b. We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, loss, misuse, or alteration. However, no data transmission or storage system can be guaranteed to be 100% secure."
        />
        <SingleText
          title="4. Third-Party Links"
          text="The Platform may contain links to third-party websites or services. We are not responsible for the privacy practices or content of such third parties. We encourage you to review the privacy policies of those third parties before providing any personal information."
        />
        <SingleText
          title="5. Children’s Privacy"
          text="The Platform is not intended for use by individuals under the age of 13. We do not knowingly collect personal information from children. If you believe we have inadvertently collected personal information from a child, please contact us to request its deletion."
        />
        <SingleText
          title="6. Updates to the Privacy Policy"
          text="We may update this Privacy Policy from time to time to reflect changes in our practices or legal obligations. We will notify you of any material changes by posting the updated Policy on the Platform. Your continued use of the Platform after the effective date of the updated Policy constitutes your acceptance of the revised terms."
        />

        <Text w="90%">
          Contact Us If you have any questions or concerns regarding this
          Privacy Policy or our privacy practices, please contact us at
          <Link href="mailto:info@studiomart.io" color="brand.100">
            {" "}
            info@studiomart.io.
          </Link>
        </Text>
      </VStack>
    </Box>
  );
};
