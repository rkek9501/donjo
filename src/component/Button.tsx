import React from 'react';

import {
  TouchableOpacity, Text,
  StyleSheet, StyleProp, ViewStyle,
  GestureResponderEvent
} from "react-native";

type ButtonProps = {
  style?: StyleProp<ViewStyle>;
  title?: string;
  disabled?: boolean;
  onPress?: (e: GestureResponderEvent) => void;
  round?: boolean;
  black?: boolean;
  white?: boolean;
  prevIcon?: React.ReactNode;
  postIcon?: React.ReactNode;
  small?: boolean;
};

const Button = (Props: ButtonProps) => {
  const { title, style: containerStyle, round, disabled, white, black, small } = Props;
  if (typeof white !== "undefined" && typeof black !== "undefined") {
    throw new Error("you cannot use both 'white' and 'black' property on Button Component");
  }
  const bgColor = {
    backgroundColor: white ? "white" : "black",
  };
  const font = {
    color: white ? "black" : "white",
    fontSize: small ? 16 : 18,
    fontFamily: small ? "S-CoreDream-4Regular" : "S-CoreDream-6Bold",
    fontWeight: small ? "normal" : "bold",
  };
  return <TouchableOpacity
    disabled={disabled} 
    style={[
      styles.container,
      containerStyle,
      !disabled ? bgColor : styles.disabledContainer,
      round && { borderRadius: 26 },
      round && white && { borderWidth: 2, borderColor: "black" }
    ]}
    onPress={Props.onPress}>
    {Props?.prevIcon}
    <Text style={[!disabled ? styles.button : styles.disabledButton, font]}>
      {title}
    </Text>
    {Props?.postIcon}
  </TouchableOpacity>
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    textAlign: "center",
    textAlignVertical: "center",
    height: 52,
    minWidth: 60,
    borderRadius: 5,
  },
  enabledContainer: {
    backgroundColor: "#000000",
  },
  disabledContainer: {
    backgroundColor: "#C4C4C4",
  },
  button: {
    color: "#ffffff",
  },
  disabledButton: {
    color: "#828282"
  },
});
export default Button;
