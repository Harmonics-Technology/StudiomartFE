import {
  Box, Button, Circle, Flex, HStack, Icon, Image
} from "@chakra-ui/react";
import { UserContext } from "@components/Context/UserContext";
import { GlobalSearch } from "@components/Home/GlobalSearch";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { BsBell, BsBookmarkHeart } from "react-icons/bs";
import CustomerSidebar from "./CustomerSidebar";

const CustomerHeader = ({ category }: any) => {
  const router = useRouter();
  const { user, logout } = useContext(UserContext);

  return (
    <Box bgColor="white" pos="sticky" top="0" zIndex={900}>
      <Flex
        w="90%"
        mx="auto"
        py={["5", "1rem"]}
        gap={{ base: 10, lg: 24 }}
        align="center"
        justify="space-between"
      >
        <HStack align="center" spacing={["5", "10"]} justify="space-between">
          <CustomerSidebar user={user} logout={logout} category={category} />
          <Link href="/" passHref>
            <HStack>
              <Box
                w={{ base: "11rem", lg: "13rem" }}
                pl=".5rem"
                cursor="pointer"
              >
                <Image src="/assets/StudioMart.png" w="full" alt="logo" />
              </Box>
            </HStack>
          </Link>
        </HStack>
        <Box width={["50%"]} display={{ base: "none", lg: "block" }}>
          <GlobalSearch />
        </Box>
        <HStack
          align="center"
          spacing={["1", "5"]}
          justifySelf="flex-end"
          // display="none"
        >
          <Link href="/customer/saved-studios" passHref>
            <a>
              <Circle
                size={{ base: "40px", lg: "50px" }}
                bgColor="rgba(21, 112, 250, 0.05)"
              >
                <Icon
                  as={BsBookmarkHeart}
                  fontSize="1rem"
                  cursor="pointer"
                  color={
                    router.asPath === "/customer/saved-studios"
                      ? "#1570FA"
                      : "black"
                  }
                />
              </Circle>
            </a>
          </Link>
          <Link href="/customer/notification" passHref>
            <a>
              <Circle
                size={{ base: "40px", lg: "50px" }}
                bgColor="rgba(21, 112, 250, 0.05)"
              >
                <Icon
                  as={BsBell}
                  fontSize="1rem"
                  cursor="pointer"
                  color={
                    router.asPath === "/customer/notifications"
                      ? "#1570FA"
                      : "black"
                  }
                />
              </Circle>
            </a>
          </Link>
          <Button
            h="2.6rem"
            w="full"
            px="2rem"
            // bg="brand.100"
            borderRadius="4px"
            color="brand.100"
            borderColor="brand.100"
            variant="outline"
            display={{ base: "none", lg: "flex" }}
            onClick={() => logout(["customerToken", "customer"])}
          >
            Log out
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default CustomerHeader;
