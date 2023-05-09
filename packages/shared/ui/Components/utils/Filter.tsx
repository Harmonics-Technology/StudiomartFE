import {
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    Button,
    Drawer,
    Text,
    DrawerBody,
    DrawerContent,
    DrawerOverlay,
    Flex,
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack,
    HStack,
} from "@chakra-ui/react";
import React from "react";
import {
    BsFillCaretDownFill,
    BsFillCaretUpFill,
    BsSortDownAlt,
} from "react-icons/bs";
import FilterLocation from "./FilterLocation";
import FilterStar from "./FilterStar";

type Prop = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

const Filter = ({ onOpen, onClose, isOpen }: Prop) => {
    return (
        <>
            <Button
                leftIcon={<BsSortDownAlt />}
                color="white"
                _hover={{
                    bgColor: "brand.100",
                    // color: "brand.100",
                    // border: "2px solid #1570FA",
                }}
                _focus={{
                    outline: "none",
                }}
                bgColor="brand.100"
                variant="solid"
                borderRadius="4px"
                onClick={onOpen}
                px="12"
            >
                Filters
            </Button>
            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerBody w="full" p="0">
                        <Accordion allowToggle>
                            <AccordionItem borderTop="none">
                                {({ isExpanded }) => (
                                    <>
                                        <AccordionButton
                                            _hover={{
                                                bgColor: "brand.100",
                                                color: "white",
                                            }}
                                            py="3"
                                            px="6"
                                            textAlign="left"
                                            _focus={{ border: "none" }}
                                        >
                                            <Flex align="center">
                                                <Text
                                                    mb="0"
                                                    fontWeight="medium"
                                                    pr="10px"
                                                >
                                                    Price
                                                </Text>
                                                {isExpanded ? (
                                                    <BsFillCaretUpFill fontSize="18px" />
                                                ) : (
                                                    <BsFillCaretDownFill fontSize="18px" />
                                                )}
                                            </Flex>
                                        </AccordionButton>

                                        <AccordionPanel px="6" pb={5}>
                                            <HStack
                                                justify="space-between"
                                                align="center"
                                                fontSize=".95rem"
                                            >
                                                <Text mb="0">10,000 NGN</Text>
                                                <Text>100,000 NGN</Text>
                                            </HStack>
                                            <Slider
                                                my="3"
                                                aria-label="slider-1"
                                                defaultValue={30}
                                            >
                                                <SliderTrack>
                                                    <SliderFilledTrack />
                                                </SliderTrack>
                                                <SliderThumb />
                                            </Slider>
                                            <Button
                                                mx="auto"
                                                display="block"
                                                color="white"
                                                w="70%"
                                                _hover={{
                                                    backgroundColor:
                                                        "transparent",
                                                    color: "brand.100",
                                                    border: "2px solid #1570FA",
                                                }}
                                                _focus={{
                                                    outline: "none",
                                                }}
                                                bgColor="brand.100"
                                                variant="solid"
                                            >
                                                Apply
                                            </Button>
                                        </AccordionPanel>
                                    </>
                                )}
                            </AccordionItem>
                            <AccordionItem p="0" m="0">
                                {({ isExpanded }) => (
                                    <>
                                        <AccordionButton
                                            _hover={{
                                                bgColor: "brand.100",
                                                color: "white",
                                            }}
                                            textAlign="left"
                                            _focus={{ border: "none" }}
                                        >
                                            <Flex align="center" py="1" px="2">
                                                <Text
                                                    mb="0"
                                                    fontWeight="medium"
                                                    pr="10px"
                                                >
                                                    Location
                                                </Text>
                                                {isExpanded ? (
                                                    <BsFillCaretUpFill fontSize="18px" />
                                                ) : (
                                                    <BsFillCaretDownFill fontSize="18px" />
                                                )}
                                            </Flex>
                                        </AccordionButton>

                                        <AccordionPanel p="0">
                                            <FilterLocation name="ajah" />
                                            <FilterLocation name="lekki" />
                                        </AccordionPanel>
                                    </>
                                )}
                            </AccordionItem>
                            <AccordionItem>
                                {({ isExpanded }) => (
                                    <>
                                        <AccordionButton
                                            _hover={{
                                                bgColor: "brand.100",
                                                color: "white",
                                            }}
                                            py="3"
                                            px="6"
                                            textAlign="left"
                                            _focus={{ border: "none" }}
                                        >
                                            <Flex align="center">
                                                <Text
                                                    mb="0"
                                                    fontWeight="medium"
                                                    pr="10px"
                                                >
                                                    Star rating
                                                </Text>
                                                {isExpanded ? (
                                                    <BsFillCaretUpFill fontSize="18px" />
                                                ) : (
                                                    <BsFillCaretDownFill fontSize="18px" />
                                                )}
                                            </Flex>
                                        </AccordionButton>

                                        <AccordionPanel p="0">
                                            <FilterStar filled={5} />
                                            <FilterStar filled={4} />
                                            <FilterStar filled={3} />
                                            <FilterStar filled={2} />
                                            <FilterStar filled={1} />
                                        </AccordionPanel>
                                    </>
                                )}
                            </AccordionItem>
                            <AccordionItem>
                                {({ isExpanded }) => (
                                    <>
                                        <AccordionButton
                                            _hover={{
                                                bgColor: "brand.100",
                                                color: "white",
                                            }}
                                            py="3"
                                            px="6"
                                            textAlign="left"
                                            _focus={{ border: "none" }}
                                        >
                                            <Flex align="center">
                                                <Text
                                                    mb="0"
                                                    fontWeight="medium"
                                                    pr="10px"
                                                >
                                                    Popularly used
                                                </Text>
                                                {isExpanded ? (
                                                    <BsFillCaretUpFill fontSize="18px" />
                                                ) : (
                                                    <BsFillCaretDownFill fontSize="18px" />
                                                )}
                                            </Flex>
                                        </AccordionButton>

                                        {/* <AccordionPanel px="6" pb={4}>
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore
                                            et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud
                                            exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat.
                                        </AccordionPanel> */}
                                    </>
                                )}
                            </AccordionItem>
                        </Accordion>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default Filter;
