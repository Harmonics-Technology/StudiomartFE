import {
  Box,
  Flex,
  HStack,
  Text,
  Image,
  Icon,
  Spinner,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { RiDeleteBin6Line } from "react-icons/ri";
import { StudioService } from "src/services";

interface BankCardProps {
  bankName: string;
  accountNumber: string;
  accountName: string;
  id: string;
}

export const BankCard = ({
  bankName,
  accountNumber,
  accountName,
  id,
}: BankCardProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const deleteBank = async (id: string) => {
    setLoading(true);
    try {
      const result = await StudioService.deleteBankAccount({ id });
      if (result.status) {
        setLoading(false);
        toast.success("Action successful");
        router.reload();
        return;
      }
      setLoading(false);
      toast.error(result.message as string);
      return;
    } catch (error: any) {
      setLoading(false);
      toast.error(error?.body?.message || error?.message, {
        className: "loginToast",
      });
    }
  };
  return (
    <Box
      borderRadius="10px"
      bgColor={"brand.100"}
      fontFamily="'Orbitron', sans-serif"
      color="white"
      w="3.37in"
      h="1.125in"
      p=".5rem 1rem"
      pos="relative"
      role="group"
      overflow="hidden"
    >
      <Flex justify="flex-end">
        <Text fontFamily="inherit" fontSize=".7rem" mb="0">
          {bankName}
        </Text>
      </Flex>
      <HStack justify="space-between" align="center" my=".3rem">
        <Box>
          <Image src="/assets/chip.png" alt="" w="1.5rem" />
        </Box>
        <Box>
          <Image src="/assets/wifi.png" alt="" w=".7rem" />
        </Box>
      </HStack>
      <Text
        fontFamily="inherit"
        fontSize="1rem"
        mb="0rem"
        letterSpacing=".2rem"
        // textShadow="rgba(245,245,245,0.5) 1px 1px 1px"
        textShadow="1px 2px 2px #555"
        // backgroundClip="text"
      >
        {accountNumber}
      </Text>
      <Text fontFamily="inherit" fontSize=".7rem">
        {accountName}
      </Text>
      <Flex
        pos="absolute"
        bottom="0"
        right="0"
        height="3rem"
        w="6rem"
        bgColor="yellow.400"
        borderTopLeftRadius="90px"
        justify="center"
        align="center"
        color="black"
      >
        {loading ? (
          <Spinner />
        ) : (
          <Icon
            as={RiDeleteBin6Line}
            fontSize="1.3rem"
            cursor="pointer"
            ml="1rem"
            pos="absolute"
            bottom="-50%"
            transition=".3s ease"
            onClick={() => deleteBank(id)}
            _groupHover={{
              bottom: "50%",
              transform: "translateY(50%)",
            }}
          />
        )}
      </Flex>
    </Box>
  );
};
