import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import BottomSheet, { BottomSheetFooter, BottomSheetView } from "@gorhom/bottom-sheet";

import Dropdown from "Component/Dropdown";
import Input from "Component/Input";
import GroupSelector from "Component/GroupSelector";
import { BackDrop, bottomSheetStyles, FooterButtons, snapPoints } from "./index";

import type { Group } from "DB/entities";
import Banks from "DB/data/banks";
import useBSStore, { BottomSheetStoreTypes } from "Store/bottomSheet";
import useDBStore, { DBConnectionStoreTypes } from "Store/dbConnection";
import { useBottomSheetBackHandler } from "Hook/useBackHandler";

const MemeberBottomSheet = () => {
  const { height, onBackPressBS, data, onClose } = useBSStore((state: BottomSheetStoreTypes) => state);
  const { createMember, updateMember } = useDBStore((state: DBConnectionStoreTypes) => state);

  const [name, setName] = useState<string>(data?.name || "");
  const [bank, setBank] = useState<{name?: string}|null>(data?.bank ? {name: data.bank} : null);
  const [account, setAccount] = useState<string>(data?.account ?? "");
  const [selectedGroup, setSelectedGroup] = useState<Group[]>(data?.groups || []);
  const [focus, setFocus] = useState<"name"|"bank"|"account"|"group"|"">("");
  const sheetRef = useRef<BottomSheet>(null);

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

  const onPressOk = useCallback(() => {
    if (data?.id) {
      updateMember(data?.id, { name, bank: bank?.name, account, groups: selectedGroup });
    } else {
      createMember({ name, bank: bank?.name, account, groups: selectedGroup });
    }
    onClose()
  }, [name, bank, account, selectedGroup]);

  const accountError = useMemo(() => {
    if (account.length > 0 && account.length < 5) return true;
    return false;
  }, [account]);

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
        <View style={styles.inputFroms}>
          <Text style={styles.title}>멤버 정보를 저장합니다.</Text>
          <Input
            placeholder="이름"
            label="이름"
            value={name}
            onFocus={() => setFocus("name")}
            trailingIconType="remove"
            onChangeText={setName}
          />

          <View style={{flexDirection:"row", marginTop: 18}}>
            <Dropdown
              label="은행"
              selected={bank}
              onChangeSelected={setBank}
              values={Banks}
              onFocus={() => setFocus("bank")}
              />
            <Input
              placeholder="계좌번호"
              label="계좌번호"
              keyboardType="numeric"
              value={account}
              style={{width: "65%", marginLeft: 14}}
              onFocus={() => setFocus("account")}
              trailingIconType="remove"
              onChangeText={setAccount}
              error={accountError}
            />
          </View>

          <GroupSelector
            selectedGroup={selectedGroup}
            updateSelectedGroup={setSelectedGroup} />
        </View>

        {/* <View style={{ flex:1 }}/> */}
        {/* <Text style={styles.wranningText}>수정된 결과는 바로 저장됩니다.</Text> */}
      </View>
    </BottomSheetView>
  </BottomSheet>);
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    // justifyContent: "space-between",
    // paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 40,
    paddingBottom: 40,
  },
  title: {
    color: "black",
    fontSize: 16,
    marginBottom: 10,
  },
  inputFroms: {
    position: "relative",
    alignItems: "center",
  },
  wranningText: {
    width: "100%",
    height: 50,
    textAlign: "center",
    fontSize: 14,
    color: "#F8503E"
  }
})

export default MemeberBottomSheet;
