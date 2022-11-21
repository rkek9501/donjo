import React, { useEffect } from "react";
import { View, Text, Alert } from "react-native";
import Animated, { useSharedValue } from "react-native-reanimated";

import Styles, { ScreenWidth } from "../../styles";
import Button from "Component/Button";
import SlideRuler from "Component/SlideRuler";

import { parsePrice } from "Util/parser";
import useStore, { StoreTypes } from "Store/calculate";

import { TitleAnimationView, useStepWrapperStyle, ValueView, styles } from "./commons";

const Step1 = () => {
  const calcState = useStore((state: any) => state);
  const { step, setStep, price, setPrice } = calcState;
  const sharedStep = useSharedValue(step);

  useEffect(() => {
    sharedStep.value = step;
  }, [step])

  const StepWrapperAnim = useStepWrapperStyle(1, sharedStep);

  return <Animated.View style={[StepWrapperAnim, styles.stepWrapper, Styles.shadow]} >
    <View style={[styles.stepContainer]}>
      <TitleAnimationView
        index={1}
        isCurrStep={step === 1}
        title="얼마를 썼나요?"
        preview={<ValueView value={parsePrice(price)} unit="원" />}
      />
      {step === 1 && <ExpenseForm />}
    </View>
  </Animated.View>
};

const ExpenseForm = () => {
  const calcState = useStore((state: any) => state);
  const { setStep, price, setPrice } = calcState;

  return (<View style={{flex:1}}>
    <View style={{flex: 1, height: 50}}>
      <View style={{flexDirection:"row",alignItems: "flex-end", justifyContent:"center"}}>
        <Text style={{fontSize: 50}}>{parsePrice(price)}</Text>
        <Text style={{fontSize: 20, margin: 10}}>원</Text>
      </View>
    </View>
    <SlideRuler onChange={setPrice} />
    <Button round title="다음1"
      style={{ width: ScreenWidth - 48, marginBottom: 30, marginTop: 40 }}
      onPress={() => {
        setStep(2);
        // if (Number(price) > 0) setStep(2);
        // else {
        //     Alert.alert("결제 금액 입력",
        //     "결제 금액이 입력되지 않았습니다. 결제 금액을 입력해주세요.",
        //     [
        //       { text: "OK", onPress: () => console.log("OK Pressed") }
        //     ])
        //   }
      }} />
  </View>);
}

export default Step1;
