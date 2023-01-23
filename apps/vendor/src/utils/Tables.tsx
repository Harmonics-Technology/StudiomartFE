import { Box, Td } from "@chakra-ui/react";

export function TableStatus({ name }: { name: string }) {
    return (
        <Td>
            <Box
                fontSize="10px"
                bgColor={
                    name == "Successful"
                        ? "#D2F5DF"
                        : name == "In progress" ||
                          name == "Pending Confirmation"
                        ? "#FDF3CA"
                        : name == "Awaiting Payment"
                        ? "#D5E2F9"
                        : "#FDC1C1"
                }
                color={
                    name == "Successful"
                        ? "#16A34A"
                        : name == "In progress" ||
                          name == "Pending Confirmation"
                        ? "#3D3D3D"
                        : name == "Awaiting Payment"
                        ? "##1570FA"
                        : "#DC2626"
                }
                fontWeight="bold"
                padding=".2rem 1rem"
                width="fit-content"
                borderRadius="8px"
                cursor="pointer"
            >
                {name}
            </Box>
        </Td>
    );
}
