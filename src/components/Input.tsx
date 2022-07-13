import React from 'react';

import {
  View, TextInput, Text,
  StyleSheet, StyleProp, ViewStyle,
  KeyboardTypeOptions
} from "react-native";

type InputProps = {
  value: number | string;
  onChangeText: (e: string | number) => void;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  type?: KeyboardTypeOptions;
  placeholder?: string;
  label?: string;
  required?: boolean;
  selectionColor?: string;
};

const Input = (Props: InputProps) => {
  return <View style={[styles.container, Props.containerStyle]}>
    {Props.label && <Text style={[styles.label]}>
      {Props.label}
      {typeof Props.required !== "undefined" && <Text style={styles.required}>*</Text>}
    </Text>}
    <TextInput
      style={[styles.input, Props.style]}
      keyboardType={Props.type || "default"}
      value={`${Props.value || ""}`}
      placeholder={Props.placeholder || ""}
      onChangeText={Props.onChangeText}
      selectionColor={Props.selectionColor}
    />
  </View>
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    // border: "solid 1px #C4C4C4"
    // paddingHorizontal: 20,
    // paddingVertical: 4,
  },
  input: {
    width: "100%",
    height: 50,
    paddingHorizontal: 24,
    marginBottom: 16,
    borderColor: "#C4C4C4",
    borderWidth: 1,
    borderRadius: 4,
  },
  label: {
    fontSize: 14,
    marginTop: 8,
    marginBottom: 8,
    color: "#505050",
    fontWeight: "bold"
  },
  required: {
    color: "#F8503E",
  }
});
export default Input;
