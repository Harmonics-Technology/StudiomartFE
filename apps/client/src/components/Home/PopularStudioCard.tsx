import {
  Box,
  Center,
  HStack,
  Image,
  Text,
  Button,
  Flex,
  Icon,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { IPopularStudios } from "src/models/schema";
import { Cur, getReviewSummary, MenuDropdown, Naira, Rating } from "ui";
import NoSSR from "react-no-ssr";
import { DummyImage, useDummyImage } from "react-simple-placeholder-image";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRouter } from "next/router";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { StudioService } from "src/services";
import { useState } from "react";
import toast from "react-hot-toast";

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
        toast.success("Added to saved items", { className: "loginToast" });
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
          alt=""
          borderRadius={{ base: "8px", lg: "0" }}
        />
        <Box pos="absolute" top="5%" right="3%">
          {loading ? (
            <Spinner size="sm" />
          ) : (
            <>
              {service?.isSaved ? (
                <Icon
                  as={AiFillHeart}
                  onClick={removeSaved}
                  fontSize="1.3rem"
                  color="red"
                />
              ) : (
                <Icon
                  as={AiOutlineHeart}
                  onClick={saveServiceForLater}
                  fontSize="1.3rem"
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
        <VStack align="flex-start">
          <HStack
            align={{ base: "none", lg: "flex-end" }}
            spacing={{ base: "0", lg: "1" }}
            flexDirection={{ base: "column", lg: "row" }}
          >
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
