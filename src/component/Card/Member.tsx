import React, { useCallback } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

import { Group as GroupIcon, Bank } from "Component/Icons";
import useBSStore, { BottomSheetStoreTypes } from "Store/bottomSheet";
import { Member } from "DB/entities";
import { ScreenWidth } from "src/styles";
import Text from "Component/Text";

interface MemberCardProps extends Member {
  size: "all" | "bank" | "group";
};

const Card = (Props: MemberCardProps) => {
  const { onOpen } = useBSStore((state: BottomSheetStoreTypes) => state);
  
  const groupLength: number = Props.groups?.length || 0;
  const groupName = groupLength > 1
    ? `${Props.groups?.[0].name} 외${(Props.groups?.length||0) - 1}개`
    : groupLength === 1
      ? Props.groups?.[0].name
      : "그룹없음";

  return <TouchableOpacity
    style={styles.container}
    onPress={() => onOpen("member", undefined, 9, Props)}
  >
    <Text fontStyle="bold" style={styles.name}>{Props.name}</Text>

    {Props.size !== "bank" && <View style={{flexDirection: "row", marginTop: 8}}>
      <GroupIcon />
      <Text style={styles.text}>{groupName}</Text>
    </View>}

    {Props.size !== "group" && <View style={{flexDirection: "row", marginTop: 8}}>
      <Bank />
      <View>
        <Text style={styles.text}>{Props.bank || "정보없음"}</Text>
        <Text style={[styles.text, styles.account]}>{Props.account || "정보없음"}</Text>
      </View>
    </View>}
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
    maxWidth: (ScreenWidth/2) - 22
  },
  name: {
    color: "#505050",
    fontSize: 16,
    marginBottom: 8
  },
  text: {
    color: "#505050",
    fontSize: 14,
    marginLeft: 4,
  },
  account: {
    color: "#848484",
    marginTop: 4,
  }
});

export default Card;
