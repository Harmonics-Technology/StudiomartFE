import { Box, HStack, IconButton, Image } from "@chakra-ui/react";
import { useState } from "react";
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";

const Carousel = () => {
    const [imgSlide, setImgSlide] = useState(0);
    const slideShow = [
        "/pixel1.png",
        "/pixel2.png",
        "/pixel3.png",
        "/pixel4.png",
    ];

    const checkIndex = (index: number) => {
        if (index > slideShow.length - 1) {
            return 0;
        }
        if (index < 0) {
            return slideShow.length - 1;
        } else {
            return index;
        }
    };
    const handleNext = () => {
        const result = imgSlide + 1;
        setImgSlide(checkIndex(result));
        console.log("next", imgSlide);
    };
    const handlePrev = () => {
        const result = imgSlide - 1;
        setImgSlide(checkIndex(result));
        console.log("prev", imgSlide);
    };
    const handleChange = (index: any) => {
        setImgSlide(index);
    };

    return (
        <Box>
            <Box position="relative">
                <Image
                    src={slideShow[imgSlide]}
                    w="full"
                    objectFit="cover"
                    h={["350px", "500px"]}
                    rounded="0"
                    overflow="hidden"
                    alt="studio"
                />
                <IconButton
                    icon={<BsFillCaretLeftFill size={24} />}
                    color="brand.100"
                    py="10"
                    onClick={handlePrev}
                    position="absolute"
                    left="0"
                    top="40%"
                    bgColor="white"
                    className="absolute top-1/3 lg:top-44 left-0 py-3 md:py-9 md:px-1.5 bg-black text-white opacity-70"
                    aria-label="prev"
                />
                <IconButton
                    icon={<BsFillCaretRightFill size={24} />}
                    color="brand.100"
                    py="10"
                    right="0"
                    onClick={handleNext}
                    position="absolute"
                    top="40%"
                    bgColor="white"
                    className="absolute top-1/3 lg:top-44 left-0 py-3 md:py-9 md:px-1.5 bg-black text-white opacity-70"
                    aria-label="prev"
                />
            </Box>
            <HStack
                justify="center"
                my="3"
                overflowX="scroll"
                spacing="5"
                w="90%"
                mx="auto"
            >
                {slideShow.map((img, index) => {
                    return (
                        <Box
                            border={imgSlide === index ? "2px solid" : "none"}
                            borderColor="brand.100"
                            key={index}
                            onClick={() => handleChange(index)}
                            cursor="pointer"
                        >
                            <Image
                                src={img}
                                alt={`slide ${index}`}
                                objectFit="cover"
                                h={["16", "20"]}
                                w={["24", "52"]}
                            />
                        </Box>
                    );
                })}
            </HStack>
        </Box>
    );
};

export default Carousel;
