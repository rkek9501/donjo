import React from "react";
import { View, TouchableWithoutFeedback, Animated, Text, StyleSheet } from "react-native";
import { NavigationContainer, NavigationContext } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { cardBgColors } from "src/styles";
import Main from "./main";
import Member from "./member";
import Button from "Component/Button";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const TabRadius = 14;

const HomeScreen = () => {
  const navigation = React.useContext(NavigationContext);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
      <Button round title="Start!" style={{ width: "80%" }} onPress={() => navigation?.navigate("Main")}/>
    </View>
  );
}

const SettingsScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
};

const TabBar = ({ state, descriptors, navigation, position }: any) => {
  return (
    <View key={position} style={{ flexDirection: 'row', marginTop: 10 }}>
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
            case 1: return cardBgColors[1];
            case 2: return cardBgColors[2];
            default: return cardBgColors[0];
          }
        }
        const LeftBottomColor = () => {
          if (isFocused && index === 2)
            return cardBgColors[2];
          else if (index === 0 || (index === 1 && state.index === 0))
           return cardBgColors[0];
          else return cardBgColors[1];
        }
        const RightBottomColor = () => {
          if (isFocused && index === 0)
            return cardBgColors[0];
          else if (index === 2 || (index === 1 && state.index === 2))
           return cardBgColors[2];
          else return cardBgColors[1];
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
                <Animated.Text style={{ color: ActiveTextColor() }}>
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
  return (
    <Tab.Navigator screenOptions={{ swipeEnabled: false }} tabBar={(props) => <TabBar {...props} />} >
      <Tab.Screen name="새 모임 추가" component={HomeScreen} />
      <Tab.Screen name="맴버 저장" component={SettingsScreen} />
      <Tab.Screen name="이전 기록" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

const StackNavigationWrapper = () => {
  //   const isDarkMode = useColorScheme() === "light";
  return <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="TabMenu">
      <Stack.Screen name="TabMenu" component={TabNavigationWrapper} />
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Member" component={Member} />
    </Stack.Navigator>
  </NavigationContainer>;
};

export default StackNavigationWrapper;

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    height: 50,
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
