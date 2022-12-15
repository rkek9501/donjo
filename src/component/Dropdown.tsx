import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, GestureResponderEvent, ScrollView } from "react-native";
import { Down } from "./Icons";
import Styles from "../styles";

const DropdownHeight = 56;

const DropdownItem = (Props: { value: string; onPress: (e: GestureResponderEvent) => void; }) => {
  return <TouchableOpacity style={styles.dropdownItem} onPress={Props.onPress}>
    <Text>{Props.value}</Text>
  </TouchableOpacity>
}
type DropdownValue = {
  name: string; 
}
type DropdownProps = {
  values: DropdownValue[];
  label?: string;
  selected?: any;
  top?: boolean;
  onChangeSelected?: (item: any) => void;
  onFocus?: () => void;
};

const Dropdown = (Props: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(Props.selected || null);
  const ref = useRef(null);

  return <View style={styles.container}>
    <View style={styles.container}>
      {Props.label && <Text style={[styles.label, open && styles.openLabel]}>{Props.label}</Text>}
      <TouchableOpacity
        style={[styles.selectorContainer, open && {borderWidth: 2}]}
        onPress={() => {
          setOpen(!open);
          Props.onFocus?.();
        }}
      >
        <Text style={styles.selectedText}>{selected?.name ?? "선택"}</Text>
        <Down rotation={open ? 180 : 0}/>
      </TouchableOpacity>
      {open && <ScrollView style={[
        styles.dropdownContainer,
        Styles.shadow,
        Props.top ? {bottom: DropdownHeight+2} : {top: DropdownHeight+2}
      ]}>
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
  </View>
}

export default Dropdown;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    height: DropdownHeight,
  },
  label: {
    position: "absolute",
    top: -8,
    left: 8,
    paddingHorizontal: 4,
    zIndex: 2,
    color: "black",
    fontSize: 12,
    backgroundColor: "white",
  },
  openLabel: {

  },
  selectorContainer: {
    height: DropdownHeight,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 4,
  },
  selectedText: {
    color: "#828282",
    fontSize: 16,
  },
  dropdownContainer: {
    position: "absolute",
    maxHeight: 700,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: "lightgray",
  },
  dropdownItem: {
    height: 50,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
})