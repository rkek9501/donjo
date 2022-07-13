import React, { useRef, useCallback, useMemo, useEffect, useState } from "react";

import {
  View,
  Text,
  BackHandler
} from "react-native";

import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetTextInput
} from '@gorhom/bottom-sheet';

import useBSStore, { BottomSheetStoreTypes } from "../../store/bottomSheet";
import MemberView from "./Member";
import RulerView from "./Ruler";

const BottomSheetComponent = () => {
  const { open, type, callback, onOpen, onClose } = useBSStore((state: BottomSheetStoreTypes) => state) ;
  const [name, setName] = useState("");
  // const [open, setOpen] = useState(false);
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["1%", "40%", "50%"], []);

  useEffect(() => {
    console.log({open})
    if (open) {
      sheetRef.current?.snapToIndex(2);
    } else {
      sheetRef.current?.close();
    }
  }, [open]);

  // const onBackPress = () => {
  //   console.log("onBackPress");
  //   if (open) {
  //     onClose();
  //     return true;
  //   }
  //   return false;
  // }

  // useEffect(() => {
  //   if (sheetRef.current) {
      
  //     BackHandler.addEventListener("hardwareBackPress", onBackPress);
  //   }
  //   return () => sheetRef.current && BackHandler.removeEventListener("hardwareBackPress", onBackPress);
  // }, [sheetRef])

  const onChnage = useCallback((index) => {
    console.log("onChnage", index);
  }, []);

  const renderBackdrop = useCallback(props => (
    <BottomSheetBackdrop {...props} >
      <View
        style={{ backgroundColor: "black", flex: 1 }}
        onTouchEnd={() => onClose()}/>
    </BottomSheetBackdrop>
  ), []);

  const okCallback = useCallback((data) => {
    callback(data);
    onClose();
  }, [callback])

  return (<>
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      onChange={onChnage}
      backdropComponent={renderBackdrop}
      backgroundStyle={{}}
      handleIndicatorStyle={{ width: 40, backgroundColor: "#E3E3E7" }}
      keyboardBehavior="fillParent"
    >
      <BottomSheetView>
        {type === "member" && <MemberView callback={okCallback} />}
        {type === "ruler" && <RulerView callback={okCallback} />}
      </BottomSheetView>
    </BottomSheet>
  </>)
}

export default BottomSheetComponent;
