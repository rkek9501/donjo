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
};

const Button = (Props: ButtonProps) => {
  return <TouchableOpacity
    disabled={Props.disabled} 
    style={[
      styles.container,
      Props.style,
      !Props.disabled ? styles.enabledContainer : styles.disabledContainer,
      Props?.round && { borderRadius: 26 },
    ]}
    onPress={Props.onPress}>
    <Text style={[!Props.disabled ? styles.button : styles.disabledButton]}>
      {Props.title}
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
