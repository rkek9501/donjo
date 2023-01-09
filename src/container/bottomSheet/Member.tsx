import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import BottomSheet, { BottomSheetFooter, BottomSheetView } from "@gorhom/bottom-sheet";
import { NavigationContext } from "@react-navigation/native";

import uniqBy from "lodash/uniqBy";

import { ThemeColors } from "src/styles";
import Dropdown from "Component/Dropdown";
import Button from "Component/Button";
import Input from "Component/Input";
import GroupView from "Component/GroupView";
import { Plus } from "Component/Icons";
import Text from "Component/Text";
import { BackDrop, bottomSheetStyles, FooterButtons, snapPoints } from "./index";

import { useBottomSheetBackHandler } from "Hook/useBackHandler";

import type { Group } from "DB/entities";
import Banks from "DB/data/banks";
import type { BottomSheetStoreTypes } from "Store/bottomSheet";
import useDBStore, { DBConnectionStoreTypes } from "Store/dbConnection";
import useRoutesStore, { RoutesStoreTypes } from "Store/routes";

const MemeberBottomSheet = (Props: BottomSheetStoreTypes) => {
  const navigation = useContext(NavigationContext);
  const { height, onBackPressBS, data, onClose } = Props;
  const { createMember, updateMember } = useDBStore((state: DBConnectionStoreTypes) => state);
  const { setRequest } = useRoutesStore((state: RoutesStoreTypes) => state);

  const [name, setName] = useState<string>(data?.name || "");
  const [bank, setBank] = useState<string>(data?.bank || "선택안함");
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

  const onPressOk = useCallback(async() => {
    const selectedBank = bank !== Banks[0] ? bank : undefined;
    if (data?.id) {
      await updateMember(data?.id, { name, bank: selectedBank, account, groups: selectedGroup });
    } else {
      await createMember({ name, bank: selectedBank, account, groups: selectedGroup });
    }
    onClose()
  }, [name, bank, account, selectedGroup]);

  const onPressAddGroupBtn = useCallback(() => {
    navigation?.navigate("LoadMember");
    setRequest({ purpose: "group", callback: (data: any) => {
      setSelectedGroup((prev) => uniqBy(([] as Group[]).concat(prev, data?.groups || []), "name"));
    } });
  }, [navigation, setRequest, setSelectedGroup])

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
    enablePanDownToClose={true}
    onClose={onClose}
    footerComponent={(props) => <BottomSheetFooter {...props}>
      <FooterButtons onPressClose={onClose} onPressOk={onPressOk} />
    </BottomSheetFooter>}
  >
    <BottomSheetView style={bottomSheetStyles.container}>
      <View style={styles.container}>
        <View style={styles.inputFroms}>
          <Text fontStyle="bold" style={styles.title}>멤버 정보를 저장합니다.</Text>
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
              values={[...Banks]}
              onFocus={() => setFocus("bank")}
              />
            {(bank && bank !== Banks[0]) && <Input
              placeholder="계좌번호"
              label="계좌번호"
              keyboardType="numeric"
              value={account}
              style={{width: "60%", marginLeft: 14}}
              onFocus={() => setFocus("account")}
              trailingIconType="remove"
              onChangeText={setAccount}
              error={accountError}
            />}
          </View>

          <GroupView
            selectedGroup={selectedGroup}
            updateSelectedGroup={setSelectedGroup}
          >
            {selectedGroup.length === 0 && <Text style={{fontSize: 14, color: ThemeColors.whiteBlack[500], marginBottom: 10}}>아직 그룹이 없습니다!</Text>}
            <Button round small
              title="그룹 추가"
              style={{ width: 124, height: 34, paddingHorizontal: 12 }}
              prevIcon={<Plus/>}
              onPress={onPressAddGroupBtn}
            />
          </GroupView>
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
    flex: 1,
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
