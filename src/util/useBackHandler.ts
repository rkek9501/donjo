import React from "react";
import { BackHandler } from "react-native"

const useBackHandler = (action: () => boolean, dependencies: any[]) => {
  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener( "hardwareBackPress", action);
    return () => backHandler.remove();
  }, dependencies)
}

export default useBackHandler;
