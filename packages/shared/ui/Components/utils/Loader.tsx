import React from "react";
import { Flex, Image } from "@chakra-ui/react";

export const Loader = ({ src }: { src: any }) => {
  return (
    <Flex
      pos="absolute"
      top="0%"
      left="50%"
      transform="translateX(-50%)"
      bgColor="rgb(250,250,250,.9)"
      zIndex="999"
      width="100%"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      onClick={void 0}
      userSelect="none"
    >
      <Image src={src} alt="" w="3re" h="3rem" />
    </Flex>
  );
};
