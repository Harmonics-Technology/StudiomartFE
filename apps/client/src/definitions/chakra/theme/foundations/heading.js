import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

export const headingTheme = defineStyle({
  fontFamily: "BR Firma",
  fontWeight: "700",
  color: "#171717",
  // let's also provide dark mode alternatives
  _dark: {
    color: "white",
  },
});
