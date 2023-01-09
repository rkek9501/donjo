import React, { useEffect } from "react";
import { View, TouchableWithoutFeedback, Animated, Text, StyleSheet, Platform, useColorScheme } from "react-native";
import { NavigationContainer, NavigationContext } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Button from "Component/Button";
import { TabBarHight, ThemeColors } from "src/styles";
import Main from "./main";
import Member from "./member";
import LoadMember from "./member/loadMember";
import BottomSheet from "./bottomSheet";

import useBSStore, { BottomSheetStoreTypes } from "Store/bottomSheet";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const TabRadius = 14;

const HomeScreen = () => {
  const navigation = React.useContext(NavigationContext);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: ThemeColors.yellow }}>
      <Text>Home!</Text>
      <Button round title="다음" style={{ width: "80%" }} onPress={() => navigation?.navigate("Main")}/>
    </View>
  );
}

type MemberCardProps = {
  name: string;
  groupName?: string;
  bank?: string;
  account?: string;
};
const MemberCard = (props: MemberCardProps) => {
  return <View style={{ backgroundColor: "gray", flex: 1 }}>
    <Text style={{ color: "white" }}>{props.name}</Text>
    {props.groupName && <Text>{props.groupName}</Text>}
    {props.bank && <Text>{props.bank}</Text>}
    {props.account && <Text>{props.account}</Text>}
  </View>
};

const HistoryScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: ThemeColors.green }}>
      <Text>History!</Text>
      <View style={{ flexDirection: "row", width: "100%" }}>
        <MemberCard name="권오수권오수권오수권오수권오수권오수권오수권오수" groupName="대학" />
        <MemberCard name="권오수" groupName="대학" />
      </View>
    </View>
  );
};

const TabBar = ({ state, descriptors, navigation, position }: any) => {
  const paddingTop = Platform.OS === "ios" ? 0 : 10;
  const isDarkMode = useColorScheme() === "dark";

  return (
    <View key={position} style={{ flexDirection: 'row', paddingTop, backgroundColor: isDarkMode ? "black" :"white" }}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        const MainColor = () => {
          switch (index) {
            case 1: return ThemeColors.red;
            case 2: return ThemeColors.green;
            default: return ThemeColors.yellow;
          }
        }
        const LeftBottomColor = () => {
          if (isFocused && index === 2)
            return ThemeColors.green;
          else if (index === 0 || (index === 1 && state.index === 0))
           return ThemeColors.yellow;
          else return ThemeColors.red;
        }
        const RightBottomColor = () => {
          if (isFocused && index === 0)
            return ThemeColors.yellow;
          else if (index === 2 || (index === 1 && state.index === 2))
           return ThemeColors.green;
          else return ThemeColors.red;
        }
        const ActiveTextColor = () => {
          if (index === 0) return "black";
          else return "white";
        }
        const ActiveDotColor = () => {
          if (isFocused && index === 0) return "black";
          else if (isFocused && index !== 0) return "white";
          return "transparent"
        }

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableWithoutFeedback
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[styles.tabContainer]}
          >
            <View style={[styles.tabContainer, {
                position: "relative",
                backgroundColor: MainColor(),
              }]}>
              <View style={[styles.tabContainer, {
                backgroundColor: MainColor(),
                zIndex: 20,
                borderBottomRightRadius: TabRadius,
                borderBottomLeftRadius: TabRadius,
              }]}>
                <Animated.Text style={{ color: ActiveTextColor(), fontFamily:"S-CoreDream-4Regular", fontSize: 14 }}>
                  {label}
                </Animated.Text>
                <Animated.View style={[styles.tabDot, { backgroundColor: ActiveDotColor() }]} />
              </View>
              <View style={[styles.tabBottomCorner, { left: 0, backgroundColor: LeftBottomColor() }]}/>
              <View style={[styles.tabBottomCorner, { right: 0, backgroundColor: RightBottomColor() }]}/>
            </View>
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  );
}

const TabNavigationWrapper = () => {
  const bsState = useBSStore((state: BottomSheetStoreTypes) => state);
  return (
    <View style={{ flex:1 }}>
      <Tab.Navigator
        screenOptions={{ swipeEnabled: false, animationEnabled: false }}
        initialRouteName="맴버 저장"
        tabBar={(props) => <TabBar {...props} />}
      >
        <Tab.Screen name="새 모임 추가" component={HomeScreen} />
        <Tab.Screen name="맴버 저장" >
          {() => <Member {...bsState}/>}
        </Tab.Screen>
        <Tab.Screen name="이전 기록" component={HistoryScreen} />
      </Tab.Navigator>
      {bsState.open && <BottomSheet {...bsState}/>}
    </View>
  );
};

const StackNavigationWrapper = () => {
  //   const isDarkMode = useColorScheme() === "light";
  return <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="TabMenu" >
      <Stack.Screen name="TabMenu" component={TabNavigationWrapper} />
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="LoadMember" component={LoadMember} />
    </Stack.Navigator>
  </NavigationContainer>;
};

export default StackNavigationWrapper;

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    height: TabBarHight,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: TabRadius,
    borderTopLeftRadius: TabRadius,
  },
  tabDot: {
    width: 6,
    height: 6,
    borderRadius:3,
  },
  tabBottomCorner: {
    position: "absolute",
    zIndex: 1,
    bottom: 0,
    width: TabRadius*2,
    height: TabRadius*2,
  }
});
