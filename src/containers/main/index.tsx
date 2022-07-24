import React, { useEffect } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, TouchableOpacity, Text, KeyboardAvoidingView } from 'react-native';
import Animated, {
  useSharedValue, useAnimatedStyle, withTiming
} from "react-native-reanimated";
import Button from '../../components/Button';
import PopoverDatePicker from '../../components/PopoverDatePicker';

import usePageStore, { PageStoreTypes } from "../../store";
import useStore, { StoreTypes } from "../../../src/store/calculate";
import {
  ScreenWidth, ScreenHeight,
  cardBgColors, CardWidth, CardHieght,
} from "../../styles";
import Input from '../../components/Input';
import { NextCard } from '../../components/Icons';
import useBackHandler from '../../util/useBackHandler';
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import Step4 from './step4';

const Main = () => {
  const setActivePage = usePageStore((state: PageStoreTypes) => state.setActivePage);
  const isActive = usePageStore((state: PageStoreTypes) => (state.page === 0 && state.activePage === 0));
  
  const calcState = useStore((state: StoreTypes) => state);
  const { step, setDate, setStep, name, setName } = calcState;
  const sharedStep = useSharedValue(step);
  
  useBackHandler(() => {
    if (isActive) {
      if (step > 0) {
        setStep(step - 1);
        return true;
      }
      setActivePage(-1);
      return true;
    }
    return false;
  }, [isActive, step]);

  useEffect(() => {
    sharedStep.value = step;
  }, [step])

  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: withTiming(isActive ? ScreenWidth : CardWidth, { duration: 200 }),
      height: withTiming(isActive ? ScreenHeight - 50 : CardHieght, { duration: 200 }),
      borderTopRightRadius: withTiming(isActive ? 0 : 30, { duration: 200 }),
    };
  }, [isActive]);


  const onPressIntro = () => {
    setStep(0);
    setActivePage(0);
  };

  return <KeyboardAvoidingView style={[styles.mainContainer]}>
    <Animated.View style={[animatedStyles, styles.pageMain, { flexDirection: isActive ?  "column":  "row" }]}>
      <TouchableWithoutFeedback onPress={onPressIntro}>
        <Animated.View style={[styles.intro]} >
          <View style={[styles.introCenter]}>
            <Input
              value={name}
              onChangeText={setName}
              style={{borderWidth: 0}}
              onFocus={onPressIntro}
              placeholder="새로운 모임 작성하기" />
            <PopoverDatePicker
              date={calcState.date}
              setDate={setDate}
              onFocus={onPressIntro}
            />
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
      {!isActive
        ? <TouchableOpacity style={[styles.next]} onPress={() => {}}><NextCard /></TouchableOpacity>
        : <Button round title="다음"
          style={{ width: ScreenWidth - 48, marginBottom: 60 }}
          onPress={() => setStep(1)}
        />}

      {isActive && <>
        <Step1 />
        {step >= 1 && <Step2/>}
        {step >= 2 && <Step3/>}
        {step >= 3 && <Step4/>}
      </>}

    </Animated.View>
    {!isActive && <View style={{backgroundColor:"#FFFFF0",flex:1}}>  
    </View>}
  </KeyboardAvoidingView>
};

export const styles = StyleSheet.create({
  mainContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    zIndex: 2,
    width: ScreenWidth,
  },
  pageMain: {
    backgroundColor: cardBgColors[0],
    justifyContent: "center",
    alignItems: "center",
    width: CardWidth,
    paddingHorizontal: 12,
  },
  next: {
    width: 48,
    height: 29,
  },
  intro: {
    display: "flex",
    flex: 1,
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  introCenter: {
    height: CardHieght,
  },

  stepWrapper: {
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    backgroundColor: "white",
  },
  stepContainer: {
    width: "100%",
    height: "100%",
  }
});

export default Main;
