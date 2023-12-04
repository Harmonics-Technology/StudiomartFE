import { Circle, HStack, Icon, Link } from "@chakra-ui/react";
// import Link from "next/link";

export const SocialWrapper = ({ icon, iconName, url, color }: any) => {
  return (
    <Link href={`${url}`} target="_blank" rel="noopener noreferrer">
      <Circle size="2rem" bg={color}>
        <HStack cursor="pointer">
          <Icon as={icon} fontSize="1rem" color={"white"} />
          {/* <Text mb="0" fontSize=".8rem">
          {iconName}
        </Text> */}
        </HStack>
      </Circle>
    </Link>
  );
};
