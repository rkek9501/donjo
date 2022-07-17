import React, { useState, useEffect } from "react";

import {
  ScrollView,
  StyleSheet,
  useColorScheme,
  Text,
  View,
  Dimensions,
} from "react-native";
import type { Connection } from "typeorm/browser";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import LineGauge from "../../src/components/LineGauge";
import Button from "../../src/components/Button";
// import Input from "../../src/components/Input";

import connectDB from "../../src/db/entities";
import ComplexResolver from "../../src/db/resolvers/complex";
import useStore, { DATE_FORMAT, StoreTypes } from "../../src/store/calculate";
import moment from "moment";
import useBSStore, { BottomSheetStoreTypes } from "../../src/store/bottomSheet";
import Card from "../../src/components/Card";
moment.locale("ko");


const ContainerWrapper = () => {
  const state = useStore((state: StoreTypes) => state);
  const setPrice = useStore((state: StoreTypes) => state.setPrice);
  const setPlace = useStore((state: StoreTypes) => state.setPlace);
  const setDate = useStore((state: StoreTypes) => state.setDate);
  const setName = useStore((state: StoreTypes) => state.setName);
  const { onClose, onOpen } = useBSStore((state: BottomSheetStoreTypes) => state);

  const [value2, setValue2] = useState(1000);
  const [connection, setconnection] = useState<Connection | null>(null);
  const [memberText, setMemberText] = useState<string>("Member");

  const isDarkMode = useColorScheme() === "dark";

  useEffect(() => {
    try {
      (async () => {
        const connection = await connectDB();
        setconnection(connection);
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onPress = async () => {
    console.log(JSON.stringify({ state }, null, 2));
    await new ComplexResolver().create({
      billInput: null,
      payInput: {
        place: state.place,
        price: state.price,
        date: state.date.toDate(),
      },
      groupInput: null,
      membersInput: [{
        name: memberText
      }],
    })

    const pays = await new ComplexResolver().getPays();
    console.log(JSON.stringify({ pays }, null, 2));
  }

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" >
      <Card></Card>
      {/* <Input
        label="모임명을 설정해주세요."
        value={memberText}
        placeholder="모임명을 설정해주세요."
        onChangeText={setName}
      />

      <Input
        label="장소는 어디인가요?"
        value={state.place}
        placeholder="장소는 어디인가요?"
        onChangeText={setPlace}
      />

      <Input
        label="얼마를 결제했나요?"
        type="numeric"
        value={`${state.price}`}
        required
        placeholder="얼마를 결제했나요?"
        onChangeText={t => setPrice(Number(t))}
      />
      <Button
        title="확인"
        style={{ backgroundColor: "lightpink" }}
        onPress={onPress}
        disabled={true}
      /> */}
      {/* {groupList && groupList.length > 0 && <FlatList
        data={groupList}
        renderItem={renderGroupItem}
        keyExtractor={(item, idx) => `${item._id}-${idx}`}
      />} */}

      {/* <GestureHandlerRootView style={{ flex: 1 }}>
        <LineGauge
          min={100}
          max={1000}
          unitSize={10}
          value={value2}
          onChange={setValue2}
        />
      </GestureHandlerRootView> */}
      <Button title="Member" onPress={() => onOpen("member", (data) => console.log({ data }))} />
      <Button title="Ruler" onPress={() => onOpen("ruler", (data) => console.log({ data }))} />
      <Button title="Close" onPress={onClose} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  dates: {
    display: "flex",
    fontSize: 20,
    textAlign: "center",
    paddingVertical: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgreen"
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
});

export default ContainerWrapper;
