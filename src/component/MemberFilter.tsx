import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, GestureResponderEvent, StyleSheet, TouchableOpacity, View } from 'react-native';

import { Down, Layer } from 'Component/Icons';
import Text from "Component/Text";

export type SelectorType = "member" | "group";

export const TypeSelector = (Props: { type: SelectorType; onPress: (e: GestureResponderEvent)=>void }) => {
  return <TouchableOpacity
    style={[styles.typeSelectorContainer, { width: Props.type === "member" ? 114 : 104 }]}
    onPress={Props.onPress}
  >
    <Text style={styles.typeSelectorText}>
      {Props.type === "member" ? "그룹으로" : "멤버로"} 보기
    </Text>
    <Layer />
  </TouchableOpacity>
};

const SortValues = {
  recent: "최근 사용 순서",
  nameAsc: "이름순",
  nameDesc: "이름역순",
};

const getSortKeyValues = () => {
  const list = [];
  for (const [key, val] of Object.entries(SortValues)) {
    list.push({ value: key, text: val });
  }
  return list;
}

export type SortKey = "recent" | "nameAsc" | "nameDesc";

export const SortDropdown = (Props: { sortKey: SortKey; setSort: (key: SortKey) => void; }) => {
  const [open, setOpen] = useState(false);
  const sortList = useMemo(() => getSortKeyValues(), []);

  const onSelectSortKey = useCallback((value) => {
    Props.setSort(value);
    setOpen(false);
  }, []);

  return <View style={styles.sorterContainer}>
    <TouchableOpacity
      onPress={(e: GestureResponderEvent) => setOpen(!open)}
      style={styles.sortValueContainer}
    >
      <Text style={styles.sortValueText}>{SortValues?.[Props.sortKey] || "순서"}</Text>
      <Down/>
    </TouchableOpacity>
    {open && <View style={styles.sortDropdownList}>
      <FlatList
        data={sortList}
        renderItem={(data: any) => {
          const isActive = data.item.value === Props.sortKey;
          return <TouchableOpacity key={data.index} onPress={() => onSelectSortKey(data.item.value)}>
            <Text style={[styles.sortListText, { fontWeight: isActive ? "bold" : "normal" }]}>
              {data.item.text}
            </Text>
          </TouchableOpacity>
        }}
      />
    </View>}
  </View>
};

const styles = StyleSheet.create({
  typeSelectorContainer: {
    backgroundColor: "#D9D9D9",
    flexDirection: "row",
    alignItems: "center",
    height: 30,
    borderRadius: 15,
    paddingHorizontal: 12,
    justifyContent: "space-between",
  },
  typeSelectorText: {
    color: "#505050",
    fontSize: 12,
  },

  sorterContainer: {
    position: "relative",
    minWidth: 120,
  },
  sortValueContainer: {
    height: 30,
    backgroundColor: "#D9D9D9",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
    borderRadius: 4,
    borderColor: "#D9D9D9",
  },
  sortValueText: {
    color: "#505050",
    fontSize: 12,
    marginRight: 8,
  },
  sortDropdownList: {
    position: "absolute",
    backgroundColor: "white",
    minWidth:120,
    minHeight: 40,
    top: 30,
    zIndex: 1,
    borderWidth: 0.2,
    borderRadius: 4,
  },
  sortListText: {
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 12,
  },
});
