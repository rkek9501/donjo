import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import Animated, { useSharedValue } from "react-native-reanimated";
import moment from "moment";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// import Button from "Component/Button";
import PopoverDatePicker from "Component/PopoverDatePicker";
import Input from "Component/Input";
import Indicator from "Component/Indicator";

import usePageStore from "Store/index";
import useStore from "Store/calculate";
import useModalStore from "Store/modal";

import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Step4 from "./step4";
import { styles } from "./commons";
import { ScreenWidth, StepComponentHeight } from "../../styles";

const Main = ({ navigation }: any) => {
  const setActivePage = usePageStore((state: any) => state.setActivePage);
  const isActive = usePageStore((state: any) => (state.page === 0 && state.activePage === 0));
  
  const modal = useModalStore((state: any) => state);
  
  const calcState = useStore((state: any) => state);
  const { step, setDate, setStep, name, setName } = calcState;
  const sharedStep = useSharedValue(step);

    useEffect(() => {
    const backEvent = (e: any) => {
      if (step > 1) {
        setStep(step - 1);
        e.preventDefault();
        return false;
      }
      return;
    }
    navigation.addListener('beforeRemove', backEvent);
    return () => navigation.removeListener('beforeRemove', backEvent);
  }, [isActive, step]);

  useEffect(() => {
    sharedStep.value = step;
  }, [step])

  // const animatedStyles = useAnimatedStyle(() => {
  //   return {
  //     width: withTiming(isActive ? ScreenWidth : CardWidth, { duration: 200 }),
  //     height: withTiming(isActive ? ScreenHeight - 50 : CardHieght, { duration: 200 }),
  //     borderTopRightRadius: withTiming(isActive ? 0 : 30, { duration: 200 }),
  //   };
  // }, [isActive]);

  const onPressIntro = () => {
    setStep(0);
    setActivePage(0);
    if (!name) setName(moment().format("M월 D일의 모임"));
  };

  return <GestureHandlerRootView>
    <View style={styles.mainContainer}>
      <Animated.View style={styles.pageMain}>
        <View style={Styles.headerRow}>
          <Input
            value={name}
            onChangeText={setName}
            style={[styles.newTitle, {borderWidth: 0}]}
            onFocus={onPressIntro}
            placeholder="새로운 모임 작성하기" />
          <Text style={[Styles.count, {marginTop: 24}]}>1차</Text>
        </View>
        <View style={Styles.headerRow}>
          <PopoverDatePicker
            date={calcState.date}
            setDate={setDate}
            onFocus={onPressIntro}
          />
          <Indicator maxIdx={4} activeIndex={step}/>
        </View>
      </Animated.View>

      <View style={Styles.bottomAreaContainer}>
        <Step1 />
        {step >= 1 && <Step2/>}
        {step >= 2 && <Step3/>}
        {step >= 3 && <Step4/>}
      </View>
    </View>
  </GestureHandlerRootView>;
};

const Styles = StyleSheet.create({
  headerRow: {
    width: ScreenWidth,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  count: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#281B14",
  },
  bottomAreaContainer : {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    top: 128,
    height: StepComponentHeight,
  }
})
export default Main;
