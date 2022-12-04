import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text, KeyboardAvoidingView, Keyboard, StyleSheet } from "react-native";
import Animated, { useSharedValue } from "react-native-reanimated";

import Button from "Component/Button";
import SlideRuler from "Component/SlideRuler";

import { parsePrice } from "Util/parser";
import useStore, { StoreTypes } from "Store/calculate";

import { TitleAnimationView, ValueView, styles } from "./commons";
import Styles, { navbarHeight, StepComponentHeight, WindowWidth } from "../../styles";

const Step1 = () => {
  const calcState = useStore((state: any) => state);
  const { step, setStep, price, setPrice } = calcState;
  const [isInputFocused, setInputFocused] = useState(false);
  const sharedStep = useSharedValue(step);
  
  useEffect(() => {
    sharedStep.value = step;
  }, [step])

  useEffect(() => {
    const keyboardHide = () => setInputFocused(false);
    Keyboard.addListener("keyboardDidHide", keyboardHide)
    return () => Keyboard.removeAllListeners("keyboardDidHide");
  }, []);

  const onPressNext = useCallback(() => {
    setStep(2);
    // if (Number(price) > 0) setStep(2);
    // else {
    //     Alert.alert("결제 금액 입력",
    //     "결제 금액이 입력되지 않았습니다. 결제 금액을 입력해주세요.",
    //     [
    //       { text: "OK", onPress: () => console.log("OK Pressed") }
    //     ])
    //   }
  }, [price]);

  const buttonStyle = useMemo(() => ({
    width: isInputFocused ? "100%" : WindowWidth-32,
    bottom: isInputFocused ? 105 : 0,
    marginHorizontal: isInputFocused ? 0 : 16, 
    marginBottom: isInputFocused ? 0 : navbarHeight,
    marginTop: isInputFocused ? 0 : 40,
  }), [isInputFocused]);

  return <KeyboardAvoidingView
    behavior="padding"
    keyboardVerticalOffset={44}
    style={[Step1Styles.wrapper, styles.stepWrapper, Styles.shadow]} >
    <Animated.View style={Step1Styles.titleContainer} >
      <TitleAnimationView
        index={1}
        isCurrStep={step === 1}
        title="얼마를 썼나요?"
        preview={<ValueView value={parsePrice(price)} unit="원" />}
      />
      {step === 1 && <ExpenseForm isInputFocused={isInputFocused} setInputFocused={setInputFocused} />}
    </Animated.View>
    <Button
      title="다음"
      round={!isInputFocused}
      style={[buttonStyle]}
      onPress={onPressNext}
    />
  </KeyboardAvoidingView>
};

const ExpenseForm = (props: { isInputFocused: boolean; setInputFocused: (v: boolean) => void}) => {
  const price = useStore((state: any) => state.price);
  const setPrice = useStore((state: any) => state.setPrice);

  return (<>
    <View style={{flexDirection:"row",alignItems: "flex-end", justifyContent:"center"}}>
      <Text style={{fontSize: 50}}>{parsePrice(price)}</Text>
      <Text style={{fontSize: 20, margin: 10}}>원</Text>
    </View>
    <View style={{flex:1}}/>
    <SlideRuler value={price} onChange={setPrice} setInputFocused={props.setInputFocused} />
  </>);
}

const Step1Styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: "relative",
    height: StepComponentHeight,
  },
  titleContainer: {
    height: StepComponentHeight,
    paddingHorizontal: 24,
    paddingVertical: 8,
    flex: 1,
  }
})

export default Step1;
