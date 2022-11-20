import React, { useEffect } from "react";
import { Alert, Text } from "react-native";
import Animated, { useSharedValue } from "react-native-reanimated";

import Styles, { ScreenWidth } from "../../styles";
import Button from "Component/Button";
import Dropdown from "Component/Dropdown";

import useStore from "Store/calculate";

import { TitleAnimationView, useStepWrapperStyle, ValueView, styles } from "./commons";

const Step3 = () => {
  const calcState = useStore((state: any) => state);
  const list = useStore((state: any) => state.members);
  const setPayer = useStore((state: any) => state.setPayer);
  const { step, setStep } = calcState;
  const sharedStep = useSharedValue(step);

  console.log("member", list);

  useEffect(() => {
    sharedStep.value = step;
  }, [step]);
  
  const StepWrapperStyle = useStepWrapperStyle(3, sharedStep);
  
  return <Animated.View style={[StepWrapperStyle, styles.stepWrapper, Styles.shadow]} >
    {step >= 3 && <>
      <TitleAnimationView
        index={3}
        isCurrStep={step === 3}
        title="누가 결제했나요?"
        preview={<ValueView value={calcState.payer?.name}/>}
      />
      {step === 3 && <>
        <Text>결제자 : {calcState.payer?.name || "없음"}</Text>
        <Dropdown
          values={list}
          selected={calcState.payer}
          onChangeSelected={(value) => setPayer(value)}
        />
        <Button round title="다음3"
          style={{ width: ScreenWidth - 48, marginBottom: 30 }}
          onPress={() => {
            if (calcState.payer) {
              setStep(4);
            } else {
              Alert.alert(
                "결제자 선택",
                "결제자가 선택되지 않았습니다. 결제자를 선택해주세요.",
                [{ text: "OK", onPress: () => {} }]
              );
            }
          }} />
      </>}
    </>}
  </Animated.View>;
}

export default Step3;
