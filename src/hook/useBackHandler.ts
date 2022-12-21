import BottomSheet from "@gorhom/bottom-sheet";

import React from "react";
import { BackHandler } from "react-native"

const useBackHandler = (action: () => boolean, dependencies: any[]) => {
  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener( "hardwareBackPress", action);
    return () => backHandler.remove();
  }, dependencies)
}

export const useBottomSheetBackHandler = (onBackPressBS: () => boolean, sheetRef: React.RefObject<BottomSheet>) => {
  React.useEffect(() => {
    if (sheetRef?.current) BackHandler.addEventListener("hardwareBackPress", onBackPressBS);
    return () => {
      if (sheetRef?.current) BackHandler.removeEventListener("hardwareBackPress", onBackPressBS);
      else return;
    }
  }, [sheetRef]);
}

export default useBackHandler;
