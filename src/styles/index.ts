import { Platform, StyleSheet } from "react-native";
// import Consts from "./const";

export * from "./const"
export * from "./colors"

const styles = StyleSheet.create({
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50, 50, 50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0,
        },
      },
      android: {
        elevation: 2,
      },
    })
  },
});

export default styles;
