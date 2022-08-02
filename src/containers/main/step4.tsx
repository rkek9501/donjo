import React, { useEffect } from 'react';
import Animated, { useSharedValue } from "react-native-reanimated";
import Button from '../../components/Button';

import useStore, { StoreTypes } from "../../store/calculate";
import Styles, {
  ScreenWidth,
} from "../../styles";
import { styles } from '.';
import { TitleAnimationView, useStepWrapperStyle, ValueView } from './commons';

const Step4 = () => {
  const calcState = useStore((state: StoreTypes) => state);
  const { step, setStep } = calcState;
  const sharedStep = useSharedValue(step);

  useEffect(() => {
    sharedStep.value = step;
  }, [step]);
  
  const StepWrapperStyle = useStepWrapperStyle(4, sharedStep);
  
  return <Animated.View style={[StepWrapperStyle, styles.stepWrapper, Styles.shadow]} >
    {step >= 4 && <>
      <TitleAnimationView
        index={4}
        isCurrStep={step === 4}
        title="돈을 더 쓴사람이 있나요?"
        preview={<ValueView value={"0"} unit="명" />}
      />
      {step === 4 && <Button round title="다음4"
        style={{ width: ScreenWidth - 48, marginBottom: 30 }}
        onPress={() => setStep(4)} />}
    </>}
  </Animated.View>;
}

export default Step4;
