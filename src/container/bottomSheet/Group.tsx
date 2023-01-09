import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { NavigationContext } from "@react-navigation/native";
import BottomSheet, { BottomSheetFooter, BottomSheetView } from "@gorhom/bottom-sheet";
import uniqBy from "lodash/uniqBy";

import { ScreenWidth, ThemeColors } from "src/styles";
import { Bank, CircleCrossWithBg, Plus } from "Component/Icons";
import Input from "Component/Input";
import Text from "Component/Text";
import Button from "Component/Button";
import { BackDrop, bottomSheetStyles, FooterButtons, snapPoints } from "./index";

import { useBottomSheetBackHandler } from "Hook/useBackHandler";

import type { Member } from "DB/entities";
import type { BottomSheetStoreTypes } from "Store/bottomSheet";
import useDBStore, { DBConnectionActions } from "Store/dbConnection";
import useRoutesStore, { RoutesStoreTypes } from "Store/routes";

const GroupBottomSheet = (Props: BottomSheetStoreTypes) => {
  const navigation = useContext(NavigationContext);
  const { height, onBackPressBS, data, onClose } = Props;
  // const removeMemberOfGroup = useDBStore((state: DBConnectionStoreTypes) => state.removeMemberOfGroup);
  const { createGroup, updateGroup } = useDBStore((state: DBConnectionActions) => state);
  const { setRequest } = useRoutesStore((state: RoutesStoreTypes) => state);

  const [name, setName] = useState<string>(data?.name || "");
  const [focus, setFocus] = useState<"name"|null>(null)
  const sheetRef = useRef<BottomSheet>(null);
  const [members, setMembers] = useState<Member[]>(data?.members || []);

  useBottomSheetBackHandler(onBackPressBS, sheetRef);

  useEffect(() => {
    if (typeof height === "undefined") return;
    if (height >= 1) sheetRef.current?.snapToIndex(height);
    else if (height === -1) sheetRef.current?.close();
  }, [height]);

  const onChnage = useCallback((index) => {
    if (typeof height === "undefined") return;
    if (height >= 1) sheetRef.current?.snapToIndex(height);
    else if (height === -1) sheetRef.current?.close();
  }, [sheetRef, height]);

  const onPressRemoveMemberOfGroup = useCallback((member: Member) => {
    setMembers((prev) => prev.filter((item) => item.name !== member.name));
  }, [setMembers]);

  const onPressOk = useCallback(() => {
    if (data?.id) {
      updateGroup(data?.id, { name, members });
    } else {
      createGroup({ name, members });
    }
    onClose();
  }, [name, data?.name, members]);

  const onPressAddMemberBtn = useCallback(() => {
    navigation?.navigate("LoadMember");
    setRequest({ purpose: "member", callback: (data: any) => {
      setMembers((prev) => uniqBy(([] as Member[]).concat(prev, data?.members || []), "name"));
    } });
  }, [navigation, setRequest, setMembers])

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
          {members?.map((data: Member, key: number) => <MemberView
            key={key}
            {...data}
            onPressRemove={() => onPressRemoveMemberOfGroup(data)}
          />)}
          {members?.length === 0 && <Text style={{fontSize: 14, color: ThemeColors.whiteBlack[500], marginTop: 10, textAlign: "center"}}>아직 멤버가 없습니다!</Text>}
          <View style={{height: 34, width: "100%", justifyContent: "center", alignItems: "center", marginTop: 12}}>
            <Button round small
              style={{ width: 34, height: 34 }}
              prevIcon={<Plus/>}
              onPress={onPressAddMemberBtn}
            />
          </View>
        </View>

        {/* <Text style={styles.wranningText}>수정된 결과는 바로 저장됩니다.</Text> */}

      </View>
    </BottomSheetView>
  </BottomSheet>)
}

const MemberView = (Props: Member & { onPressRemove: (id: number) => void; }) => {
  return <View style={[styles.row, styles.memberRowContainer]}>
    <Text fontStyle="bold" style={styles.memberName}>{Props.name}</Text>
    {(Props.bank || Props.account) && <View style={[styles.row]}>
      <Bank />
      <Text style={styles.memberBank}>{Props.bank}</Text>
      <View style={styles.divider}/>
      <Text style={styles.memberBank}>{Props.account}</Text>
    </View>}
    <TouchableOpacity
      onPress={() => Props.onPressRemove(Props.id)}
      style={styles.memberCrossIcon}>
      <CircleCrossWithBg />
    </TouchableOpacity>
  </View>
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
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
  },
  memberBank: {
    fontSize: 14,
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
