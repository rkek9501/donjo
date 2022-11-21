import React, { useEffect } from "react";
import { StyleSheet, View, TouchableWithoutFeedback, TouchableOpacity, Text, KeyboardAvoidingView } from "react-native";
import Animated, {
  useSharedValue, useAnimatedStyle, withTiming
} from "react-native-reanimated";
import moment from "moment";

import {
  ScreenWidth, ScreenHeight, cardBgColors, CardWidth, CardHieght, StepComponentHeight,
} from "../../styles";
import Button from "Component/Button";
import PopoverDatePicker from "Component/PopoverDatePicker";
import Input from "Component/Input";

import usePageStore from "Store/index";
import useStore from "Store/calculate";
import useModalStore from "Store/modal";

import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Step4 from "./step4";
import { styles } from "./commons";

const Main = ({ navigation }: any) => {
  const setActivePage = usePageStore((state: any) => state.setActivePage);
  const isActive = usePageStore((state: any) => (state.page === 0 && state.activePage === 0));
  
  const modal = useModalStore((state: any) => state);
  
  const calcState = useStore((state: any) => state);
  const { step, setDate, setStep, name, setName } = calcState;
  const sharedStep = useSharedValue(step);

    useEffect(() => {
    const backEvent = (e: any) => {
      if (step > 1) {
        setStep(step - 1);
        e.preventDefault();
        return false;
      }
      return;
    }
    navigation.addListener('beforeRemove', backEvent);
    return () => navigation.removeListener('beforeRemove', backEvent);
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
    if (!name) setName(moment().format("M월 D일의 모임"));
  };

  return <KeyboardAvoidingView style={[styles.mainContainer]}>
    <Animated.View style={[styles.pageMain]}>
      <View style={{height: 128, width: ScreenWidth}}>
        <Input
          value={name}
          onChangeText={setName}
          style={[{borderWidth: 0}, styles.newTitle]}
          onFocus={onPressIntro}
          placeholder="새로운 모임 작성하기" />
        <PopoverDatePicker
          date={calcState.date}
          setDate={setDate}
          onFocus={onPressIntro}
        />
      </View>

      <View style={{position: "absolute",bottom: 0, left: 0, right: 0, height: StepComponentHeight, top: 128}}>
        <Step1 />
        {step >= 1 && <Step2/>}
        {step >= 2 && <Step3/>}
        {step >= 3 && <Step4/>}
      </View>
    </Animated.View>
  </KeyboardAvoidingView>

  // return <KeyboardAvoidingView style={[styles.mainContainer]}>
  //   <Animated.View style={[animatedStyles, styles.pageMain, { flexDirection: isActive ?  "column":  "row" }]}>
  //     {/* <TouchableWithoutFeedback onPress={onPressIntro}>
  //       <Animated.View style={[styles.intro]} >
  //         <View style={[styles.introCenter]}>
  //           {!isActive
  //             ? <Text style={styles.newTitle}>새로운 모임{"\n"}작성하기</Text>
  //             : <Input
  //             value={name}
  //             onChangeText={setName}
  //             style={{borderWidth: 0}}
  //             onFocus={onPressIntro}
  //             placeholder="새로운 모임 작성하기" />
  //           }
  //           <PopoverDatePicker
  //             date={calcState.date}
  //             setDate={setDate}
  //             onFocus={onPressIntro}
  //           />
  //         </View>
  //       </Animated.View>
  //     </TouchableWithoutFeedback> */}

  //     {/* <Button title="open" onPress={() => modal.openModal({ type: "member", msg: "aaa", callback: (data: any) => console.log({ data }) })}></Button> */}
  //     {!isActive
  //       ? <TouchableOpacity style={[styles.next]} onPress={() => onPressIntro()}><NextCard /></TouchableOpacity>
  //       : <Button round title="다음"
  //         style={{ width: ScreenWidth - 48, marginBottom: 60 }}
  //         onPress={() => setStep(1)}
  //       />}

  //     {isActive && <>
  //       <Step1 />
  //       {step >= 1 && <Step2/>}
  //       {step >= 2 && <Step3/>}
  //       {step >= 3 && <Step4/>}
  //     </>}

  //   </Animated.View>
  //   {!isActive && <View style={{backgroundColor:"#FFFFF0",flex:1}}>
  //     <Text>AAA</Text>
  //   </View>}
  // </KeyboardAvoidingView>
};

export default Main;
