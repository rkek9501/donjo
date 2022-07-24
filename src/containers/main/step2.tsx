import React, { useEffect } from 'react';
import Animated, {
  useSharedValue,
} from "react-native-reanimated";
import Button from '../../components/Button';

import useStore, { StoreTypes } from "../../store/calculate";
import Styles, {
  ScreenWidth,
} from "../../styles";
import { styles } from '.';
import { TitleAnimationView, useStepWrapperStyle, ValueView } from './commons';

const Step2 = () => {
  const calcState = useStore((state: StoreTypes) => state);
  const { step, setStep } = calcState;
  const sharedStep = useSharedValue(step);

  useEffect(() => {
    sharedStep.value = step;
    console.log(2, { step })
  }, [step])

  const StepWrapperStyle = useStepWrapperStyle(2, sharedStep);

  return <Animated.View style={[StepWrapperStyle, styles.stepWrapper, Styles.shadow]} >
    {step >= 2 && <>
      <TitleAnimationView
        index={2}
        isCurrStep={step === 2}
        title="누가 결제했나요?"
        preview={<ValueView value={"0"} unit="명" />}
      />
      {step === 2 && <Button round title="다음2"
        style={{ width: ScreenWidth - 48, marginBottom: 60 }}
        onPress={() => setStep(3)} />}
    </>}
  </Animated.View>;
}

export default Step2;
