import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path } from "react-native-svg";

export const Dot = ({ color, text }: { color?: string; text?: string | number; }) => {
  return <View style={styles.container}>
    <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <Path
        d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18Z"
        fill={color || "#F8503E"}
      />
    </Svg>
    {text && <Text style={styles.inner}>{text}</Text>}
  </View>
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: 18,
    width: 18,
    textAlign: "center",
    textAlignVertical: "center",
  },
  inner: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 0,
    height: 18,
    width: 18,
    fontSize: 12,
    textAlign: "center",
    textAlignVertical: "center",
    color: "white"
  }
})