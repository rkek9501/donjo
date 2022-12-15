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
};

const Button = (Props: ButtonProps) => {
  const { title, style: containerStyle , round, disabled, white, black } = Props;
  if (typeof white !== "undefined" && typeof black !== "undefined") {
    throw new Error("you cannot use both 'white' and 'black' property on Button Component");
  }
  const bgColor = {
    backgroundColor: white ? "white" : "black",
  };
  const fontColor = {
    color: white ? "black" : "white",
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
    <Text style={[!disabled ? styles.button : styles.disabledButton, fontColor]}>
      {title}
    </Text>
  </TouchableOpacity>
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    textAlignVertical: "center",
    height: 52,
    minWidth: 60,
  },
  enabledContainer: {
    backgroundColor: "#000000",
  },
  disabledContainer: {
    backgroundColor: "#C4C4C4",
  },
  button: {
    fontSize: 18,
    color: "#ffffff",
  },
  disabledButton: {
    fontSize: 18,
    color: "#828282"
  }
});
export default Button;
