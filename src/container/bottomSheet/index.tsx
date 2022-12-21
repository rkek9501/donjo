import React from "react";
import { StyleSheet, View } from "react-native";
import { BottomSheetBackdrop, SCREEN_WIDTH } from "@gorhom/bottom-sheet";
import type { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";

import MemberView from "./Member";
import GroupView from "./Group";
import Button from "Component/Button";

import useBSStore, { BottomSheetStoreTypes } from "Store/bottomSheet";

export const snapPoints = ["10%", "20%", "30%", "40%", "50%", "60%", "70%", "80%", "90%", "100%"];

export const BackDrop = (props: BottomSheetDefaultBackdropProps) => {
  const onClose = useBSStore((state: BottomSheetStoreTypes) => state.onClose);
  return <BottomSheetBackdrop {...props} >
    <View style={{ backgroundColor: "black", width: SCREEN_WIDTH, flex: 1 }} onTouchEnd={onClose} />
  </BottomSheetBackdrop>;
};

export const FooterButtons = (Props: { onPressClose: () => void; onPressOk: () => void; }) => {
  return <View style={{flexDirection:"row", width: "100%", paddingHorizontal: 16}}>
    <Button round white
      title="닫기"
      style={{flex:1, marginBottom:4, marginRight: 4}}
      onPress={Props.onPressClose}
      />
    <Button round black
      title="확인"
      style={{flex:1, marginBottom:4, marginLeft: 4}}
      onPress={Props.onPressOk}
    />
  </View>;
};

const BottomSheetComponent = () => {
  const { type } = useBSStore((state: BottomSheetStoreTypes) => state);
  if (type === "member") return <MemberView />;
  else if (type === "group") return <GroupView />;
  // else if (type === "ruler") return <RulerView />;
  return <View></View>;
};

export const bottomSheetStyles = StyleSheet.create({
  container: {
    backgroundColor: "white", 
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
})

export default BottomSheetComponent;
