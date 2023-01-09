import React from 'react';
import { TouchableOpacity, StyleSheet, StyleProp, ViewStyle, GestureResponderEvent } from "react-native";

import { Text } from "Component/Text";

type ButtonProps = {
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
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
  };
  return <TouchableOpacity
    disabled={disabled} 
    style={[
      styles.container,
      !disabled ? bgColor : styles.disabledContainer,
      round && { borderRadius: 26 },
      round && white && { borderWidth: 2, borderColor: "black" },
      containerStyle,
    ]}
    onPress={Props.onPress}>
    {Props?.prevIcon}
    {title && <Text fontStyle={small?"regular":"bold"} style={[!disabled ? styles.button : styles.disabledButton, font]}>
      {title}
    </Text>}
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
    // minWidth: 60,
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
