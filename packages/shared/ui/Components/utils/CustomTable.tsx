import {
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  Text,
  Icon,
  Flex,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";
import TableNoContentWrapper from "./TableNoContentWrapper";
import { BsFillInfoCircleFill } from "react-icons/bs";

interface TablesProps {
  tableHead: string[];
  children: ReactNode;
}

function CustomTable({ tableHead, children }: TablesProps) {
  // console.log({ tableHead });
  return (
    <TableContainer h="auto">
      <Table>
        <Thead>
          <Tr w="full" h="4rem" borderBottom="1px solid #f2f2f2">
            {tableHead.map((x, i) => (
              <Th
                pl="0rem"
                fontSize="14px"
                color="#3D3D3D"
                fontWeight="600"
                fontFamily="BR Firma"
                letterSpacing="-1px"
                textTransform="capitalize"
                key={i}
              >
                {x}
              </Th>
            ))}
          </Tr>
        </Thead>

        {
          //@ts-ignore
          children?.props?.children?.length > 0 ? (
            <Tbody>{children}</Tbody>
          ) : (
            <TableNoContentWrapper
              elements={
                <Flex align="center" fontSize=".9rem" gap=".5rem">
                  <Icon as={BsFillInfoCircleFill} />
                  <Text mb="0">
                    There's currently no data available. Check back later
                  </Text>
                </Flex>
              }
            />
          )
        }
      </Table>
    </TableContainer>
  );
}

export default CustomTable;
