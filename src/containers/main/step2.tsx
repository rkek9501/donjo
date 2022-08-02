import React, { useEffect } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import Animated, { useSharedValue } from "react-native-reanimated";
import Button from '../../components/Button';
import List from '../../components/List';

import useStore, { StoreTypes } from "../../store/calculate";
import Styles, { ScreenWidth } from "../../styles";
import { TitleAnimationView, useStepWrapperStyle, ValueView } from './commons';
import { styles } from '.';
import useList from '../../util/useList';

const Step2 = () => {
  const calcState = useStore((state: StoreTypes) => state);
  const list = useStore((state: StoreTypes) => state.members);
  const addItem = useStore((state: StoreTypes) => state.addMember);
  // const changeItem = useStore((state: StoreTypes) => state.changeMemeber);
  const removeItem = useStore((state: StoreTypes) => state.removeMember);
  const { step, setStep } = calcState;
  const sharedStep = useSharedValue(step);
  // const { list, addItem, changeItem, removeItem } = useList([]);

  useEffect(() => {
    sharedStep.value = step;
    console.log(2, { step })
  }, [step])
  
  useEffect(() => {
    console.log("step2 list", list);
  }, [list])

  const StepWrapperStyle = useStepWrapperStyle(2, sharedStep);

  return <Animated.View style={[StepWrapperStyle, styles.stepWrapper, Styles.shadow, { flex: 1 }]} >
    {step >= 2 && <>
      <TitleAnimationView
        index={2}
        isCurrStep={step === 2}
        title="누가 참여했나요?"
        preview={<ValueView value={"0"} unit="명" />}
      />
      {step === 2 && <ScrollView style={{flex: 1}}>
        <List
          data={list}
          onPressItem={(item) => console.log({ item })}
          onRemoveItem={removeItem}
        />
        <View style={{flexDirection: "row", marginBottom: 30, width: 50, alignSelf:"center"}}>
          <Button
            style={{flex: 1, borderRadius:4, backgroundColor: "#303030"}}
            title="+"
            onPress={() => addItem({
              name: "A", bank: null, id: 0
            })}
          />
        </View>
        <Button round title="다음2"
          style={{ width: ScreenWidth - 48, marginBottom: 30 }}
          onPress={() => {
            if (list.length > 0) setStep(3);
            else {
              Alert.alert("참여자 추가",
              "참여자가 추가되지 않았습니다. 불러오기 혹은 추가 버튼을 통해 참여자를 추가해주세요.",
              [
                { text: "OK", onPress: () => console.log("OK Pressed") }
              ])
            }
          }} />
      </ScrollView>}
    </>}
  </Animated.View>;
}

export default Step2;
