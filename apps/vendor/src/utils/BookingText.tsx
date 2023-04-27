import { Box, Text } from "@chakra-ui/react";

interface TextProps {
    top: string;
    bottom: string;
    color?: string;
}
function BookingText({ top, bottom, color="black" }: TextProps) {
    return (
        <Box>
            <Text fontWeight="500" mb=".3rem">
                {top}
            </Text>
            <Text color={color} mb="0">{bottom}</Text>
        </Box>
    );
}

export default BookingText;
