import React, { useCallback } from "react";
import { View, StyleSheet, Platform, TouchableOpacity } from "react-native";

import { ScreenWidth } from "src/styles";
import SearchBar from "./SearchBar";
import { Text } from "Component/Text";
import { ArrowBack } from "./Icons";

type HeaderProps = {
  title: string;
  subTitle?: string;
  search: string;
  setSearch: (search: string) => void;
  bgColor?: string;
  children?: React.ReactNode | React.ReactNode[];
  onPressBack?: () => void;
}

const SearchHeader = (Props: HeaderProps) => {

  const BackIcon = useCallback(() => {
    if (Platform.OS === "ios" && Props.onPressBack) return <TouchableOpacity style={{left: -8,marginRight:0}} onPress={Props.onPressBack}>
      <ArrowBack />
    </TouchableOpacity>;
    return null;
  }, [Props.onPressBack]);

  return <View style={[styles.container, { backgroundColor: Props.bgColor || "black" }]}>
    <View style={styles.titleContainer}>
      <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
        <BackIcon />
        <Text fontStyle="bold" style={styles.title}>{Props.title}</Text>
      </View>
      {Props.subTitle && <Text fontStyle="bold" style={styles.subText}>{Props.subTitle}</Text>}
    </View>
    {Props.children}
    <SearchBar search={Props.search} setSearch={Props.setSearch} placeholder="이름을 입력하세요." />
  </View>;
};

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    minHeight: 144,
    maxHeight: 202,
    paddingHorizontal: 24,
    paddingVertical: 30,
    justifyContent: "space-between"
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: {
    color: "white",
    fontSize: 20,
  },
  subText: {
    color: "white",
    fontSize: 16,
  },
});

export default SearchHeader;
