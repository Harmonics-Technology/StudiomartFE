import { Box, Heading, Stack, Image, Text } from "@chakra-ui/react";
import { BookNowLink } from "ui";

interface ICatProps {
  category: any;
  img: string;
  reverse?: boolean;
  title: string;
  content: string;
  cat: string;
}

export const StudioCategory = ({
  category,
  img,
  reverse,
  title,
  content,
  cat,
}: ICatProps) => {
  return (
    <Stack
      minH="600px"
      direction={["column", reverse ? "row-reverse" : "row"]}
      align="center"
      justify="space-between"
      gap={{ base: "2rem", lg: "4rem" }}
      spacing="0"
    >
      <Box
        w="full"
        h={{ base: "400px", lg: "500px" }}
        overflow="hidden"
        borderRadius="10px"
      >
        <Image
          w="full"
          h="full"
          objectFit="cover"
          src={img}
          alt="music studio"
        />
      </Box>
      <Box w="full" mx="auto">
        <Heading
          fontWeight="700"
          fontSize={["1.3rem", "1.8rem"]}
          fontFamily="BR Firma"
          textAlign={["center", "unset"]}
        >
          {title}
        </Heading>
        <Text
          my="5"
          fontSize={["0.85rem", "1.15rem"]}
          lineHeight="32px"
          textAlign="left"
        >
          {content}
        </Text>
        <BookNowLink
          path={`category/${
            category?.find((x: any) => x.name?.toLowerCase() == cat)?.id
          }`}
        />
      </Box>
    </Stack>
  );
};
