import {
    AccordionButton, AccordionItem, AccordionPanel, Box
} from "@chakra-ui/react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const FrequentlyAskedQuestion = ({ item }: any) => {
    return (
        <AccordionItem bgColor="white">
            {({ isExpanded }) => (
                <>
                    <h2>
                        <AccordionButton
                            _expanded={{ color: "brand.100" }}
                            _hover={{ color: "brand.100" }}
                            py="5"
                            fontWeight={500}
                            fontSize={["1rem", "1.2rem"]}
                            _focus={{ outline: "none" }}
                        >
                            <Box flex="1" textAlign="left">
                                {item.title}
                            </Box>
                            {isExpanded ? (
                                <AiOutlineMinus fontSize="1.3rem" />
                            ) : (
                                <AiOutlinePlus fontSize="1.3rem" />
                            )}
                        </AccordionButton>
                    </h2>
                    <AccordionPanel my={4} fontSize={[".9rem", "1rem"]} pb={4}>
                        {item.body}
                    </AccordionPanel>
                </>
            )}
        </AccordionItem>
    );
};

export default FrequentlyAskedQuestion;
