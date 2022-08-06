import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue, useAnimatedStyle,
  withDelay, withTiming, withSequence
} from "react-native-reanimated";

import usePageStore, { PageStates, PageStoreTypes } from "Store/index";
import Styles, { ContainerHeight, ActiveContainerHeight, ScreenWidth, ScreenHeight } from "../../styles";


const Main = () => {
  const page = usePageStore((state: PageStoreTypes) => state.page);
  const isActive = usePageStore((state: PageStoreTypes) => (state.page === 0 && state.activePage === 0));
  
  const animatedStyles = useAnimatedStyle(() => {
    // height: withTiming(isActive ? ActiveContainerHeight : ContainerHeight, { duration: 200 }),
    return {
      borderTopRightRadius: withTiming(isActive ? 14 : 0, { duration: 200 }),
      borderTopLeftRadius: withTiming(isActive ? 14 : 0, { duration: 200 }),
    };
  });

  return <Animated.View style={[styles.mainContainer, animatedStyles]}>

  </Animated.View>
};


const styles = StyleSheet.create({
  mainContainer: {
    position: "absolute",
    bottom: 0,
    zIndex: 1,
    width: ScreenWidth,
    height: ScreenHeight,
    backgroundColor: "light",
  },
});

export default Main;
