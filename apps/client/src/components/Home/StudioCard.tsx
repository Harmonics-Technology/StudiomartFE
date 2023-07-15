import {
  Box, HStack,
  Image,
  Text, VStack
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useDummyImage } from "react-simple-placeholder-image";
import { IStudios } from "src/models/schema";
import { MenuDropdown } from "ui";

const StudiCard = ({ service }: IStudios) => {
  const image = useDummyImage({});
  const router = useRouter();
  return (
    <Box
      h="full"
      w="full"
      borderRadius="4px"
      border="1px solid #E8E8E8"
      overflow="hidden"
    >
      <Box
        overflow="hidden"
        h={{ base: "10rem", lg: "20rem" }}
        w="full"
        pos="relative"
      >
        <Image
          h="full"
          w="full"
          objectFit="cover"
          src={(service?.coverPhoto as string) || image}
          alt={`${service?.name}'s image`}
          borderRadius={{ base: "8px", lg: "0" }}
          onClick={() => router.push(`/all-studios/${service?.id}`)}
        />
      </Box>

      <HStack
        align="center"
        justify="space-between"
        fontWeight="600"
        p={{ base: "1rem .5rem", lg: "1rem" }}
      >
        <VStack
          align="flex-start"
          onClick={() => router.push(`/all-studios/${service?.id}`)}
          cursor="pointer"
        >
          <HStack align="flex-end">
            <Text
              fontSize={["1rem", "20px"]}
              noOfLines={1}
              color="#171717"
              fontWeight="500"
              fontFamily="BR Firma"
              mb="0"
              textTransform="capitalize"
            >
              {service?.name}
            </Text>
          </HStack>
          <Text
            color="#636363"
            noOfLines={1}
            fontSize={[".7rem", "16px"]}
            fontWeight="500"
            fontFamily="BR Firma"
            mb="0"
          >
            {service?.city}, {service?.state}
          </Text>
          <Text
            fontSize={{ base: ".8rem", lg: "1rem" }}
            fontWeight="700"
            color="#171717"
            mb="0"
          >
            Capacity: {service?.studioCapacity}
          </Text>
        </VStack>
        <MenuDropdown
          menus={[
            {
              label: "View Studio",
              id: 1,
              onclick: () => router.push(`/all-studios/${service?.id}`),
            },
            // {
            //   label: "Book Service",
            //   id: 2,
            //   onclick: () =>
            //     router.push(`/customer/schedule-session/${service?.id}`),
            // },
          ]}
        />
      </HStack>
    </Box>
  );
};

export default StudiCard;
