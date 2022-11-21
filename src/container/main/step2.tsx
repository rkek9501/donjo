import React, { useEffect } from "react";
import { Alert, ScrollView, View } from "react-native";
import Animated, { useSharedValue } from "react-native-reanimated";
import Button from "Component/Button";
import List from "Component/List";

import useStore from "Store/calculate";
import Styles, { ScreenWidth } from "../../styles";
import { TitleAnimationView, useStepWrapperStyle, ValueView, styles } from "./commons";
import useModalStore from "Store/modal";

const Step2 = () => {
  const calcState = useStore((state: any) => state);
  const list = useStore((state: any) => state.members);
  const addTempMember = useStore((state: any) => state.addTempMember);
  const changeMember = useStore((state: any) => state.changeMemeber);
  const removeItem = useStore((state: any) => state.removeMember);
  const { step, setStep } = calcState;
  const sharedStep = useSharedValue(step);
  const modal = useModalStore((state: any) => state);
  
  useEffect(() => {
    sharedStep.value = step;
    console.log(2, { step })
  }, [step])
  
  useEffect(() => {
    console.log("step2 list", list);
  }, [list])

  const openChangeMemberModal = (item: any, index: number) => {
    modal.openModal({
      type: "member",
      data: item,
      callback: (data: any) => {
        changeMember(index, data);
        if(data.id !== -1) {
          // TODO: 불러오기한 멤버 정보 DB 저장 로직 추가필요.
        }
      }
    });
  }

  const StepWrapperStyle = useStepWrapperStyle(2, sharedStep);

  return <Animated.View style={[StepWrapperStyle, styles.stepWrapper, Styles.shadow, { flex: 1 }]} >
    {step >= 2 && <>
      <TitleAnimationView
        index={2}
        isCurrStep={step === 2}
        title="누가 참여했나요?"
        preview={<ValueView value={list.length} unit="명" />}
      />
      {step === 2 && <View style={{flex: 1}}>
        <ScrollView style={{flex:1}}>
          <List
            data={list}
            onPressItem={openChangeMemberModal}
            onRemoveItem={removeItem}
          />
        </ScrollView>
        <View style={{flexDirection: "row", marginBottom: 30, width: 50, alignSelf:"center"}}>
          <Button
            style={{flex: 1, borderRadius:20, width:40, height:40, backgroundColor: "#303030"}}
            title="+"
            onPress={() => addTempMember({
              name: "A", bank: null, id: 0
            })}
          />
        </View>
        <Button round title="다음2"
          style={{ width: ScreenWidth - 48, marginBottom: 30 }}
          onPress={() => {
            setStep(3);
            // if (list.length > 0) setStep(3);
            // else {
            //   Alert.alert("참여자 추가",
            //   "참여자가 추가되지 않았습니다. 불러오기 혹은 추가 버튼을 통해 참여자를 추가해주세요.",
            //   [
            //     { text: "OK", onPress: () => console.log("OK Pressed") }
            //   ])
            // }
          }} />
      </View>}
    </>}
  </Animated.View>;
}

export default Step2;
