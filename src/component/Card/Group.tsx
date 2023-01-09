import React, { useCallback } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

import useBSStore, { BottomSheetStoreTypes } from "Store/bottomSheet";
import { Group, Member } from "DB/entities";
import { Person } from "Component/Icons";
import Text from "Component/Text";

const Card = (Props: Group) => {
  const { onOpen } = useBSStore((state: BottomSheetStoreTypes) => state);

  return <TouchableOpacity
    style={styles.container}
    onPress={() => onOpen("group", undefined, 8, Props)}
  >
    <View style={styles.groupNameContainer}>
      <Text fontStyle="thin" style={styles.name}>{Props.name}</Text>
      <Text style={styles.lastUsedDate}>{Props.lastUsedDate}</Text>
    </View>

    <View style={styles.membersContainer}>
      <Person />
      <Text style={styles.text}>{Number(Props.members?.length || 0)}명</Text>
      {Number(Props.members?.length || 0) > 0 && <>
        <View  style={styles.divider}/>
        {Props.members?.map((member: Member, i: number) => <Text key={i} style={styles.text}>{member.name}</Text>)}
      </>}
    </View>
  </TouchableOpacity>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F3F1ED",
    flex: 1,
    margin: 6,
    paddingHorizontal: 16,
    paddingVertical: 15,
    borderRadius: 6,
  },
  groupNameContainer: {
    flexDirection: "row",
    marginTop: 8,
    justifyContent: "space-between",
  },
  name: {
    color: "#505050",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8
  },
  lastUsedDate: {
    fontSize: 14,
    color: "#848484"
  },
  membersContainer: {
    flexDirection: "row",
    marginTop: 8,
    alignItems: "center",
  },
  text: {
    color: "#505050",
    fontSize: 14,
    marginLeft: 6,
  },
  divider: {
    width: 1,
    height: 14,
    backgroundColor: "black",
    marginLeft: 8
  }
});

export default Card;
