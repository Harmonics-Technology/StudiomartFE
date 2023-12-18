import {
  Box, HStack, Icon, Image, Spinner, Text, VStack
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { BsBookmarkHeart, BsBookmarkHeartFill } from "react-icons/bs";
import { useDummyImage } from "react-simple-placeholder-image";
import { IPopularStudios } from "src/models/schema";
import { StudioService } from "src/services";
import { Cur, MenuDropdown, Naira, Rating, handleOtherErrors } from "ui";

const PopularStudioCard = ({ service, id, isSaved }: IPopularStudios) => {
  const image = useDummyImage({});
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const saveServiceForLater = async () => {
    setLoading(true);
    try {
      const result = await StudioService.saveService({
        studioId: service?.id,
      });
      if (result.status) {
        setLoading(false);
        // setSaveStats(true);
        router.replace(router.asPath)
        toast.success("Added to saved items", { className: "loginToast" });
        return;
      }  
      setLoading(false);
      handleOtherErrors(result, toast, router)
    } catch (err: any) {
      setLoading(false);
     handleOtherErrors(err, toast, router)
    }
  };
  const removeSaved = async () => {
    setLoading(true);
    try {
      const result = await StudioService.removeSavedService({
        id: id || (service?.id as string),
      });
      if (result.status) {
        setLoading(false);
        toast.success("Item Removed", { className: "loginToast" });
        router.reload();
        return;
      }
      setLoading(false);
      toast.error(result.message as string, { className: "loginToast" });
    } catch (err: any) {
      setLoading(false);
      toast.error(err?.body?.message || err?.message, {
        className: "loginToast",
      });
    }
  };
  return (
    <Box
      role="group"
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
          src={(service?.bannerImageURL as string) || image}
          alt={`${service?.name}'s image`}
          borderRadius={{ base: "8px", lg: "0" }}
          onClick={() => router.push(`/customer/details/${service?.id}`)}
        />
        <Box pos="absolute" top="5%" right="3%">
          {loading ? (
            <Spinner size="sm" />
          ) : (
            <>
              {isSaved ? (
                <Icon
                  as={BsBookmarkHeartFill}
                  onClick={id ? removeSaved : ()=> router.push('/customer/saved-studios')}
                  fontSize="1.3rem"
                  color="red"
                  bgColor="white"
                  p=".1rem"
                />
              ) : (
                <Icon
                  as={BsBookmarkHeart}
                  onClick={saveServiceForLater}
                  fontSize="1.3rem"
                  bgColor="white"
                  p=".1rem"
                />
              )}
            </>
          )}
        </Box>
      </Box>
      <HStack
        align="center"
        justify="space-between"
        fontWeight="600"
        p={{ base: "1rem .5rem", lg: "1rem" }}
      >
        <VStack
          align="flex-start"
          onClick={() => router.push(`/customer/details/${service?.id}`)}
          cursor="pointer"
        >
          <HStack
            align={{ base: "none", lg: "flex-end" }}
            spacing={{ base: "0", lg: "1" }}
            flexDirection={{ base: "column", lg: "row" }}
          >
            {/* wrap this text if the name is longer */}
            <Text
              fontSize={["1rem", "20px"]}
              noOfLines={2}
              color="#171717"
              fontWeight="500"
              fontFamily="BR Firma"
              mb="0"
              textTransform="capitalize"
            >
              {service?.name}
            </Text>
            <Text
              color="#636363"
              noOfLines={1}
              fontSize={[".7rem", "14px"]}
              fontWeight="500"
              fontFamily="BR Firma"
              mb="0"
            >
              {service?.studio?.city}, {service?.studio?.state}
            </Text>
          </HStack>
          <HStack
            align="center"
            fontSize={[".7rem", "13px"]}
            spacing="0"
            gap=".5rem"
          >
            <Text
              color="#Afafaf"
              as="span"
              mb="0"
              fontSize="12px"
              display={{ base: "none", lg: "block" }}
            >
              {service?.averageRating || 0} Star
            </Text>
            <Rating value={service?.averageRating || 0} />
            <Text
              color="#808080"
              as="span"
              mb="0"
              fontSize="12px"
              fontWeight="500"
            >
              ({service?.totalReviewCount || 0})
            </Text>
          </HStack>
          <Text
            fontSize=".9rem"
            fontWeight="700"
            color="#171717"
            mb="0"
            display={{ base: "none", lg: "block" }}
          >
            From {`${Cur(service?.price as number)} NGN`}
          </Text>
          <Text
            fontSize=".9rem"
            fontWeight="700"
            color="#171717"
            mb="0"
            display={{ base: "block", lg: "none" }}
          >
            {`${Naira(service?.price as number)} `}
          </Text>
        </VStack>
        <MenuDropdown
          menus={[
            {
              label: "View Service",
              id: 1,
              onclick: () => router.push(`/customer/details/${service?.id}`),
            },
            {
              label: "Book Service",
              id: 2,
              onclick: () =>
                router.push(`/customer/schedule-session/${service?.id}`),
            },
          ]}
        />
      </HStack>
    </Box>
  );
};

export default PopularStudioCard;
