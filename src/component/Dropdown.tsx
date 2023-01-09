import React, { useEffect, useMemo, useState } from "react";
import { View, StyleSheet } from "react-native";
import Text from "Component/Text";
import { Picker } from "@react-native-picker/picker";

const DropdownHeight = 56;

export type DropdownItem = {
  name: string; 
  value?: number;
}
type DropdownProps = {
  values: string[];
  label?: string;
  selected?: any;
  top?: boolean;
  onChangeSelected?: (item: string) => void;
  onFocus?: () => void;
};

const Dropdown = (Props: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string>(Props.selected || "선택안함");

  useEffect(() => {
    Props.onChangeSelected?.(selected)
  }, [selected]);

  return <View style={styles.container}>
    <View style={styles.container}>
      {Props.label && <Text style={[styles.label, open && styles.openLabel]}>{Props.label}</Text>}
      <View style={[styles.selectorContainer, open && { borderWidth: 2 }]} >
        <Picker
          mode="dropdown"
          style={{ flex: 1, padding: 0, fontFamily: "S-CoreDream-6Bold" }}
          itemStyle={{ flex: 1, padding: 0, fontFamily: "S-CoreDream-6Bold" }}
          selectedValue={Props.selected}
          onValueChange={(item) => setSelected(item)}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
        >
          {Props.values?.map((item, key) => {
            return <Picker.Item key={key} label={item} value={item} fontFamily="S-CoreDream-6Bold" />
          })}
        </Picker>
      </View>
    </View>
  </View>
};

export default Dropdown;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    height: DropdownHeight,
    zIndex: 10,
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
    fontSize: 12,
  },
  selectorContainer: {
    height: DropdownHeight,
    // paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 4,
  },
})