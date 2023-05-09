import { Box, Td, Th, Tooltip, Text } from "@chakra-ui/react";

export function TableStatus({ name }: { name: string }) {
  return (
    <Td fontFamily="BR Firma">
      <Box
        fontSize="10px"
        bgColor={
          name == "Successful"
            ? "#D2F5DF"
            : name == "In progress" || name == "Pending Confirmation"
            ? "#FDF3CA"
            : name == "Awaiting Payment"
            ? "#D5E2F9"
            : "#FDC1C1"
        }
        color={
          name == "Successful"
            ? "#16A34A"
            : name == "In progress" || name == "Pending Confirmation"
            ? "#3D3D3D"
            : name == "Awaiting Payment"
            ? "##1570FA"
            : "#DC2626"
        }
        fontWeight="bold"
        padding=".2rem 2rem"
        width="fit-content"
        borderRadius="8px"
        cursor="pointer"
      >
        {name}
      </Box>
    </Td>
  );
}

export function TableHead({
  name,
  border,
  value,
  borderColor,
}: {
  name: string | number | undefined | null;
  border?: boolean | undefined;
  value?: string;
  borderColor?: string;
}) {
  return (
    <Th
      borderRight={border ? value : 0}
      borderColor={borderColor}
      borderRightColor={borderColor}
      color="inherit"
      fontFamily="BR Firma"
    >
      {name}
    </Th>
  );
}

export function TableData({
  name,
  border,
  value,
  borderColor,
  classes,
  full,
}: {
  name: any;
  border?: boolean | undefined;
  value?: string;
  borderColor?: string;
  classes?: any;
  full?: boolean;
}) {
  return (
    <Td
      borderColor={borderColor}
      borderRight={border ? value : 0}
      borderRightColor={borderColor}
      paddingInlineStart="1rem"
      className={classes}
      fontFamily="BR Firma"
      // maxW="120px"
      // textOverflow=""
      // overflow="hidden"
      // noOfLines={1}
      color={
        name == "OFFSHORE"
          ? "brand.700"
          : name == "ONSHORE"
          ? "brand.400"
          : "black"
      }
    >
      <Tooltip label={name} hasArrow>
        {full ? name : name?.toString()?.substring(0, 20) || ""}
      </Tooltip>
    </Td>
  );
}

export function TableWithSub({
  top,
  sub,
  border,
  value,
  borderColor,
  classes,
  full,
}: {
  top: any;
  sub: any;
  border?: boolean | undefined;
  value?: string;
  borderColor?: string;
  classes?: any;
  full?: boolean;
}) {
  return (
    <Td
      borderColor={borderColor}
      borderRight={border ? value : 0}
      borderRightColor={borderColor}
      paddingInlineStart="1rem"
      className={classes}
      color={"black"}
      fontFamily="BR Firma"
    >
      <Tooltip label={top} hasArrow>
        <Box>
          <Text fontSize="18px" fontWeight="500" fontFamily="BR Firma">
            {full ? top : top?.toString()?.substring(0, 20) || ""}
          </Text>
          <Text fontSize="12px" fontWeight="500" mt="-2" fontFamily="BR Firma">
            {full ? sub : sub?.toString()?.substring(0, 20) || ""}
          </Text>
        </Box>
      </Tooltip>
    </Td>
  );
}
