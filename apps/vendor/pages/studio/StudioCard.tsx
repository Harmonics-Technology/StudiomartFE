import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { UserContext } from "@components/Context/UserContext";
import { useRouter } from "next/router";
import { useContext } from "react";
// import { useDummyImage } from "react-simple-placeholder-image";
import { MenuDropdown } from "ui";

const StudioCard = ({
  studio,
  deleteStudio,
}: {
  studio: any;
  deleteStudio: any;
}) => {
  // const image = useDummyImage({});
  const image = '/assets/003.jpg'
  const router = useRouter();
  const { setCurrentStudioId } = useContext(UserContext);

  const goToStudio = () => {
    router.push(`/studio/service/${studio?.id}`);
    setCurrentStudioId(studio?.id);
  };

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
          src={(studio?.coverPhoto as string) || image}
          alt={`${studio?.name}'s image`}
          borderRadius={{ base: "8px", lg: "0" }}
          onClick={() => goToStudio()}
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
          onClick={() => goToStudio()}
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
              {studio?.name}
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
            {studio?.city}, {studio?.state}
          </Text>
          <Text
            fontSize={{ base: ".8rem", lg: "1rem" }}
            fontWeight="700"
            color="#171717"
            mb="0"
          >
            Capacity: {studio?.studioCapacity}
          </Text>
          x
        </VStack>
        <MenuDropdown
          menus={[
            {
              label: "View Studio",
              id: 1,
              onclick: () => goToStudio(),
            },
            {
              label: "Delete Studio",
              id: 2,
              onclick: () => deleteStudio(studio?.id),
            },
          ]}
        />
      </HStack>
    </Box>
  );
};

export default StudioCard;
