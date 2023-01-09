import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Search } from "./Icons";

type SearchBarProps = {
  search: string;
  setSearch: (search: string) => void;
  placeholder?: string;
}

const SearchBar = (Props: SearchBarProps) => {
  return <View style={styles.searchContainer}>
    <Search/>
    <TextInput
      style={styles.searchInput}
      placeholder={Props?.placeholder || "검색어를 입력해주세요."}
      value={Props.search}
      onChangeText={(v) => Props.setSearch(v)}
    />
  </View>
};

const styles = StyleSheet.create({
  searchContainer: {
    width: "100%",
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    borderWidth: 0,
    borderColor: "white",
    marginLeft: 10,
    color: "black",
  },
});

export default SearchBar;
