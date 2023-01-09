import React from "react";
import { Text as RNText, StyleSheet, TextProps } from "react-native";

type FontStyle = "thin" | "bold" | "regular";

interface TypeOfText extends TextProps {
  fontStyle?: FontStyle;
}

const getFontStyle = (fontStyle?: FontStyle) => {
  switch (fontStyle) {
    case "thin": return styles.thin;
    case "bold": return styles.bold;
    case "regular": default: return styles.regular;
  };
};

export const Text = (Props: TypeOfText) => {
  const fontStyle = getFontStyle(Props.fontStyle);

  return <RNText {...Props} style={[Props.style, fontStyle]}>{Props.children}</RNText>
}

const styles = StyleSheet.create({
  thin: {
    fontFamily: "S-CoreDream-1Thin",
  },
  regular: {
    fontFamily: "S-CoreDream-4Regular",
  },
  bold: {
    fontFamily: "S-CoreDream-6Bold",
  },
});

export default Text;
