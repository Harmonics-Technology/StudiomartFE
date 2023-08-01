import {
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { SearchBox } from "./SearchBox";

export const GlobalSearch = ({
  url = "/all-studios",
  urlb = "/customer/details/",
}: {
  url?: string;
  urlb?: string;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.ctrlKey && event.key === "q") {
        onOpen();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onOpen]);
  return (
    <>
      <InputGroup
        alignSelf="center"
        py={{ base: "0", lg: "1" }}
        size="lg"
        boxShadow="sm"
        borderRadius="4px"
        border="0.5px solid #E8E8E8"
        // borderColor="brand.100"
        pl="2"
        onClick={onOpen}
      >
        <InputLeftElement pointerEvents="none" h="full">
          <Icon as={BsSearch} color="#AFAFAF" />
        </InputLeftElement>
        <Input
          type="text"
          border="none"
          _focusVisible={{ outline: "none" }}
          _placeholder={{ fontSize: "1rem" }}
          placeholder="Search studio by name, category"
          overflow="hidden"
          pointerEvents="none"
        />
        <InputRightElement w={{ base: "90px", lg: "120px" }} h="full">
          {/* <Button h="full" w="full" bg="brand.100" color="white" size="sm">
              Search
            </Button> */}
          <Text
            mb="0"
            fontWeight="500"
            fontSize=".9rem"
            color="gray.500"
            display={["none", "block"]}
          >
            Ctrl + Q
          </Text>
        </InputRightElement>
      </InputGroup>
      {isOpen && (
        <SearchBox isOpen={isOpen} onClose={onClose} url={url} urlb={urlb} />
      )}
    </>
  );
};
