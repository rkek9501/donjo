import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import BottomSheet, { BottomSheetFooter, BottomSheetView } from "@gorhom/bottom-sheet";

import { ScreenWidth } from "src/styles";
import { Bank, CircleCrossBlack } from "Component/Icons";
import Input from "Component/Input";
import { BackDrop, bottomSheetStyles, FooterButtons, snapPoints } from "./index";

import type { Member } from "DB/entities";
import useBSStore, { BottomSheetStoreTypes } from "Store/bottomSheet";
import useDBStore, { DBConnectionStoreTypes } from "Store/dbConnection";
import { useBottomSheetBackHandler } from "Hook/useBackHandler";

const GroupBottomSheet = (Props: {}) => {
  const { height, onBackPressBS, data, onClose } = useBSStore((state: BottomSheetStoreTypes) => state);
  const removeMemberOfGroup = useDBStore((state: DBConnectionStoreTypes) => state.removeMemberOfGroup);
  const updateMember = useDBStore((state: DBConnectionStoreTypes) => state.updateMember);
  const [name, setName] = useState<string>(data?.name || "");
  const [focus, setFocus] = useState<"name"|null>(null)
  const sheetRef = useRef<BottomSheet>(null);

  useBottomSheetBackHandler(onBackPressBS, sheetRef);

  useEffect(() => {
    if (typeof height === "undefined") return;
    if (height >= 1) sheetRef.current?.snapToIndex(height);
    else if (height === -1) sheetRef.current?.close();
  }, [height]);

  const onChnage = useCallback((index) => {
    console.log("onChnage", index);
    if (typeof height === "undefined") return;
    if (height >= 1) sheetRef.current?.snapToIndex(height);
    else if (height === -1) sheetRef.current?.close();
  }, [sheetRef, height]);

  const onPressRemoveMemberOfGroup = useCallback((memberId: number) => {
    if (data?.id) removeMemberOfGroup(memberId ,data?.id);
  }, [Props]);

  const onPressOk = useCallback(() => {
    if (data?.name !== name && data?.id) {
      updateMember(data?.id, { name });
    }
    onClose();
  }, [name, data?.name]);

  return (<BottomSheet
    backgroundStyle={{ height: 0 }}
    ref={sheetRef}
    snapPoints={snapPoints}
    onChange={onChnage}
    backdropComponent={BackDrop}
    handleIndicatorStyle={{ display: "none" }}
    keyboardBehavior="fillParent"
    footerComponent={(props) => <BottomSheetFooter {...props}>
      <FooterButtons onPressClose={onClose} onPressOk={onPressOk} />
    </BottomSheetFooter>}
  >
    <BottomSheetView style={bottomSheetStyles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>그룹 정보를 저장합니다.</Text>
        <Input
          placeholder="그룹 이름"
          label="그룹 이름"
          value={name}
          onFocus={(focus) => setFocus(focus ? "name" : null)}
          trailingIconType="remove"
          onChangeText={setName}
        />

        <View style={styles.membersScrollArea}>
          {data?.members?.map((data: Member, key: number) => <MemberView
            key={key}
            {...data}
            onPressRemove={onPressRemoveMemberOfGroup}
          />)}
        </View>

        {/* <Text style={styles.wranningText}>수정된 결과는 바로 저장됩니다.</Text> */}
      </View>
    </BottomSheetView>
  </BottomSheet>)
}

const MemberView = (Props: Member & { onPressRemove: (id: number) => void; }) => {
  return <View style={[styles.row, styles.memberRowContainer]}>
    <Text style={styles.memberName}>{Props.name}</Text>
    {(Props.bank || Props.account) && <View style={[styles.row]}>
      <Bank />
      <Text style={styles.memberBank}>{Props.bank}</Text>
      <View style={styles.divider}/>
      <Text style={styles.memberBank}>{Props.account}</Text>
    </View>}
    <TouchableOpacity
      onPress={() => Props.onPressRemove(Props.id)}
      style={styles.memberCrossIcon}>
      <CircleCrossBlack />
    </TouchableOpacity>
  </View>
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    // justifyContent: "space-between",
    // paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 40,
    paddingBottom: 40,
    alignItems: "center",
  },
  title: {
    color: "black",
    fontSize: 16,
    marginBottom: 10,
  },
  wranningText: {
    width: "100%",
    height: 50,
    textAlign: "center",
    fontSize: 14,
    color: "#F8503E"
  },
  membersScrollArea: {
    width: ScreenWidth - 32,
    flex: 1,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  memberRowContainer: {
    width: ScreenWidth - 40,
    height: 54,
    backgroundColor: "#F3F1ED",
    borderRadius: 6,
    padding: 16,
    marginVertical: 4,
    // left: -8,
    justifyContent: "space-between",
  },
  memberName: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "S-CoreDream-6Bold"
  },
  memberBank: {
    fontSize: 14,
    fontFamily: "S-CoreDream-4Regular"
  },
  memberCrossIcon: {
    position: "absolute",
    top: -4,
    right: -4,
    zIndex: 2
  },
  divider: {
    width: 1,
    height: 14,
    backgroundColor: "black",
    marginHorizontal: 8
  },
})

export default GroupBottomSheet;
