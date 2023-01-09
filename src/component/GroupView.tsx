import React, { useCallback, useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet, ToastAndroid } from "react-native";
import { Divider } from "@react-native-material/core";

import SearchBar from "Component/SearchBar";
import { CircleCrossWithBg, Plus } from "Component/Icons";
import { ScreenWidth, ThemeColors } from "src/styles";

import { Group } from "DB/entities";
import useDBStore from "Store/dbConnection";
import Text from "Component/Text";
import Button from "./Button";

type SelectorProps = {
  selectedGroup: Group[];
  updateSelectedGroup: (groups: Group[]) => void;
  children?: React.ReactNode | React.ReactNode[];
}

const GroupView = (Props: SelectorProps) => {
  const groups = useDBStore((state: any) => (state.groups || []));
  const createGroup = useDBStore((state: any) => state.createGroup);
  // const [searchGroup, setSearchGroup] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<Group[]>(Props.selectedGroup || []);

  useEffect(() => {
    Props.updateSelectedGroup(selectedGroup);
  }, [selectedGroup])

  useEffect(() => {
    setSelectedGroup(Props.selectedGroup || [])
  }, [Props.selectedGroup]);

  const addSelectedGroup = useCallback((group: Group) => {
    const hasGroup = selectedGroup.find(g => g.id === group.id);
    if (hasGroup) {
      ToastAndroid.show("이미 추가된 그룹 입니다.", ToastAndroid.SHORT);
      return;
    }
    const addedGroupList: Group[] = selectedGroup.concat(group);
    setSelectedGroup(addedGroupList);
    // setSearchGroup("");
  }, [selectedGroup]);

  // const createAndAddGroup = useCallback(async() => {
  //   const hasGroup = selectedGroup.find(g => g.name === searchGroup);
  //   if (hasGroup) {
  //     ToastAndroid.show("이미 추가된 그룹 입니다.", ToastAndroid.SHORT);
  //     return;
  //   }
  //   try {
  //     const created = await createGroup(searchGroup);
  //     // console.log({ searchGroup, created });
  //     const addedGroupList: Group[] = selectedGroup.concat(created);
  //     setSelectedGroup(addedGroupList);
  //     setSearchGroup("");
  //   } catch(e) {
  //     console.log(e);
  //     ToastAndroid.show(`${e}`, ToastAndroid.SHORT);
  //   }
  // }, [selectedGroup, searchGroup]);

  const removeSelectedGroup = useCallback((groupId: number) => {
    const groupIdx = selectedGroup.findIndex(group => group.id === groupId);
    const updated = [...selectedGroup];
    updated.splice(groupIdx, 1);
    setSelectedGroup(updated);
  }, [selectedGroup]);

  return (<>
    <View style={styles.container}>
      <Divider color="#808080" />
      <View style={styles.selectedContainer}>
        <Text style={styles.label}>그룹</Text>
        {selectedGroup.map((group: Group, idx: number) => <View key={idx}>
          <Text style={styles.selectedGroupName}>{group.name}</Text>
          <TouchableOpacity
            onPress={() => removeSelectedGroup(group.id || 0)}
            style={styles.removeSelectedGroupIcon}
          ><CircleCrossWithBg/></TouchableOpacity>
        </View>)}
      </View>
    </View>
    {Props.children}
    <View style={{ backgroundColor: "#808080", height: 0.8, marginTop: 10, width: "100%" }} />
  </>);
};

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    paddingHorizontal: 16,
    marginTop: 18,
    zIndex: 1,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    fontSize: 12,
    paddingHorizontal: 4,
    top: -8,
    left: 8,
    color: "#808080"
  },
  selectedContainer: {
    position: "relative",
    flexDirection: "row",
    flexWrap: "wrap",
    width: ScreenWidth,
    paddingVertical: 10,
  },
  selectedGroupName: {
    display: "flex",
    margin: 5,
    height: 34,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    minWidth: 40,
    backgroundColor: ThemeColors.whiteBlack['200'],
    color: "#505050",
    fontSize: 12,
    textAlignVertical: "center",
    textAlign: "center",
  },
  removeSelectedGroupIcon: {
    position: "absolute",
    top: 2,
    right: 2,
  },
  plusIcon: {
    alignContent: "center",
    justifyContent: "center",
    marginRight: 4
  },
})

export default GroupView;
