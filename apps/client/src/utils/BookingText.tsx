import { Box, Text } from "@chakra-ui/react";

interface TextProps {
    top: string;
    bottom: string;
}
function BookingText({ top, bottom }: TextProps) {
    return (
        <Box>
            <Text fontWeight="500" mb=".3rem">
                {top}
            </Text>
            <Text mb="0">{bottom}</Text>
        </Box>
    );
}

export default BookingText;
