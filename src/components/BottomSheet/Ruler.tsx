import React, { useRef, useCallback, useMemo, useEffect, useState } from "react";

import {
  View,
  Text,
  BackHandler,
  ScrollView
} from "react-native";

import { GestureDetector, Gesture } from "react-native-gesture-handler";

import useBSStore, { BottomSheetCallback, BottomSheetStoreTypes } from "../../store/bottomSheet";
import Button from "../Button";
import Input from "../Input";
import LineGauge from "../../components/LineGauge";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";

const Ruler = (Props: { callback?: BottomSheetCallback; }) => {
  const [value, setValue] = useState(1000);
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  
  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = savedScale.value * e.scale;
      console.log("onUpdate", scale.value);
    })
    .onEnd(() => {
      savedScale.value = scale.value;
      console.log("onEnd", savedScale.value);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (<View style={{ flexDirection: "column", width: "100%", height: 400, backgroundColor: "lightyellow" }}>
    <GestureDetector gesture={pinchGesture}>
      <Animated.View style={[animatedStyle, { backgroundColor: "lightpink", height: 200 }]} />
    </GestureDetector>
    {/* <ScrollView contentInsetAdjustmentBehavior="automatic" > */}
      <Text>Awesome 🎉 Ruler</Text>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <LineGauge
          min={100}
          max={1000}
          unitSize={10}
          value={value}
          onChange={setValue}
        />
      </GestureHandlerRootView>
      <Button title="확인" onPress={() => Props.callback?.("is Ruler Callback!!") }/>
    {/* </ScrollView> */}
  </View>)
}

export default Ruler;
