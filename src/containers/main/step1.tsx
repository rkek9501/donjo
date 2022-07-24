import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Animated, {
  useSharedValue, useAnimatedStyle, withTiming
} from "react-native-reanimated";
import Button from '../../components/Button';

import useStore, { StoreTypes } from "../../../src/store/calculate";
import Styles, {
  ScreenWidth,
} from "../../styles";
import { styles } from '.';
import SlideRuler from '../../components/SlideRuler';
import { parsePrice } from '../../util/parser';
import { Dot } from '../../styles/icon';
import { TitleAnimationView, useStepWrapperStyle, ValueView } from './commons';

const Step1 = () => {
  const calcState = useStore((state: StoreTypes) => state);
  const { step, setStep, price, setPrice } = calcState;
  const sharedStep = useSharedValue(step);

  useEffect(() => {
    sharedStep.value = step;
  }, [step])

  const StepWrapperAnim = useStepWrapperStyle(1, sharedStep);

  return <Animated.View style={[StepWrapperAnim, styles.stepWrapper, Styles.shadow]} >
    {step >= 1 && <View style={[styles.stepContainer]}>
      <TitleAnimationView
        index={1}
        isCurrStep={step === 1}
        title="얼마를 썼나요?"
        preview={<ValueView value={parsePrice(price)} unit="원" />}
      />
      {step === 1 && <ExpenseForm />
      }
    </View>}
  </Animated.View>
};

const ExpenseForm = () => {
  const calcState = useStore((state: StoreTypes) => state);
  const { setStep, price, setPrice } = calcState;

  return (<>
    <View style={{flex: 1}}>
      <View style={{flexDirection:"row",alignItems: "flex-end", justifyContent:"center"}}>
        <Text style={{fontSize: 50}}>{parsePrice(price)}</Text>
        <Text style={{fontSize: 20, margin: 10}}>원</Text>
      </View>
    </View>
    <SlideRuler onChange={setPrice} />
    <Button round title="다음1"
      style={{ width: ScreenWidth - 48, marginBottom: 60, marginTop: 40 }}
      onPress={() => setStep(2)} />
  </>);
}

export default Step1;
