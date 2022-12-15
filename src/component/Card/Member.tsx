import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { Group, Member } from "DB/entities";
import { Group as GroupIcon, Bank } from "Component/Icons";
import { ScreenWidth } from "src/styles";

interface MemberCardProps extends Member {
  size: "all" | "bank" | "group";
};

const Card = (Props: MemberCardProps) => {
  const groupLength: number = Props.groups?.length || 0;

  return <TouchableOpacity style={styles.container}>
    <Text style={styles.name}>{Props.name}</Text>

    {Props.size !== "bank" && <View style={{flexDirection: "row", marginTop: 8}}>
      <GroupIcon />
      {groupLength > 0
        ? <Text style={styles.text}>그룹명</Text>
        : <Text style={styles.text}>그룹없음</Text>}
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
    fontWeight: "bold",
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
