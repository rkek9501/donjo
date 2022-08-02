import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, GestureResponderEvent, ScrollView } from "react-native";
import { Down } from "./Icons";
import Styles from "../styles";

const DropdownItem = (Props: { value: string; onPress: (e: GestureResponderEvent) => void; }) => {
  return <TouchableOpacity style={styles.dropdownItem} onPress={Props.onPress}>
    <Text>{Props.value}</Text>
  </TouchableOpacity>
}

const Dropdown = (Props: { values: any[], selected?: any, onChangeSelected?: (item: any) => void }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(Props.selected || null);

  return <View style={styles.container}>
    <TouchableOpacity style={styles.selectorContainer} onPress={() => setOpen(!open)}>
      <Text style={styles.selectedText}>{selected?.name ?? "선택"}</Text>
      <Down />
    </TouchableOpacity>
    {open && <ScrollView style={[styles.dropdownContainer, Styles.shadow]}>
      {Props.values.map((item, key) => <DropdownItem
        key={key}
        value={item.name}
        onPress={() => {
          setSelected(item);
          Props.onChangeSelected?.(item);
          setOpen(false);
        }}
      />)}
    </ScrollView>}
  </View>
}

export default Dropdown;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    height: 50,
  },
  selectorContainer: {
    height: 50,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F2EDE3",
  },
  selectedText: {
    color: "#828282",
    fontSize: 16,
  },
  dropdownContainer: {
    position: "absolute",
    maxHeight: 230,
    top: 50,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: "lightgray",
  },
  dropdownItem: {
    height: 50,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
})