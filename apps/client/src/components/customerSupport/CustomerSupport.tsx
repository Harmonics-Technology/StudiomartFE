import {
    Accordion,
    Box,
    Button,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    Text
} from "@chakra-ui/react";
import FrequentlyAskedQuestion from "./FrequentlyAskedQuestion";

const data = [
    {
        title: "How do i book a studio?",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodoconsequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodoconsequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    },
    {
        title: "How do i book a studio?",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodoconsequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodoconsequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    },
    {
        title: "How do i book a studio?",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodoconsequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodoconsequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    },
];
const CustomerSupport = () => {
    return (
        <Box bgColor="brand.200" minH="screen" pt="20">
            <Box textAlign="center" pb="5">
                <Heading color="brand.100" fontSize={["1.5rem", "2rem"]}>
                    Customer support center
                </Heading>
                <Text mt="2" fontWeight={500} fontSize={["1rem", "1.1rem"]}>
                    How can we help you?
                </Text>
            </Box>
            <InputGroup
                mx="auto"
                alignSelf="center"
                w={{ base: "90%", md: "70%", lg: "60%" }}
                py={["1", "2"]}
                size="lg"
                bgColor="white"
                boxShadow="0px 4px 4px rgba(0, 0, 0, 0.2)"
                borderRadius="4px"
                pl="2"
            >
                <Input
                    type="text"
                    border="none"
                    _focus={{ outline: "none" }}
                    _placeholder={{ fontSize: { base: "1rem", lg: "1.1rem" } }}
                    placeholder="Kindly decribe your issue"
                />
                <InputRightElement w={["120px", "130px"]} h="full">
                    <Button
                        h="full"
                        w="full"
                        bg="brand.100"
                        fontSize={[".9rem", "1rem"]}
                        color="white"
                        size="lg"
                    >
                        Search
                    </Button>
                </InputRightElement>
            </InputGroup>
            <Accordion
                py={["14", "24"]}
                w={["90%", "80%"]}
                mx="auto"
                allowToggle
            >
                {data.map((item, id) => (
                    <FrequentlyAskedQuestion key={id} item={item} />
                ))}
            </Accordion>
        </Box>
    );
};

export default CustomerSupport;
