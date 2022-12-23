import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ToastAndroid } from "react-native";
import { Divider } from "@react-native-material/core";

import SearchBar from "Component/SearchBar";
import { CircleCrossBlack, Plus } from "Component/Icons";
import { ScreenWidth } from "src/styles";

import { Group } from "DB/entities";
import useDBStore from "Store/dbConnection";

type SelectorProps = {
  selectedGroup: Group[];
  updateSelectedGroup: (groups: Group[]) => void;
}

const GroupSelector = (Props: SelectorProps) => {
  const groups = useDBStore((state: any) => (state.groups || []));
  const createGroup = useDBStore((state: any) => state.createGroup);
  const [searchGroup, setSearchGroup] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<Group[]>(Props.selectedGroup || []);

  useEffect(() => {
    Props.updateSelectedGroup(selectedGroup);
  }, [selectedGroup])

  const addSelectedGroup = useCallback((group: Group) => {
    const hasGroup = selectedGroup.find(g => g.id === group.id);
    if (hasGroup) {
      ToastAndroid.show("이미 추가된 그룹 입니다.", ToastAndroid.SHORT);
      return;
    }
    const addedGroupList: Group[] = selectedGroup.concat(group);
    setSelectedGroup(addedGroupList);
    setSearchGroup("");
  }, [selectedGroup]);

  const createAndAddGroup = useCallback(async() => {
    const hasGroup = selectedGroup.find(g => g.name === searchGroup);
    if (hasGroup) {
      ToastAndroid.show("이미 추가된 그룹 입니다.", ToastAndroid.SHORT);
      return;
    }
    try {
      const created = await createGroup(searchGroup);
      // console.log({ searchGroup, created });
      const addedGroupList: Group[] = selectedGroup.concat(created);
      setSelectedGroup(addedGroupList);
      setSearchGroup("");
    } catch(e) {
      console.log(e);
      ToastAndroid.show(`${e}`, ToastAndroid.SHORT);
    }
  }, [selectedGroup, searchGroup]);

  const removeSelectedGroup = useCallback((groupId: number) => {
    const groupIdx = selectedGroup.findIndex(group => group.id === groupId);
    const updated = [...selectedGroup];
    updated.splice(groupIdx, 1);
    setSelectedGroup(updated);
  }, [selectedGroup]);

  return (<View style={styles.container}>
    <Divider color="#808080" />
    <View style={styles.selectedContainer}>
      <Text style={styles.label}>그룹</Text>
      {selectedGroup.map((group: Group, idx: number) => <View key={idx}>
        <Text style={styles.selectedGroupName}>{group.name}</Text>
        <TouchableOpacity
          onPress={() => removeSelectedGroup(group.id || 0)}
          style={styles.removeSelectedGroupIcon}
        ><CircleCrossBlack/></TouchableOpacity>
      </View>)}
    </View>

    <View style={{marginBottom: 10}}>
      <SearchBar search={searchGroup} setSearch={setSearchGroup} placeholder="그룹 이름을 입력하세요." />
    </View>

    {searchGroup.length > 0 && <View style={styles.searchedContainer}>
      {groups
        .filter((_: Group) => _.name.indexOf(searchGroup) !== -1)
        .map((g: Group, idx: number) => <TouchableOpacity
          key={`searched_${idx}`}
          style={styles.searchedGroup}
          onPress={(e) => {
            addSelectedGroup(g);
            e.stopPropagation();
          }}>
            <View style={styles.plusIcon}><Plus color="#303030" size={10.8}/></View>
            <Text style={styles.searchedGroupName} >{g.name}</Text>
        </TouchableOpacity>)}
      {groups
        .filter((g: Group) => g.name.indexOf(searchGroup) !== -1)
        .length === 0 && <TouchableOpacity
          style={styles.searchedGroup}
          onPress={(e) => {
            createAndAddGroup();
            e.stopPropagation();
          }}>
            <View style={styles.plusIcon}><Plus color="#303030" size={10.8}/></View>
            <Text style={styles.searchedGroupName} >"{searchGroup}" 그룹 만들기</Text>
      </TouchableOpacity>}
    </View>}
    <Divider color="#808080" />
  </View>);
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#D9D9D9",
    width: ScreenWidth,
    paddingHorizontal: 16,
    marginTop: 18,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    fontFamily: "S-CoreDream-4Regular",
    fontSize: 12,
    paddingHorizontal: 4,
    top: -10,
    left: 4,
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
    borderRadius: 17,
    paddingHorizontal: 8,
    minWidth: 40,
    backgroundColor: "white",
    color: "#505050",
    fontFamily: "S-CoreDream-6Bold",
    fontSize: 12,
    textAlignVertical: "center",
    textAlign: "center",
  },
  removeSelectedGroupIcon: {
    position: "absolute",
    top: 4,
    right: 4,
  },
  searchedContainer: {
    position: "relative",
    flexDirection: "row",
    flexWrap: "wrap",
    width: ScreenWidth,
    paddingBottom: 10,
    marginTop: 10,
  },
  searchedGroup: {
    display:"flex",
    flexDirection:"row",
    margin: 5,
    height: 34,
    borderRadius: 17,
    paddingHorizontal: 8,
    minWidth: 40,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  plusIcon: {
    alignContent: "center",
    justifyContent: "center",
    marginRight: 4
  },
  searchedGroupName: {
    color: "#505050",
    fontFamily: "S-CoreDream-6Bold",
    fontWeight: "200",
    fontSize: 12,
    textAlignVertical: "center",
    textAlign: "center",
  },
})

export default GroupSelector;
