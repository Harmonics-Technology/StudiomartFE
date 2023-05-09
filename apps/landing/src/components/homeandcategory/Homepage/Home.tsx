import React from "react";
// import Navbar from "../Component/Navbar";
import {
  Box,
  Button,
  Grid,
  Image,
  Text,
  Modal,
  ModalOverlay,
  ModalBody,
  VStack,
  ModalFooter,
  InputGroup,
  Input,
  InputLeftElement,
  InputRightElement,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { AttachmentIcon } from "@chakra-ui/icons";
import Card from "../Component/Card";
import { Filter } from "ui";

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpened,
    onOpen: onOpened,
    onClose: onClosed,
  } = useDisclosure();
  return (
    <Box position="relative">
      {/* <Navbar /> */}
      <Box w="full" display="flex" justifyContent="end" p={["1.5rem", "3rem"]}>
        <Filter isOpen={isOpened} onClose={onClosed} onOpen={onOpened} />
      </Box>
      <Box px={["1.5rem", "3rem"]} w="full" h="100%" mt="1rem">
        <Text fontWeight="700" fontSize={["1.5rem", "2rem"]}>
          Studios for you
        </Text>
        <Grid
          h="100%"
          templateColumns={[
            "repeat(2, 1fr)",
            "repeat(2, 1fr)",
            "repeat(2,1fr)",
            "repeat(3, 1fr)",
          ]}
          mt={["0", "2rem"]}
          gap={["4", "6"]}
          place-items=" center !important"
        >
          <Card img="/pixel1.png" />
          <Card img="/pixel2.png" />
          <Card img="/pixel3.png" />
          <Card img="/pixel4.png" />
          <Card img="/pixel5.png" />
          <Card img="/pixel1.png" />
          <Card img="/pixel2.png" />
          <Card img="/pixel3.png" />
          <Card img="/pixel4.png" />
        </Grid>
      </Box>
      <Box px={["1.5rem", "3rem"]} w="full" h="100%" mt="2rem">
        <Text fontWeight="700" fontSize={["1.5rem", "2rem"]}>
          Popular Studios around you
        </Text>
        <Grid
          h="100%"
          templateColumns={[
            "repeat(2, 1fr)",
            "repeat(2, 1fr)",
            "repeat(2,1fr)",
            "repeat(3, 1fr)",
          ]}
          mt={["0", "2rem"]}
          gap={["4", "6"]}
          place-items=" center !important"
        >
          <Card img="/pixel1.png" />
          <Card img="/pixel2.png" />
          <Card img="/pixel3.png" />
          <Card img="/pixel4.png" />
          <Card img="/pixel5.png" />
          <Card img="/pixel1.png" />
        </Grid>
      </Box>
      <Box px={["1.5rem", "3rem"]} w="full" h="100%" mt="2rem">
        <Text fontWeight="700" fontSize={["1.5rem", "2rem"]}>
          Recently Viewed Studios
        </Text>
        <Grid
          h="100%"
          templateColumns={[
            "repeat(2, 1fr)",
            "repeat(2, 1fr)",
            "repeat(2,1fr)",
            "repeat(3, 1fr)",
          ]}
          mt={["0", "2rem"]}
          gap={["4", "6"]}
          place-items=" center !important"
        >
          <Card img="/pixel1.png" />
          <Card img="/pixel2.png" />
          <Card img="/pixel3.png" />
          <Card img="/pixel4.png" />
          <Card img="/pixel5.png" />
          <Card img="/pixel1.png" />
        </Grid>
      </Box>
      <Button
        onClick={onOpen}
        w="5rem"
        h="5rem"
        bg="brand.100"
        display="flex"
        position="fixed"
        zIndex="99"
        alignItems="center"
        justifyContent="center"
        bottom="10"
        right="10"
        borderRadius="30px 10px 30px 30px"
        _hover={{ bg: "brand.100", scale: ".9" }}
      >
        <Image src="/message.png" alt="" />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          borderRadius="20px"
          display="block"
          position="absolute"
          bottom={["10", "20"]}
          right={["0", "10"]}
        >
          <ModalHeader bg="brand.100" display="flex" color="#fff">
            <Image src="/message.png" alt="" /> &nbsp; Live Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody minH={["40vh", "50vh"]}>
            <Box
              display="flex"
              w="full"
              alignItems="center"
              justifyContent="space-evenly"
            >
              <Box
                bg="brand.100"
                color="#fff"
                fontWeight="500"
                fontSize="1.3rem"
                borderRadius="45%"
                p=".25rem"
              >
                SW
              </Box>
              <VStack w="80%" align="baseline">
                <Text mb="-.5rem" fontSize="12px" color="#808080">
                  Studiomart
                </Text>
                <Box
                  fontSize="12px"
                  bg="rgba(232, 232, 232, 0.52)"
                  w={["full", "349px"]}
                  h="87px"
                  p=".5rem"
                  borderRadius="5px 20px 20px 20px"
                >
                  <Text>
                    Hello! need help? Kindly reach out to us and we will get to
                    you as soon as possible.
                  </Text>
                </Box>
              </VStack>
            </Box>
            <Box
              display="flex"
              mt=".85rem"
              alignItems="center"
              justifyContent="space-evenly"
            >
              <VStack w="80%" align="baseline">
                {/* <Text mb="-.5rem" fontSize="12px" color="#808080">Studiomart</Text> */}
                <Box
                  fontSize="12px"
                  bg="rgba(232, 232, 232, 0.52)"
                  w={["full", "349px"]}
                  h="87px"
                  p=".5rem"
                  borderRadius="20px 5px 20px 20px"
                >
                  <Text>
                    Hello, Please i would like to know if i will be provided
                    free internet.
                  </Text>
                </Box>
              </VStack>
              <Box
                bg="brand.100"
                color="#fff"
                fontWeight="500"
                fontSize="1.3rem"
                borderRadius="45%"
                p=".25rem"
              >
                FM
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter>
            <InputGroup
              bg="#E8E8E8"
              boxShadow=" 0px 4px 4px rgba(0, 0, 0, 0.2)"
              display="flex"
              border-radius=" 4px"
              p={["1rem", "1.65rem"]}
              w={["100%", "95%"]}
              h={["1.5rem", "1.5rem"]}
              alignItems="center"
              justifyContent="center"
            >
              <InputLeftElement
                marginY={[".35rem", ".45em"]}
                marginX={["1rem", "1em"]}
                pointerEvents="none"
                bg="#E8E8E8"
                // eslint-disable-next-line react/no-children-prop
                children={
                  <Image
                    src="/smile.png"
                    alt="smile"
                    color="#808080"
                    boxSize={["1rem", "1.5em"]}
                    fontWeight="400"
                  />
                }
              />
              <Input
                type="text"
                _focus={{ border: "none", outline: "none" }}
                border="none"
                bg="#E8E8E8"
                color="rgba(23, 23, 23, 0.52)"
                fontSize={[".75em", ".9em"]}
                placeholder="Type your messages here..."
              />
              <InputRightElement
                marginY={[".44rem", "em"]}
                marginX={[".5rem", ".8rem"]}
                pointerEvents="none"
                // eslint-disable-next-line react/no-children-prop
                children={<AttachmentIcon cursor="pointer" />}
              />
            </InputGroup>
            <Image
              src="/send.png"
              alt="search"
              color="#808080"
              ml=".5rem"
              boxSize={["1rem", "1.5em"]}
              fontWeight="400"
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Home;
