import React, { useCallback, useState } from 'react';

import {
  StyleSheet, StyleProp, ViewStyle,
  KeyboardTypeOptions, Keyboard
} from "react-native";

import { TextInput } from "@react-native-material/core";
import { CircleCross, Error } from "Component/Icons";

type InputProps = {
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  label?: string;
  value: number | string;
  onChangeText: (e: any) => void;
  onFocus?: (isFoucsed: boolean) => void;
  trailingIconType?: "remove" | "warnning";
  error?: any;
};

const Input = (Props: InputProps) => {
  const { trailingIconType, value, onChangeText, error } = Props;
  const [innerFocus, setInnerFocus] = useState(false);

  const TrailingIcon = useCallback(() => {
    if (error) return <Error />
    else if (innerFocus && trailingIconType && ((typeof value === "string" && value.length > 0) || (typeof value === "number" && value === 0))) {
      if (trailingIconType === "remove") return <CircleCross onPress={() => onChangeText("")} />;
      else if (trailingIconType === "warnning") return <CircleCross />;
    }
    return null;
  }, [value, error, innerFocus, trailingIconType]);

  return <TextInput
    color={error ? "#DC143C" : "#008080"}
    variant="outlined"
    keyboardType={Props.keyboardType || "default"}
    style={[styles.style, Props.style]}
    inputStyle={styles.inputStyle}
    inputContainerStyle={[styles.containerStyle, Props.containerStyle]}
    label={Props.label}
    placeholder={Props.placeholder || ""}
    value={`${Props.value || ""}`}
    onChangeText={onChangeText}
    trailing={props => <TrailingIcon />}
    onFocus={() => {
      Props.onFocus?.(true);
      setInnerFocus(true);
    }}
    onBlur={() => {
      Keyboard.dismiss();
      Props.onFocus?.(false);
      setInnerFocus(false);
    }}
  />;
};

const styles = StyleSheet.create({
  style: {
    borderWidth: 0,
    borderRadius: 0,
    width:"100%",
    fontFamily: "SCDream4",
  },
  inputStyle: {
    padding: 0,
    fontFamily: "SCDream4",
  },
  containerStyle: {
    borderRadius: 4,
    width: "100%",
    fontFamily: "SCDream4",
  }
});
export default Input;
