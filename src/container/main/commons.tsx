import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle, withTiming
} from "react-native-reanimated";
import { cardBgColors, CardHieght, CardWidth, ScreenHeight, ScreenWidth } from '../../styles';
import { Dot } from '../../styles/icon';

export const ValueView = (Props: { value: string; unit?: string; }) => {
  return <View style={{flex:1,flexDirection:"row",alignItems:"center"}}>
    <Text style={{fontSize: 16,marginRight:4}}>{Props.value}</Text>
    <Text style={{fontSize: 12}}>{Props.unit}</Text>
  </View>
};

export const TitleAnimationView = (Props: {
  index: string | number;
  isCurrStep: boolean;
  preview?: React.ReactNode;
  title: string;
}) => {
  const TitleAnim = useAnimatedStyle(() => {
    return {
      // fontSize: (Props.isCurrStep ? 20 : 14),
    }
  }, [Props.isCurrStep]);
  const TitleTextAnim = useAnimatedStyle(() => {
    return {
      marginLeft: 4,
      fontSize: withTiming(Props.isCurrStep ? 20 : 14),
      fontWeight: "400",
    }
  }, [Props.isCurrStep]);
  return <Animated.View style={[TitleAnim, { flexDirection:"row", marginBottom: 24, justifyContent: Props.isCurrStep ? "center" : "space-between" }]}>
    <View style={{
      flexDirection: Props.isCurrStep ? "column" : "row",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Dot text={Props.index}/>
      <Animated.Text style={[TitleTextAnim]}>{Props.title}</Animated.Text>
    </View>
    {!Props.isCurrStep && <Text>{Props.preview}</Text>}
  </Animated.View>
}

export const useStepWrapperStyle = (thisStep: number, sharedStep: any) => {
  return useAnimatedStyle(() => {
    const _step = sharedStep.value;
    let thisStepHeigt = 0;
    switch(thisStep) {
      case 1: thisStepHeigt = ScreenHeight - 140; break;
      case 2: thisStepHeigt = ScreenHeight - 190; break;
      case 3: thisStepHeigt = ScreenHeight - 240; break;
      case 4: thisStepHeigt = ScreenHeight - 290; break;
      default: thisStepHeigt = 0; break;
    }
    // let bg = "white";
    // switch(thisStep) {
    //   case 1: bg = "lightpink"; break;
    //   case 2: bg = "lightblue"; break;
    //   case 3: bg = "lightgreen"; break;
    //   default: bg = "white"; break;
    // }
    return {
      position: "absolute",
      height: withTiming(_step < thisStep ? 0 : thisStepHeigt, { duration: 300 }),
      paddingHorizontal: withTiming(_step < thisStep ? 0 : 24),
      paddingVertical: withTiming(_step < thisStep ? 0 : 16),
      zIndex: thisStep + 1,
      // backgroundColor: bg,
    };
  }, [thisStep, sharedStep]);
}

export const styles = StyleSheet.create({
  mainContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    zIndex: 2,
    width: ScreenWidth,
  },
  pageMain: {
    backgroundColor: cardBgColors[0],
    justifyContent: "center",
    alignItems: "center",
    width: CardWidth,
    paddingHorizontal: 12,
  },
  next: {
    width: 48,
    height: 29,
  },
  intro: {
    display: "flex",
    flex: 1,
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  introCenter: {
    height: CardHieght,
    justifyContent: "space-around",
  },
  newTitle: {
    marginTop: 24,
    fontSize: 24,
    fontWeight: "bold",
    color: "#281B14",
  },
  stepWrapper: {
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    backgroundColor: "white",
  },
  stepContainer: {
    width: "100%",
    height: "100%",
  }
});
