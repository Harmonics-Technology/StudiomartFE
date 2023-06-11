import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import Link from "next/link";

type Props = {
  img: string;
  text: string;
  display?: any;
  path?: string;
};
const ExploreStudioCard = ({ img, text, display, path }: Props) => {
  return (
    <Box role="group">
      <Link href={`/${path}`}>
        <Flex
          align="center"
          justify="center"
          display={display}
          h={["180px", "280px"]}
          cursor="pointer"
          transition="all .5s"
          bgSize="cover"
          bgPosition="right"
          rounded="10"
          backgroundSize="100% 100%"
          _groupHover={{ backgroundSize: "150% 150%" }}
          bgImage={img}
        >
          <Text
            color="white"
            transition="all .5s"
            transform="scale(1,1)"
            _groupHover={{ transform: "scale(1.3, 1.3)" }}
            fontWeight="700"
            fontSize={[".8rem", "1.2rem"]}
          >
            {text}
          </Text>
        </Flex>
      </Link>
    </Box>
  );
};

export default ExploreStudioCard;
