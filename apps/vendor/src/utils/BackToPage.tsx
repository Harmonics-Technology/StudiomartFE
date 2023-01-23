import { Flex } from "@chakra-ui/react";
import React from "react";
import { BsFillCaretLeftFill } from "react-icons/bs";
import Link from "next/link";

type Props = {
    name: string;
    path: string;
};

const BackToPage = ({ name, path }: Props) => {
    return (
        <Link href={path} passHref>
            <Flex
                w="fit-content"
                align="center"
                gap="4"
                cursor="pointer"
                _hover={{ color: "brand.100" }}
            >
                <BsFillCaretLeftFill fontSize="1.3rem" />
                {name}
            </Flex>
        </Link>
    );
};

export default BackToPage;
