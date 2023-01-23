import React from "react";
import { Box, Stack, Image } from "@chakra-ui/react";
import PrimaryInput from "./Input.tsx";

const Navbar = () => {
    return (
        <Box
            w="full"
            px="3rem"
            display="flex"
            justifyContent="space-between"
            h="5rem"
            alignItems="center"
        >
            <Stack
                spacing="6"
                alignItems="center"
                display="flex"
                direction="row"
            >
                <Image alt="" boxSize="1rem" src="/assets/BsBorder.png" />
                <Image alt="" boxSize="75%" src="/assets/StudioMart.png" />
            </Stack>
            <Stack spacing="3" alignItems="center" display="flex">
                <PrimaryInput />
            </Stack>
            <Stack
                spacing="6"
                alignItems="center"
                display="flex"
                direction="row"
            >
                <Image alt="" src="/assets/save.png" />
                <Image alt="" src="/assets/notification.png" />
            </Stack>
        </Box>
    );
};

export default Navbar;
