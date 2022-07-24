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

const Step3 = () => {
  const calcState = useStore((state: StoreTypes) => state);
  const { step, setStep } = calcState;
  const sharedStep = useSharedValue(step);

  useEffect(() => {
    sharedStep.value = step;
  }, [step]);
  
  const StepWrapperStyle = useStepWrapperStyle(3, sharedStep);
  
  return <Animated.View style={[StepWrapperStyle, styles.stepWrapper, Styles.shadow]} >
    {step >= 3 && <>
      <TitleAnimationView
        index={3}
        isCurrStep={step === 3}
        title="누가 참여했나요?"
        preview={<ValueView value={"0"} unit="명" />}
      />
      {step === 3 && <Button round title="다음3"
        style={{ width: ScreenWidth - 48, marginBottom: 60 }}
        onPress={() => setStep(4)} />}
    </>}
  </Animated.View>;
}

export default Step3;
