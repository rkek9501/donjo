import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  useColorScheme,
  View,
  Dimensions,
  TouchableOpacity,
  Animated,
  Text
} from "react-native";

const MainColor1 = "#FEBB39";
const MainColor2 = "#F8503E";
const MainColor3 = "#3C7873";

// import type { Connection } from "typeorm/browser";
// import moment from "moment";
// moment.locale("ko");
// import { GestureHandlerRootView } from "react-native-gesture-handler";

// import connectDB from "DB/entities";
// import ComplexResolver from "DB/resolvers/complex";

// import useStore, { StoreTypes } from "Store/calculate";
// import useBSStore, { BottomSheetStoreTypes } from "Store/bottomSheet";

// import Main from "./main";
// import Member from "./member";

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

function MyTabBar({ state, descriptors, navigation, position }: any) {
  console.log({ state })
  return (
    <View style={{ flexDirection: 'row' }}>
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
            case 1: return MainColor2;
            case 2: return MainColor3;
            default: return MainColor1;
          }
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
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map((i: number) => (i === index ? 1 : 0)),
        });

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1, height: 50, justifyContent: "center", alignItems: "center",
              backgroundColor: MainColor(),
              borderTopRightRadius: 14, borderTopLeftRadius: 14,
            }}
          >
            <Animated.Text style={{
              color: ActiveTextColor()
            }}>
              {label}
            </Animated.Text>
            <Animated.View style={{ width:6, height:6, borderRadius:3, backgroundColor: ActiveDotColor() }} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function ContainerWrapper() {
  return (
    <NavigationContainer>
      <Tab.Navigator swipeEnabled={false} tabBar={(props) => <MyTabBar {...props} />} >
        <Tab.Screen name="새 모임 추가" component={HomeScreen} />
        <Tab.Screen name="맴버 저장" component={SettingsScreen} />
        <Tab.Screen name="이전 기록" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default ContainerWrapper;

// const Height = Dimensions.get("screen").height;
// const Width = Dimensions.get("screen").width;

// const ContainerWrapper = () => {
//   const state = useStore((state: StoreTypes) => state);
//   const setPrice = useStore((state: StoreTypes) => state.setPrice);
//   const setPlace = useStore((state: StoreTypes) => state.setPlace);
//   const setDate = useStore((state: StoreTypes) => state.setDate);
//   const setName = useStore((state: StoreTypes) => state.setName);
//   const { onClose, onOpen } = useBSStore((state: BottomSheetStoreTypes) => state);

//   const [value2, setValue2] = useState(1000);
//   const [connection, setconnection] = useState<Connection | null>(null);
//   const [memberText, setMemberText] = useState<string>("Member");

//   const isDarkMode = useColorScheme() === "light";

//   useEffect(() => {
//     try {
//       (async () => {
//         const connection = await connectDB();
//         setconnection(connection);
//       })();
//     } catch (error) {
//       console.log(error);
//     }
//   }, []);

//   const onPress = async () => {
//     console.log(JSON.stringify({ state }, null, 2));
//     await new ComplexResolver().create({
//       billInput: null,
//       payInput: {
//         place: state.place,
//         price: state.price,
//         date: state.date.toDate(),
//       },
//       groupInput: null,
//       membersInput: [{
//         name: memberText
//       }],
//     })

//     const pays = await new ComplexResolver().getPays();
//     console.log(JSON.stringify({ pays }, null, 2));
//   }

//   return (
//     <View style={styles.wrapper}>
//       {/* <Card /> */}
//       <Main />
//       <Member />
//       {/* <Input
//         label="모임명을 설정해주세요."
//         value={memberText}
//         placeholder="모임명을 설정해주세요."
//         onChangeText={setName}
//       />

//       <Input
//         label="장소는 어디인가요?"
//         value={state.place}
//         placeholder="장소는 어디인가요?"
//         onChangeText={setPlace}
//       />

//       <Input
//         label="얼마를 결제했나요?"
//         type="numeric"
//         value={`${state.price}`}
//         required
//         placeholder="얼마를 결제했나요?"
//         onChangeText={t => setPrice(Number(t))}
//       />
//       <Button
//         title="확인"
//         style={{ backgroundColor: "lightpink" }}
//         onPress={onPress}
//         disabled={true}
//       /> */}
//       {/* {groupList && groupList.length > 0 && <FlatList
//         data={groupList}
//         renderItem={renderGroupItem}
//         keyExtractor={(item, idx) => `${item._id}-${idx}`}
//       />} */}

//       {/* <GestureHandlerRootView style={{ flex: 1 }}>
//         <LineGauge
//           min={100}
//           max={1000}
//           unitSize={10}
//           value={value2}
//           onChange={setValue2}
//         />
//       </GestureHandlerRootView> */}
//       {/* <Button title="Member" onPress={() => onOpen("member", (data) => console.log({ data }))} />
//       <Button title="Ruler" onPress={() => onOpen("ruler", (data) => console.log({ data }))} />
//       <Button title="Close" onPress={onClose} /> */}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   wrapper: {
//     height: Height,
//     width: Width
//   },
//   dates: {
//     display: "flex",
//     fontSize: 20,
//     textAlign: "center",
//     paddingVertical: 10,
//     width: "100%",
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "lightgreen"
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: "600",
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: "400",
//   },
//   highlight: {
//     fontWeight: "700",
//   },
// });

// export default ContainerWrapper;
